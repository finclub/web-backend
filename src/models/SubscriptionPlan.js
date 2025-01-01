import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const SubscriptionPlan = sequelize.define(
  'SubscriptionPlan',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    billing_cycles: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: { yearly: true, monthly: true }
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    trial_period_days: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false, // Disable automatic timestamps
    tableName: 'subscription_plans'
  }
);
