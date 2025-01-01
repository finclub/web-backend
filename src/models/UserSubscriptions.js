module.exports = (sequelize, DataTypes) => {
  const UserSubscriptions = sequelize.define(
    'UserSubscriptions',
    {
      subscription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price_at_time_of_purchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      discount_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      discount_expiry_date: {
        type: DataTypes.DATE
      },
      subscription_start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      subscription_end_date: {
        type: DataTypes.DATE
      },
      gst_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
      },
      final_price_incl_gst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      timestamps: true,
      tableName: 'UserSubscriptions'
    }
  );

  UserSubscriptions.associate = (models) => {
    UserSubscriptions.belongsTo(models.PlatformSubscriptionPlans, {
      foreignKey: 'plan_id',
      as: 'plan'
    });
    UserSubscriptions.belongsTo(models.Discounts, {
      foreignKey: 'discount_id',
      as: 'discount'
    });
    UserSubscriptions.hasMany(models.Notifications, {
      foreignKey: 'subscription_id',
      as: 'notifications'
    });
  };

  return UserSubscriptions;
};
