import express,{json} from 'express'
import {admin} from './routes/admin.js'
const app = express();
app.use(express.json());
const port= 8000;
app.use(json());
app.use('/',admin)
app.listen(port, () => {
    console.log("server is running in ",  port)
})