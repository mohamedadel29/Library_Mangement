const { auth, verifyadmin } = require('../../middleware/auth')
const { addBook, updateBook, deleteBook, getAllBooks, getOneBook } = require('./book')

const bookRouter = require('express').Router()

bookRouter.post('/addbook', verifyadmin, addBook)

bookRouter.put('/updatebook/:Bid', verifyadmin, updateBook)

bookRouter.delete('/deletebook/:Bid', verifyadmin, deleteBook)

bookRouter.get('/getallbooks', getAllBooks)

bookRouter.get('/getonebook/:Bid',auth, getOneBook)

module.exports = bookRouter 