import express  from 'express'
const app = express()
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"




app.listen(5000,()=>{
  console.log(`port start at ${5000}`)
})