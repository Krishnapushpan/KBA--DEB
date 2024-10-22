import express,{json} from 'express';
// import bcrypt from 'bcrypt';
import { admin } from './routes/adminroutes.js';
const app=express();
app.use(json())
app.use('/', admin)
const port =8000;

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})