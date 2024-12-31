const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Adjust this require to point to your Sequelize connection setup

class Visitor extends Model {}

Visitor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other')
    },
    plan_category: {
      type: DataTypes.STRING
    },
    plan_subcategory: {
      type: DataTypes.STRING
    },
    billing_cycle: {
      type: DataTypes.STRING
    },
    negotiated_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    contact_id: {
      type: DataTypes.INTEGER
    },
    lead_type: {
      type: DataTypes.STRING
    },
    trial_start_date: {
      type: DataTypes.DATE
    },
    trial_end_date: {
      type: DataTypes.DATE
    },
    expected_joining: {
      type: DataTypes.DATE
    },
    remarks: {
      type: DataTypes.TEXT
    },
    enquiry_status: {
      type: DataTypes.STRING
    },
    follow_up_date: {
      type: DataTypes.DATE
    },
    reference_type: {
      type: DataTypes.STRING
    },
    reference: {
      type: DataTypes.STRING
    },
    assigned_to: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.INTEGER
    },
    updated_by: {
      type: DataTypes.INTEGER
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
    sequelize,
    modelName: 'Visitor',
    tableName: 'visitors',
    timestamps: false // Disable Sequelize automatic timestamps if they are manually defined
  }
);

module.exports = Visitor;
