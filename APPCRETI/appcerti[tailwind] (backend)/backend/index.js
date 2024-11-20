import express ,{json} from  'express';
import{ adminroute } from './routes/adminroutes.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
    origin:'http://127.0.0.1:5502',
    credentials:true

}));
app.use(json());
app.use(cookieParser());
app.use('/', adminroute);
const port =process.env.port;


app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})