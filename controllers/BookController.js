const express = require('express')

module.exports = class BookController {
  path = '/books'
  router = express.Router()

  constructor () {
    this.initRoutes()
  }
  
  initRoutes = () => {
    this.router.get(`${this.path}/`, this.getAllBooks)
  }

  getAllBooks = (req, res) => {
    res.json({message: "OK"})
  }
}