const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100]
        }
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100]
        }
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 255]
        }
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          is: /^[0-9]+$/, // Only numeric values
          len: [10, 15]
        }
      },
      role: {
        type: DataTypes.ENUM('admin', 'staff', 'member'),
        defaultValue: 'member',
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: true,
      tableName: 'Users'
    }
  );

  // Add hooks
  Users.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  Users.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      // Only hash if the password field has changed
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

  // **Associations**
  Users.associate = (models) => {
    Users.hasMany(models.UserSubscriptions, {
      foreignKey: 'user_id',
      as: 'subscriptions'
    });
    Users.hasMany(models.Notifications, {
      foreignKey: 'user_id',
      as: 'notifications'
    });
  };

  return Users;
};
