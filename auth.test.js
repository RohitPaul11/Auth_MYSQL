const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const sequelize = require('../config/db');
const User = require('../models/user');
const app = express();

app.use(express.json());
app.use('/', authRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: '100'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login an existing user and return a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@gmail.com',
        password: '100'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should retrieve the logged-in user\'s profile', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({
        email: 'testuser@gmail.com',
        password: '100'
      });

    const token = loginRes.body.token;

    const profileRes = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body).toHaveProperty('username', 'testuser');
    expect(profileRes.body).toHaveProperty('email', 'testuser@gmail.com');
  });
});
