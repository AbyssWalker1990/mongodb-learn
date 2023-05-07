import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import { ObjectId } from 'mongodb'
import type Controller from '../interfaces/controller.interface'
import type { Book } from '../types/book'
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
    this.router.post(`${this.path}/`, this.postBook)
    this.router.delete(`${this.path}/:bookId`, this.deleteBookById)
    this.router.patch(`${this.path}/:bookId`, this.updateBookById)
  }

  private readonly getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.p) || 0
    console.log(page)
    const booksPerPage = 3
    const bookList: Book[] = []
    try {
      const data = db.collection('books').find().skip(page * booksPerPage).limit(booksPerPage)
      for await (const book of data) {
        bookList.push(book as Book)
      }
    } catch (error) {
      res.status(500).json({ error })
    }
    res.status(200).json({ message: bookList })
  }

  private readonly getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (ObjectId.isValid(req.params.bookId)) {
      const bookId = new ObjectId(req.params.bookId)
      try {
        const data = await db.collection('books').findOne({ _id: bookId })
        res.status(200).json({ book: data })
      } catch (error) {
        res.status(500).json({ err: 'Cant find' })
      }
    } else {
      res.status(500).json({ err: 'Invalid Id' })
    }
  }

  private readonly postBook = async (req: Request, res: Response): Promise<void> => {
    const book: Book = req.body
    try {
      const result = await db.collection('books').insertOne(book)
      res.status(201).json({ result })
    } catch (error) {
      res.status(500).json({ err: 'Invalid body' })
    }
  }

  private readonly deleteBookById = async (req: Request, res: Response): Promise<void> => {
    if (ObjectId.isValid(req.params.bookId)) {
      const bookId = new ObjectId(req.params.bookId)
      try {
        const data = await db.collection('books').deleteOne({ _id: bookId })
        res.status(200).json({ data })
      } catch (error) {
        res.status(500).json({ err: 'Cant delete' })
      }
    } else {
      res.status(500).json({ err: 'Invalid Id' })
    }
  }

  private readonly updateBookById = async (req: Request, res: Response): Promise<void> => {
    if (ObjectId.isValid(req.params.bookId)) {
      const bookId = new ObjectId(req.params.bookId)
      const updates: Record<string, unknown> = req.body
      try {
        const data = await db.collection('books').updateOne({ _id: bookId }, { $set: updates })
        res.status(200).json({ data })
      } catch (error) {
        res.status(500).json({ err: 'Cant update' })
      }
    } else {
      res.status(500).json({ err: 'Invalid Id' })
    }
  }
}

export default BookController
