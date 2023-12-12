import { MongoDb } from './database/mongodb';
import { app } from './app';

class Server {
  static initializing() {
    MongoDb.connect()
      .then(() => {
        const PORT = process.env.PORT || '3000';

        app.listen(PORT, () => console.log('server on'));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

Server.initializing();
