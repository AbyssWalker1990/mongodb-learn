import { type Db, MongoClient } from 'mongodb'

class Database {
  public URI: string
  private readonly client: MongoClient
  constructor () {
    this.URI = 'mongodb://127.0.0.1:27017/bookstore'
    this.client = new MongoClient(this.URI)
  }

  public connectDB = (): Db => {
    const database = this.client.db()
    return database
  }
}

const connection = new Database()
const db = connection.connectDB()

export default db
