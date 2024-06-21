const connection = require("../../configration/dbconfig")

const getAllBooks = (req,res)=>{
    connection.execute(`Select * from books`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const addBook = (req,res)=>{
    const {name , description, author, field, pdf} = req.body
    var utc = new Date().toJSON().slice(0,10);
    console.log(utc);
    publication = utc
    connection.execute(`INSERT INTO books( name , b_description, author, field, publication_date, pdf) VALUES ('${name}' , '${description}', '${author}', '${field}', '${publication}', '${pdf}')`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const updateBook = (req,res)=>{
    const {Bid} = req.params
    const {name , description, author, field, pdf} = req.body
    
    connection.execute(`UPDATE books SET name='${name}',author='${author}',b_description='${description}',field='${field}',pdf='${pdf}' WHERE bID = '${Bid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}


const deleteBook = (req,res)=>{
    const {Bid} = req.params
    
    connection.execute(`DELETE FROM books WHERE bID = '${Bid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const getOneBook = (req,res)=>{
    const {Bid} = req.params
    const Uid = req.user.ID
    connection.execute(`Select * from books where bid = '${Bid}'`,(err,bookData)=>{
        if(err) {

        }else{
            connection.execute(`INSERT INTO history( bid, uid) VALUES ('${Bid}' , '${Uid}')`, (err)=>{
                if(err) {
                    res.status(400).json({message: 'error', err })
                } 
            })
            connection.execute(`SELECT b.title, b.description
        FROM books as a
        INNER JOIN bookchapter as b ON a.bID=b.bID where a.bID='${Bid}' ;`, (err,data)=>{
        if(err) {
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', bookData,data })
        }
    })
        }
    })
    
}

module.exports = {getAllBooks, addBook, updateBook, deleteBook, getOneBook}