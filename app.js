const express = require('express')
const Database = require('./db')
const BookController = require('./controllers/BookController')

const dbConnection = new Database()
const database = dbConnection.getDB()

class App {
  constructor (PORT, controllers) {
    this.PORT = PORT
    this.app = express()
    this.initControllers(controllers)
  }

  initControllers = (controllers) => {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  listen = () => {
    this.app.listen(this.PORT, () => {
      console.log(`App listening on PORT: ${this.PORT}`)
    })
  }
}



const app = new App(3000, [
  new BookController()
])

app.listen()


// async function test () {
//   try {
//     console.log('Started')
//     const books = database.collection('books')
//     const book = await books.findOne({title: "1984"})
//     console.log(book)
//   } catch (error) {
//     console.log(error)
//   } finally {
//     console.log('finally')
//     await client.close()
//   }
// }

// test()