import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MemberSubscription = sequelize.define(
  'MemberSubscription',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    billing_cycle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['weekly', 'monthly', 'quarterly', 'biannually', 'half_yearly', 'yearly', 'lifetime', 'custom']],
      },
    },
    duration_days: {  // How many days 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sessions: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    timestamps: true,
    tableName: 'member_subscriptions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default MemberSubscription;





// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';

// const MemberSubscription = sequelize.define(
//   'MemberSubscription',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     club_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     billing_cycle: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isIn: [['monthly', 'yearly']],
//       },
//     },
//     duration_value: {  // how many months or years
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//     //   plan_duration_days: {  // Duration in days
//     //     type: DataTypes.INTEGER, 
//     //     allowNull: true,
//     //   },
//     description: {
//       type: DataTypes.TEXT,
//     },
//     active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     blocked: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     deleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//     tableName: 'member_subscriptions',
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   }
// );

// export default MemberSubscription;
