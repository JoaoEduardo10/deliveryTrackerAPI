import 'vitest';
import 'dotenv/config';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { MockMongo } from './mock/mongodb';
import {} from '../src';
import supertest from 'supertest';
import { app } from '../src/app';

const serverTest = supertest(app);

const mockMongo = new MockMongo();

beforeAll(async () => {
  await mockMongo.connect();
});

afterEach(async () => {
  vi.resetAllMocks();
  await mockMongo.clearDatabase();
});

afterAll(async () => {
  vi.clearAllMocks();
  await mockMongo.closeDatabase();
});

export { serverTest };
