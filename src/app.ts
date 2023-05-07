import express from 'express'
import Database from './db'
import BookController from './controllers/BookController'
import Controller from './interfaces/controller.interface'

const dbConnection = new Database()
const database = dbConnection.getDB()

class App {
  private app: express.Application
  constructor (public PORT: number, controllers: Controller[]) {
    this.PORT = PORT
    this.app = express()
    this.initControllers(controllers)
  }

  private initControllers = (controllers: Controller[]): void => {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  public listen = () => {
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