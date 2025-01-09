const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BudgetsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const budgets = await db.budgets.create(
      {
        id: data.id || undefined,

        total_budget: data.total_budget || null,
        expenses: data.expenses || null,
        income: data.income || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await budgets.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await budgets.setPayments(data.payments || [], {
      transaction,
    });

    return budgets;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const budgetsData = data.map((item, index) => ({
      id: item.id || undefined,

      total_budget: item.total_budget || null,
      expenses: item.expenses || null,
      income: item.income || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const budgets = await db.budgets.bulkCreate(budgetsData, { transaction });

    // For each item created, replace relation files

    return budgets;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const budgets = await db.budgets.findByPk(id, {}, { transaction });

    await budgets.update(
      {
        total_budget: data.total_budget || null,
        expenses: data.expenses || null,
        income: data.income || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await budgets.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await budgets.setPayments(data.payments || [], {
      transaction,
    });

    return budgets;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const budgets = await db.budgets.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of budgets) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of budgets) {
        await record.destroy({ transaction });
      }
    });

    return budgets;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const budgets = await db.budgets.findByPk(id, options);

    await budgets.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await budgets.destroy({
      transaction,
    });

    return budgets;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const budgets = await db.budgets.findOne({ where }, { transaction });

    if (!budgets) {
      return budgets;
    }

    const output = budgets.get({ plain: true });

    output.payments = await budgets.getPayments({
      transaction,
    });

    output.organization = await budgets.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.vendors,
        as: 'payments',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.total_budgetRange) {
        const [start, end] = filter.total_budgetRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            total_budget: {
              ...where.total_budget,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            total_budget: {
              ...where.total_budget,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.expensesRange) {
        const [start, end] = filter.expensesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            expenses: {
              ...where.expenses,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            expenses: {
              ...where.expenses,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.incomeRange) {
        const [start, end] = filter.incomeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            income: {
              ...where.income,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            income: {
              ...where.income,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.payments) {
        const searchTerms = filter.payments.split('|');

        include = [
          {
            model: db.vendors,
            as: 'payments_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        name: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationId;
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.budgets.count({
            where: globalAccess ? {} : where,
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.budgets.findAndCountAll({
          where: globalAccess ? {} : where,
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('budgets', 'total_budget', query),
        ],
      };
    }

    const records = await db.budgets.findAll({
      attributes: ['id', 'total_budget'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['total_budget', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.total_budget,
    }));
  }
};
