import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Member from './memberModel.js';  // Import the Member model
import MemberSubscription from './memberSubscriptionModel.js'; // Import the MemberSubscription model

const SubscriptionHistory = sequelize.define('SubscriptionHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    references: {
      model: MemberSubscription,
      key: 'id',
    },
  },
  start_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // Can be 'active', 'expired', 'renewed', etc.
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'subscription_history',
});

// Before creating a new subscription, calculate the expiry date
SubscriptionHistory.beforeCreate(async (history, options) => {
  const { start_date, subscription_id } = history;

  // Fetch the associated subscription
  const subscription = await MemberSubscription.findByPk(subscription_id);

  if (subscription) {
    const { duration_days } = subscription;  // Fetch the duration in days from the subscription
    const expiryDate = new Date(start_date);
    expiryDate.setDate(expiryDate.getDate() + duration_days); // Add duration_days to the start date

    // Set the calculated end date as expiry date
    history.end_date = expiryDate;
  }
});

export default SubscriptionHistory;
