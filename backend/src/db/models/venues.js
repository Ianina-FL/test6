const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const venues = sequelize.define(
    'venues',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      location: {
        type: DataTypes.TEXT,
      },

      capacity: {
        type: DataTypes.INTEGER,
      },

      is_booked: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      address: {
        type: DataTypes.TEXT,
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

  venues.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.venues.hasMany(db.events, {
      as: 'events_venue',
      foreignKey: {
        name: 'venueId',
      },
      constraints: false,
    });

    //end loop

    db.venues.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.venues.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.venues.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return venues;
};
