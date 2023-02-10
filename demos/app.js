require('dotenv').config()
const express= require('express')
const cors=require('cors')
const logger=require('./logger')
const mongoose=require('mongoose')

const path=require('path')
const book_routes=require('./routes/books-routes')
const category_routes=require('./routes/category-routes')
const auth = require('./middleware/auth')
const user_routes = require('./routes/user-routes')
const profile_routes = require('./routes/profile-routes')

const app=express()
app.use(cors())



const DB_URI =(process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URI
    :process.env.DB_URI

    console.log(DB_URI)

mongoose.connect(DB_URI)
    .then(()=>{
        console.log('connected to MongoDB server')
    }).catch((err)=>console.log(err))

//logger
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path}`)
    logger.log(`${req.method}\t${req.path}`)
    next() //
 
})
// express defined middleware 
app.use(express.json())


//HomePage
app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
    // res.send("Hello world")
})

app.use('/user',user_routes)
app.use(auth.verifyUser)
app.use('/profile', auth.verifyUser, profile_routes)
app.use('/books',book_routes)
app.use('/category', category_routes)



// Error handling 
app.use((err, req,  res, next)=>{
    console.log(err.stack)
    if(res.statusCode == 200) res.status(500)
    res.status(500).json({'msg': err.message})
})

// app.get('/books',(req, res)=>{
//     res.send("return all books")
// })
// app.post('/books',(req, res)=>{
//     res.send("create a book")
// })
// app.put('/books',(req,res)=>{
//     res.status(405).send('not allowed')
// })
// app.delete('/books',(req, res)=>{
//     res.send('delete')
// })

// app.listen(port,()=>{
//     console.log(`App is running on port: ${port}`)
// }
// )

module.exports=app
