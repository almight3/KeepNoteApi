import express, { application }  from 'express'
const app = express()
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import error from "./middleware/error.js";


dotenv.config()

mongoose.connect(process.env.DB_URL).then(res=>{
  console.log("db connected successfully")
})
.catch(err=>{
  console.log(err)
})


app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",userRoutes)
app.use(error)

app.listen(process.env.PORT,()=>{
  console.log(`port start at ${process.env.PORT}`)
})