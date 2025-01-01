import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const PlatformSubscription = sequelize.define(
  'PlatformSubscription',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Table name
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches', // Table name
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subscription_plans', // Table name
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    billing_cycle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['monthly', 'yearly']] // Restrict values
      }
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    end_date: {
      type: DataTypes.DATE,
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
    tableName: 'platform_subscriptions'
  }
);
