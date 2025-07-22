import express from 'express'
import dotenv from 'dotenv'
import connectdb from './config/connectdb.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import categoryRoute from './routes/categoryRoutes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000

connectdb()
app.use(cors()) 
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoutes)

//home route
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })
app.get('/',(req,res)=>{
    res.end("<h1>Hello Ecommerce</h2>")
})


app.listen(PORT,()=>console.log(`server is running on ${PORT} and mode is ${process.env.DEV_MODE}`))