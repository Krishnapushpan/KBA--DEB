import express,{json} from 'express';
import dotenv from "dotenv";
// import bcrypt from 'bcrypt';
import { admin } from './routes/adminroutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true

        // origin:'http://127.0.0.1:8000'
}));
app.use(json())
app.use(cookieParser());
app.use('/', admin)
const port =process.env.port;

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})