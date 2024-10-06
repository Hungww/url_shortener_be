import initializeDatabase from "./index.js";
const db = await initializeDatabase();
await db.sequelize.sync({ alter: true });
let Models = db.sequelize.models;

export { db, Models };
