"use strict";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import { fileURLToPath } from "url";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url); // Convert URL to file path
const __dirname = path.dirname(__filename); // Get the directory name

const env = process.env.NODE_ENV || "development";

// Import JSON config with assertion
const config = await import("../config/config.json", {
  assert: { type: "json" },
}).then((module) => module.default[env]); // Ensure to access the default export

const db = {};

async function initializeDatabase() {
  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  // Correct path to the models directory
  const modelsDirectory = __dirname;

  // Read models directory
  const files = fs.readdirSync(modelsDirectory).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  for (const file of files) {
    if (file === "DatabaseManager.js") {
      continue;
    }
    const model = await import(`./${file}`);
    if (!model.default) {
      continue;
    }

    const namedModel = model.default(sequelize, Sequelize.DataTypes);
    db[namedModel.name] = namedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

export default initializeDatabase;
