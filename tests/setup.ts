import 'vitest';
import 'dotenv/config';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { MockMongo } from './mock/mongodb';

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
