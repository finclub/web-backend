import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
}, {
    timestamps: false,
    tableName: 'users'
});
