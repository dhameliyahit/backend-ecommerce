import mongoose from "mongoose";

const connectdb = async()=>{
    try {
      const conn =  await mongoose.connect(process.env.MONGODB_URL)
    console.log(`data base connect successfully host is ${conn.connection.host}`)
    } catch (e) {
        console.log(e)
    }
}
export default connectdb