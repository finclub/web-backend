const fs = require('fs');
const path = require('path');
const sequelize = require('./sequelize');

const db = {};

// Load models dynamically
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.endsWith('.js') && file !== 'index.js' && file !== 'sequelize.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Establish associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;
