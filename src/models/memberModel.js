import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.BIGINT,
    unique: true,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['Male', 'Female', 'Other']],
    },
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  emergency_contact_name: {
    type: DataTypes.STRING(100),
  },
  emergency_contact_number: {
    type: DataTypes.BIGINT,
  },
  manual_receipt_number: {
    type: DataTypes.STRING(50),
  },
  profile_pic: {
    type: DataTypes.TEXT,
  },
  reference_type: {
    type: DataTypes.STRING(50),
    validate: {
      isIn: [['Walk-in', 'Referred by Member', 'Reference', 'Promotion']],
    },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    // references: {                           // add after subscription created
    //   model: 'member_subscriptions',
    //   key: 'id',
    // },
  },
  add_on_services: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  created_by: {
    type: DataTypes.INTEGER,
    // references: {                           // add after user creater
    //   model: 'users',
    //   key: 'id',
    // },
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'members',
});

export default Member;
