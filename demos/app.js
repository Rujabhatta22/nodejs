require('dotenv').config()
const express= require('express')
const app=express()
const logger=require('./logger')
const mongoose=require('mongoose')
const port=3000
const path=require('path')
const book_routes=require('./routes/books-routes')
const category_routes=require('./routes/category-routes')
const auth = require('./middleware/auth')
const user_routes = require('./routes/user-routes')

mongoose.connect('mongodb://127.0.0.1:27017/books')
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

app.use('/user', user_routes)
app.use(auth.verifyUser)
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

app.listen(port,()=>{
    console.log(`App is running on port: ${port}`)
})