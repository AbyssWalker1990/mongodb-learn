import express, { Request, Response }from 'express'
import Controller from '../interfaces/controller.interface'
import Database from '../db'

class BookController implements Controller{
  path = '/books'
  router = express.Router()

  constructor () {
    this.initRoutes()
  }
  
  initRoutes = (): void => {
    this.router.get(`${this.path}/`, this.getAllBooks)
  }

  getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const connection = new Database()
    const db = connection.connectDB()
    const data = db.collection('books').find()
    const bookList = []
    for await (const book of data) {
      bookList.push(book)
    }
    res.json({message: bookList})
  }
}

export default BookController