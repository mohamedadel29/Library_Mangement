const { auth, verifyadmin } = require('../../middleware/auth')
const { addOrder, getAllOrders, getAcceptedOrders, getCancelledOrders, getUserOrders, acceptOrder, cancellOrder, getWaitingOrders } = require('./order')

const orderRouter = require('express').Router()

orderRouter.post('/addOrder/:Bid', auth, addOrder)

orderRouter.get('/getAllOrders', verifyadmin,  getAllOrders)

orderRouter.get('/getWaitingOrders', verifyadmin, getWaitingOrders)

orderRouter.get('/getAcceptedOrders', verifyadmin, getAcceptedOrders)

orderRouter.get('/getCancelledOrders', verifyadmin, getCancelledOrders)

orderRouter.get('/getUserOrders',auth, getUserOrders)

orderRouter.post('/acceptorder/:Oid',verifyadmin, acceptOrder)

orderRouter.post('/cancellOrder/:Oid',verifyadmin, cancellOrder)


module.exports = orderRouter 