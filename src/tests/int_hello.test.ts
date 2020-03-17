import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('returns hello world from the root', () => {
    const expectedStatus = 200;
    const expectedBody = 'Hello world from the root!';
    return request(app)
      .get('/hello/world')
      .expect(expectedStatus, expectedBody);
  });
});
