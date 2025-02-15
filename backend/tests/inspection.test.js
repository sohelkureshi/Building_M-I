// backend/tests/inspection.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Inspection = require('../models/Inspection');

let token, user;

describe('Inspection API', () => {
  beforeAll(async () => {
    // Clear any existing data in the test database
    await User.deleteMany({});
    await Inspection.deleteMany({});

    // Register a test user
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Inspector Test',
        email: 'inspector@example.com',
        password: 'password',
        role: 'inspector',
      });

    // Login the test user to obtain a token and user details
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'inspector@example.com',
        password: 'password',
      });
    token = loginRes.body.token;
    user = loginRes.body.user; // Capture the authenticated user details
  });

  afterAll(async () => {
    await Inspection.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a new inspection', async () => {
    const res = await request(app)
      .post('/api/inspections')
      .set('Authorization', `Bearer ${token}`)
      .send({
        facilityId: 'FAC123',
        scheduledDate: new Date(),
        notes: 'Routine inspection',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.facilityId).toEqual('FAC123');
    // Optionally verify that the inspector field matches the authenticated user's ID
    expect(String(res.body.inspector)).toEqual(String(user.id || user._id));
  });
});
