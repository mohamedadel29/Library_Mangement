
const connection = require("../../configration/dbconfig")
const jwt = require('jsonwebtoken')
const bcrypt =require("bcrypt")


const getAllUsers = (req,res)=>{
    connection.execute(`Select * from users`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}
const signUp = async (req,res)=>{
    const {email , password, phone, type} = req.body
    const userfound = await connection.execute(`Select ID from users Where email = '${email}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
          if(data[0]){
            console.log(data);
        res.status(201).json({message: 'email is exist' })
          } else {
    
            const newUser = connection.execute(`INSERT INTO users( email, password, phone, type) VALUES ('${email}','${password}','${phone}','${type}')` , (err,data)=>{
                if(err) {
                    res.status(400).json({message: 'error', err })
                } 
            })
            
              connection.execute(`Select ID from users Where email = '${email}' `,(err,data)=>{
                if(err) {
                    res.status(400).json({message: 'error', err })
                } else {
                    console.log(data[0].ID);
                    bcrypt.hash(password,10)
            const token = jwt.sign({ id: data[0].ID }, 'whatsapp')
            res.status(200).json({message: 'Done', token })
                }
            })
            
            }
          }
        } )
    
}

const logIn = async (req,res)=>{
    const {email , password} = req.body
    const userfound = await connection.execute(`Select ID from users Where email = '${email}'  and password = '${password}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
          if(data[0]){
            console.log(data[0].ID);
            const token = jwt.sign({ id: data[0].ID }, 'whatsapp')
            res.status(200).json({message: 'Done', token })
          } else {
            
            
            
            res.status(200).json({message: 'check your email or password' })
            
            
            }
          }
        } )
    
}

const deleteUser = (req,res)=>{
    const {Uid} = req.params
    
    connection.execute(`DELETE FROM users WHERE ID = '${Uid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const updateUser = (req,res)=>{
    const {Uid} = req.params
    const {email , password, phone, type} = req.body
    
    connection.execute(`UPDATE users SET email='${email}',password='${password}',phone='${phone}',type='${type}' WHERE ID = '${Uid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getHistory = (req,res)=>{
    const Uid = req.user.ID
    connection.execute(`SELECT  b.name
    FROM history as h
    INNER JOIN books as b ON h.bID=b.bID  
    INNER JOIN users as u ON h.uid = u.id where uid = '${Uid}'`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            const unique = [...new Map(data.map((m) => [m.name, m])).values()]
            console.log(data);
            res.status(200).json({message: 'Done', unique })
        }
    })
}


module.exports = {getAllUsers, signUp, logIn, deleteUser, updateUser, getHistory }