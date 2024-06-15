const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authroutes');
const User = require('./models/user');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', authRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {            //method to sync the database schema with the defined models
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
