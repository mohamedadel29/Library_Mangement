const express=require("express")

//global modules////
const bookChRouter = require("./module/book chapter/book_ch.router")
const bookRouter = require("./module/book/book.router")
const orderRouter = require("./module/order/order.router")
const router = require("./module/user/user.router")
const app=express()
//publis middleware
app.use(express.json())
app.use(express.static('upload'))
app.use(express.urlencoded({extended:true}))
const cors=require("cors") //allow http request local host
app.use(router, bookRouter, bookChRouter, orderRouter)
app.listen(5030,()=>{console.log("app listhen port 5030")})