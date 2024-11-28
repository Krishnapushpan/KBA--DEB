import express,{json} from 'express';
import { route } from './routes/adminroute.js';
import cookieParser from "cookie-parser";
const app=express();

app.use(json());
app.use(cookieParser());
app.use('/',route)


const port =process.env.port;
app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})