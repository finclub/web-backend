module.exports = (sequelize, DataTypes) => {
  const Discounts = sequelize.define(
    'Discounts',
    {
      discount_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('percentage', 'fixed', 'trial_extension'),
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      apply_until_billing_cycle_end: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: true,
      tableName: 'Discounts'
    }
  );

  Discounts.associate = (models) => {
    Discounts.hasMany(models.UserSubscriptions, {
      foreignKey: 'discount_id',
      as: 'userSubscriptions'
    });
  };

  return Discounts;
};
