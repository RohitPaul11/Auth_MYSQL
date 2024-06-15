const sequelize = require('../config/db');
const User = require('../models/user');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Recreates the database
});

afterAll(async () => {
  await sequelize.close();
});
