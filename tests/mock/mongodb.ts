import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Delivery } from '../../src/model/Delivery';

export class MockMongo {
  private Delivery: typeof Delivery;
  private mongod: ReturnType<typeof MongoMemoryServer.create>;

  constructor() {
    this.Delivery = Delivery;
    this.mongod = MongoMemoryServer.create();
  }

  async connect() {
    const uri = (await this.mongod).getUri();

    await mongoose.connect(uri);
  }

  async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await this.mongod).stop();
  }

  async clearDatabase() {
    await this.Delivery.deleteMany();
  }
}
