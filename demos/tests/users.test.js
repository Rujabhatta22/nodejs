const { default: mongoose } = require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const User = require('../models/User')

const api=supertest(app)

const user={
    username:"testUser4",
    password:"test123"
}

beforeAll(async()=>{
    await User.deleteMany({})
})


test('user registration', async ()=>{
    await api.post('/user/register')
    .send(user).expect(201)
    .expect(res => {
        // console.log(res.body)
        expect(res.body.status).toContain('success')
        
    })
})

afterAll(async ()=>{
    await mongoose.connection.close()
})

test('user login', async ()=>{
    await api.post('/user/login')
    .send(user).expect(200)
    .expect(res => {
        // console.log(res.body)
        expect(res.body.status).toContain('Login Success')
        
    })
})