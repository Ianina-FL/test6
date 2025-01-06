const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const budgets = sequelize.define(
    'budgets',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      total_budget: {
        type: DataTypes.DECIMAL,
      },

      expenses: {
        type: DataTypes.DECIMAL,
      },

      income: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  budgets.associate = (db) => {
    db.budgets.belongsToMany(db.vendors, {
      as: 'payments',
      foreignKey: {
        name: 'budgets_paymentsId',
      },
      constraints: false,
      through: 'budgetsPaymentsVendors',
    });

    db.budgets.belongsToMany(db.vendors, {
      as: 'payments_filter',
      foreignKey: {
        name: 'budgets_paymentsId',
      },
      constraints: false,
      through: 'budgetsPaymentsVendors',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.budgets.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.budgets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.budgets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return budgets;
};
