import supertest from 'supertest';
import app from '../src/app';

describe('GET /healthcheck', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/healthcheck')
      .expect(200, done);
  });
});
