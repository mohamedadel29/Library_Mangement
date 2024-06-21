const connection = require("../../configration/dbconfig")

const getAllOrders = (req,res)=>{
    connection.execute(`SELECT o.*, b.name, u.email
    FROM orders as o
    INNER JOIN books as b ON o.bID=b.bID  
    INNER JOIN users as u ON o.uid = u.id `, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getUserOrders = (req,res)=>{
    const Uid = req.user.ID
    console.log(Uid);
    connection.execute(`SELECT o.*, b.name, u.email
    FROM orders as o
    INNER JOIN books as b ON o.bID=b.bID  
    INNER JOIN users as u ON o.uid = u.id where uid = '${Uid}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getWaitingOrders = (req,res)=>{
    connection.execute(`Select * from orders where status = 'waiting accept'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getAcceptedOrders = (req,res)=>{
    connection.execute(`Select * from orders where status = 'accepted'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getCancelledOrders = (req,res)=>{
    connection.execute(`Select * from orders where status = 'cancelled'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const acceptOrder = (req,res)=>{
    const {Oid} = req.params
    connection.execute(`UPDATE orders SET status='accepted' WHERE oid = '${Oid}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const cancellOrder = (req,res)=>{
    const {Oid} = req.params
    connection.execute(`UPDATE orders SET status='cancelled' WHERE oid = '${Oid}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const addOrder = (req,res)=>{
    const {Bid} = req.params
    const Uid = req.user.ID
    console.log(req.user);
    connection.execute(`INSERT INTO orders(bID, uid) VALUES ('${Bid}' , '${Uid}')`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

module.exports = {getAllOrders, getUserOrders, getAcceptedOrders, getCancelledOrders, getWaitingOrders, acceptOrder, cancellOrder, addOrder}