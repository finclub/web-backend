module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    'Notifications',
    {
      notification_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.ENUM('pending', 'sent'),
        defaultValue: 'pending'
      }
    },
    {
      timestamps: true,
      tableName: 'Notifications'
    }
  );

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.UserSubscriptions, {
      foreignKey: 'subscription_id',
      as: 'subscription'
    });
  };

  return Notifications;
};
