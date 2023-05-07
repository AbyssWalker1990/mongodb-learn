import { Db, MongoClient } from 'mongodb'

class Database {
  public URI: string
  private client: MongoClient
  constructor () {
    this.URI = 'mongodb://127.0.0.1:27017/bookstore'
    this.client = new MongoClient(this.URI)
  }

  public connectDB = () => {
    
    const database = this.client.db()
    return database
  }
  
  getDB = (): Db => {
    return this.client.db()
  }
}

export default Database


