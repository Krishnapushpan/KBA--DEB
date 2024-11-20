import express ,{json} from 'express'
import { admin } from './Routes/adminroute.js';
const app=express();
app.use(json());
app.use('/',admin)
const port =8000;
app.listen(port,()=>{
console.log(`server is listening to the ${port}`)
})
