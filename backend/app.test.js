const request = require('supertest');
const app = require('./app');

describe('Task API', () => {

  test('GET /tasks returns task list', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
       expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'New task from test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New task from test');
  });

  test('POST /tasks rejects empty title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /tasks/:id removes a task', async () => {
    const res = await request(app).delete('/tasks/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /health returns healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('healthy');
  });

});
