
const jwt = require('jsonwebtoken')
const { query } = require('../configration/dbconfig')
const connection = require('../configration/dbconfig')
const auth = async (req, res, next) => {
  
    const headerToken = req.headers['authorization']
    
    if (!headerToken || headerToken == null || !headerToken.startsWith('Bearer')) {
      res.status(400).json({ message: 'in_valid headerToken' })
    } else {
      const token = headerToken.split(' ')[1]
      const decoded = jwt.verify(token, 'whatsapp')
      const user = await connection.execute(`Select * from users Where ID = '${decoded.id}' `, (err,data)=>{
        if (err) {
            res.status(400).json({ message: 'in-valid token data' })
          } else {
            req.user = data[0]
            next()
          }
      })
     
    }
  }


const verifyadmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.type == 'admin') {
      next()
    } else {
      res.status(403).json({ message: 'you are not allowed to do that' })
    }
  })
}

module.exports = { auth, verifyadmin }


