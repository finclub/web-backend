module.exports = (sequelize, DataTypes) => {
  const PlatformSubscriptionPlans = sequelize.define(
    'PlatformSubscriptionPlans',
    {
      plan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      plan_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      base_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      features: {
        type: DataTypes.JSON
      },
      billing_cycle: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      trial_period_days: {
        type: DataTypes.INTEGER
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: true,
      tableName: 'PlatformSubscriptionPlans'
    }
  );

  PlatformSubscriptionPlans.associate = (models) => {
    PlatformSubscriptionPlans.hasMany(models.UserSubscriptions, {
      foreignKey: 'plan_id',
      as: 'subscriptions'
    });
  };

  return PlatformSubscriptionPlans;
};
