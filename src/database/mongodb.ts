import mongoose from 'mongoose';

class MongoDb {
  static async connect() {
    const username = process.env.MONGO_USERNAME || '';
    const password = process.env.MONGO_PASSWORD || '';
    const uri = process.env.MONGO_URI || '';

    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, { auth: { password, username } });
  }
}

export { MongoDb };
