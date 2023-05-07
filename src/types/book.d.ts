import type { ObjectId } from 'mongodb'

interface Book {
  _id?: ObjectId
  title: string
  author: string
  pages: number
  rating: number
  genres: string[]
  reviews: Array<{
    name: string
    body: string
  }>
}
