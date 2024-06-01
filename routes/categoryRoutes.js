import express from 'express'
import { isAdmin, requireSignIn } from './../middleware/authmiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';

const router = express.Router()

//create category routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update-category routes

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get All category route

router.get('/get-category',categoryController)

// single category

router.get('/single-category/:slug',singleCategoryController)

//delete category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)


export default router