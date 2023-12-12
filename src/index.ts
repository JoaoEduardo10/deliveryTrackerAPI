import "dotenv/config";
import { MongoDb } from "./database/mongodb";
import { Console } from "console";

class Server {
  static initializing() {
    MongoDb.connect()
      .then(() => {
        console.log("connectado");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

Server.initializing();
