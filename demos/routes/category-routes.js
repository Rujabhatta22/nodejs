// const { request } = require('express')
const express= require('express')

const router= express.Router()
const CategoryController=require('../controllers/categories_controller')

router.route('/')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.createCategory)
    .put((req,res)=> res.status(501).json({'reply':"not implemented"}))
    .delete(CategoryController.deleteAllCategories)

router.route('/:category_id')
    .get(CategoryController.getCategoryById)
    .post((req,res)=> res.status(501).json({'reply':"not implemented"}))
    .put(CategoryController.updateCategoryById)
    .delete(CategoryController.deleteCategoryById)    


module.exports=router    
