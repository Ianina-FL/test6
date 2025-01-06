const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const events = sequelize.define(
    'events',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
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

  events.associate = (db) => {
    db.events.belongsToMany(db.users, {
      as: 'guests',
      foreignKey: {
        name: 'events_guestsId',
      },
      constraints: false,
      through: 'eventsGuestsUsers',
    });

    db.events.belongsToMany(db.users, {
      as: 'guests_filter',
      foreignKey: {
        name: 'events_guestsId',
      },
      constraints: false,
      through: 'eventsGuestsUsers',
    });

    db.events.belongsToMany(db.users, {
      as: 'vendors',
      foreignKey: {
        name: 'events_vendorsId',
      },
      constraints: false,
      through: 'eventsVendorsUsers',
    });

    db.events.belongsToMany(db.users, {
      as: 'vendors_filter',
      foreignKey: {
        name: 'events_vendorsId',
      },
      constraints: false,
      through: 'eventsVendorsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.events.belongsTo(db.venues, {
      as: 'venue',
      foreignKey: {
        name: 'venueId',
      },
      constraints: false,
    });

    db.events.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.events.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.events.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return events;
};
