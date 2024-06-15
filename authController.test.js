const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const User = require('../models/user');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should hash the password and create a user', async () => {
      const req = mockRequest({
        body: {
          username: 'testuser',
          email: 'testuser@gmail.com',
          password: '100'
        }
      });
      const res = mockResponse();

      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.create.mockResolvedValue({ id: 1 });

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('100', 10);
      expect(User.create).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'hashedpassword'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });
  });

  describe('login', () => {
    it('should authenticate user and return a token', async () => {
      const req = mockRequest({
        body: {
          email: 'testuser@gmail.com',
          password: '100'
        }
      });
      const res = mockResponse();

      const user = {
        id: 1,
        email: 'testuser@gmail.com',
        password: 'hashedpassword'
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'testuser@gmail.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('100', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });
  });
});
