import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Matches the `nextval('users_id_seq')` in the database
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true, // Enforce uniqueness
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true, // Nullable field
            unique: true, // Enforce uniqueness
            validate: {
                isEmail: true, // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['admin', 'staff']], // Restrict values to 'admin' or 'staff'
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Default to CURRENT_TIMESTAMP
        },
    },
    {
        timestamps: false, // Disable Sequelize's automatic timestamps
        tableName: 'users', // Match the table name in the database
    }
);