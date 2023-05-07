import type { ObjectId } from 'mongodb'

type Book = {
  _id?: ObjectId
  title: string
  author: string
  pages: number
  rating: number
  genres: string[]
  reviews: {
      name: string
      body: string
    }[]
}


