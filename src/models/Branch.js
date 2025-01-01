import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const Branch = sequelize.define(
  'Branch',
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    subscription_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subscription_plans', // Table name
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    subscription_status: {
      type: DataTypes.STRING,
      defaultValue: 'inactive',
      validate: {
        isIn: [['active', 'inactive']] // Restrict values
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false, // Disable automatic timestamps
    tableName: 'branches'
  }
);
