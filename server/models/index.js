import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import process from 'process';
import config from '../config/config.js';


//Es compactibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbconfig = config[env];

const db = {};

let sequelize;
if (dbconfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbconfig.use_env_variable], dbconfig);
} else {
  sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);
}

// Load all model files except this file and test files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  );

// Dynamically import models using file:// URL
for (const file of modelFiles) {
  const modelURL = pathToFileURL(path.join(__dirname, file)).href;
  const { default: modelFn } = await import(modelURL);
  const model = modelFn(sequelize, DataTypes);
  db[model.name] = model;
 
}

// Run associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
