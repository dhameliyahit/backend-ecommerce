import userModel from "../model/userModel.js"
import orderModel from '../model/orderModel.js'
import  {comparePassword, hashPassword}  from "../helpers/authHelper.js"
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address,answer} = req.body
        //validation .. . .. .
        if(!name || !email || !password || !phone || !address || !answer){
            return res.send({message:'please fill all deatils (Required) .. .. ..'})
        }
        //existing user

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.send({
                success:false,
                message:'already register please Login',
            })
        }
        
        //registerUser
        const hashedPassword =  await hashPassword(password)
       
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()
       
        res.status(201).send({
            success:true,
            message:'User register Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'internal server error',
            error
        })
    }
}

//POST LOGIN

export const loginController=async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invaild email and Password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User is not register',
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invaild Password'
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'login  successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'internal Server Error',
            error
        })
    }
}

//forgot-password controller
export const forgotPasswordController = async(req,res)=>{
    try {
        const {email,answer,newPassword} = req.body
        console.log(email , answer , newPassword)
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'an swer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'new password is required'})
        }
        //check 
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email Or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Somthing went wrong',
            error
        })
    }
}

// test Controller

export const testController=(req,res)=>{
   res.send('protected Route') 
}

//update prfile const

export const updateProfileController = async(req,res)=>{
    try {
        const {name,email,address,phone} =  req.body
        const user = await userModel.findById(req.user._id)
        //password 
        // if(password && password.length < 6)  {
        //         return res.json({error:"Password must Be require and length  is minimum 6 digit"})
        // }  
        // const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            // password: hashedPassword || user.password,
            phone: phone || user.phone,
            address:address || user.address
        },{
            new:true
        })   
        res.status(200).send({
            success:true,
            message:'profile updated successfully',
            updatedUser 
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while updating user profile',
            error
        })
    }
}

//get orders controller

export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

//get all orders

export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
//orderStatusController
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };