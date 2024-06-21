const { auth, verifyadmin } = require("../../middleware/auth")
const { getAllUsers, signUp, logIn, updateUser, deleteUser, getHistory } = require("./user")
const router = require('express').Router()

router.get('/getallusers', verifyadmin, getAllUsers)

router.post('/signup', signUp)

router.post('/login', logIn)

router.put('/updateuser/:Uid', verifyadmin, updateUser)

router.delete('/updateuser/:Uid', verifyadmin, deleteUser)

router.get('/gethistory', auth, getHistory)


module.exports = router 