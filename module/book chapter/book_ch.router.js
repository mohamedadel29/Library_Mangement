const { verifyadmin } = require('../../middleware/auth')
const { addBookChapter, updateBookChapter, deleteBookChapter } = require('./book_chapter')

const bookChRouter = require('express').Router()

bookChRouter.post('/addBookChapter/:Bid', verifyadmin, addBookChapter)

bookChRouter.put('/updateBookChapter/:BCid', verifyadmin, updateBookChapter)

bookChRouter.delete('/deleteBookChapter/:BCid', verifyadmin, deleteBookChapter)





module.exports = bookChRouter 