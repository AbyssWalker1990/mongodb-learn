import type { Request, Response } from 'express'
import express from 'express'
import { ObjectId } from 'mongodb'
import type Controller from '../interfaces/controller.interface'
import db from '../db'

class BookController implements Controller {
  path = '/books'
  router = express.Router()

  constructor () {
    this.initRoutes()
  }

  private readonly initRoutes = (): void => {
    this.router.get(`${this.path}/`, this.getAllBooks)
    this.router.get(`${this.path}/:bookId`, this.getBookById)
  }

  private readonly getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const bookList = []
    try {
      const data = db.collection('books').find()
      for await (const book of data) {
        bookList.push(book)
      }
    } catch (error) {
      res.status(500).json({ error })
    }
    res.status(200).json({ message: bookList })
  }

  private readonly getBookById = async (req: Request, res: Response): Promise<void> => {
    const bookId = new ObjectId(req.params.bookId)
    try {
      const data = await db.collection('books').findOne({ _id: bookId })
      res.status(200).json({ book: data })
    } catch (error) {
      res.status(500).json({ err: 'Cant find' })
    }
  }
}

export default BookController
