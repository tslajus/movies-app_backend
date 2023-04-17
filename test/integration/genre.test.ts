import supertest from 'supertest';
import app from '../../src/app';

describe('GET /genres', () => {
  it('returns a list of genres', async () => {
    const res = await supertest(app).get('/genres');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });
});
