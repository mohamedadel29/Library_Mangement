const connection = require("../../configration/dbconfig")


const addBookChapter = (req,res)=>{
    const {Bid} = req.params
    const {title, description} = req.body
    
    connection.execute(`INSERT INTO bookchapter( title,description, bID) VALUES ('${title}' , '${description}', '${Bid}')`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

const updateBookChapter = (req,res)=>{
    const {BCid} = req.params
    const {title, description} = req.body
    
    connection.execute(`UPDATE bookchapter SET title='${title}',description='${description}' WHERE bcID = '${BCid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}


const deleteBookChapter = (req,res)=>{
    const {BCid} = req.params
    
    connection.execute(`DELETE FROM bookchapter WHERE bcID = '${BCid}'`, (err,data)=>{
        if(err){
            res.status(400).json({message: 'error', err })
        } else {
            res.status(200).json({message: 'Done', data })
        }
    })
}

module.exports = { addBookChapter, updateBookChapter, deleteBookChapter}