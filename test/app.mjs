
import { createApp } from "../lib/app.mjs";
import request from "supertest";

describe('GET /user', () => {
  it('responds with json', (done) => {
    request(createApp())
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
