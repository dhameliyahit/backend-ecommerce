import express from 'express'
import { registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authmiddleware.js'

const router = express.Router()

//register patten .. .. ..
//register
router.post('/register',registerController)

//login
router.post("/login",loginController)

//forget password
router.post('/forgot-password',forgotPasswordController)

//test
router.get('/test',requireSignIn,isAdmin,testController)

//proted user routes

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//proted Admin routes

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
//update profile
router.put('/profile',requireSignIn,updateProfileController)

//order
router.get('/orders',requireSignIn,getOrdersController)

// all orders
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController)

//order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router