const { request } = require('express')
const express= require('express')
const router= express.Router()
const bookController=require('../controllers/books_controller')
const reviewsController=require('../controllers/reviews_controller')
const { verifyUser } = require('../middleware/auth')

router.route('/')
    .get(bookController.getAllBooks)
    .post(verifyUser, bookController.createBook)
    .put((req,res)=> res.status(501).json({'reply':"not implemented"}))
    .delete(verifyUser,bookController.deleteBook)


router.use(verifyUser).route('/:id')
    .get(bookController.getBook)
    .put(bookController.UpdateABook)
    .delete(bookController.DeleteABook)
    .post((req,res)=>{
        res.status(501).send({'reply':"not implemented"})
    })
router.route('/:id/reviews')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReviews)
    .put((req,res)=> res.status(501).json({'reply':"not implemented"}))
    .delete()

router.route('/:id/reviews/:review_id')
    .get(reviewsController.getReviewById)
    .put()
    .post((req,res)=> res.status(501).json({'reply':"not implemented"}))
    .delete(reviewsController.deleteReviewById)

module.exports=router

