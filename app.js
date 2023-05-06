const express = require('express')

const PORT = 3000
const app = express()

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})

app.get('/books', (req, res) => {
  res.json({message: 'Hi from APi'})
})