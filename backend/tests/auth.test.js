// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    // Optionally connect to a test database here
  });

  afterAll(async () => {
    // Clean up and disconnect from the test database
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'inspector',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
