const { MongoClient } = require('mongodb')

let dbConnection 

module.exports = function connectToDb (callback) {
  try {
    const client = new MongoClient('mongodb://localhost:27017/')
    dbConnection = client.db('bookstore')
    return dbConnection
  } catch (error) {
    return console.log(error)
  }
}


