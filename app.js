const express = require('express')
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017/bookstore')
const database = client.db()

async function test () {
  try {
    console.log('Started')
    const books = database.collection('books')
    const book = await books.findOne({title: "1984"})
    console.log(book)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('finally')
    await client.close()
  }
}

test()

const PORT = 3000
const app = express()




app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})
// let books = []
// app.get('/books', (req, res) => {
//   db.collection('books').find().sort({author: 1}).forEach(book => books.push(book))
//     .then(() => {
//       res.status(200).json(books)
//     })
//     .catch((err) => {
//       res.status(500).json({error: err.toString()})
//     })
// })