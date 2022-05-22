import { Mongoose } from "mongoose";

export class Database extends Mongoose {
  database: Promise<Mongoose> | null;
  constructor() {
    super();
    this.database = null;
  }

  private connectToDatabase(): Promise<Mongoose> | null {
    try {
      return this.connect(process.env["DATABASE_URI"]!, {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public init() {
    this.database = this.connectToDatabase();
  }
}
