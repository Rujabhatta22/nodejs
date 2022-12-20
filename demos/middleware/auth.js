const jwt = require('jsonwebtoken')


const verifyUser=(req, res, next)=>{
    if(!req.headers.authorization){
        let err = new Error('Authorization token is missing')
        res.status(400)
        return next(err)
    }
    token=req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return next(err)

        //verify user
        req.user=decoded
        next()
        // console.log(decoded)

    })
    // console.log(token)
}



module.exports = { verifyUser }