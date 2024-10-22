import express ,{json} from  'express';
import{ adminroute } from './routes/adminroutes.js';
const app = express();
app.use(json());
app.use('/', adminroute);
const port =8000;

app.post('/' ,(req,res)=>{
    //res .send('Hello World');
});

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})