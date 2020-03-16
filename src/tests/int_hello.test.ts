import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('returns hello world from the root', () => {
    const expectedStatus = 200;
    const expectedBody = 'Hello world from the root!';
    return request(app)
      .get('/')
      .expect(expectedStatus, expectedBody);
  });
});
