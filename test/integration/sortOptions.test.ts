import supertest from 'supertest';
import app from '../../src/app';

test('GET /sort-options returns an array options with code and name properties', async () => {
  const res = await supertest(app).get('/sort-options');

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);

  res.body.forEach((option: SortOption) => {
    expect(option).toHaveProperty('code');
    expect(option).toHaveProperty('name');
  });
});
