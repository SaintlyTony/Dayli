import request from 'supertest';
import app from './server.js';

describe('GET /menu', () => {
  it('returns menu array', async () => {
    const res = await request(app).get('/menu');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.menu)).toBe(true);
  });
});

