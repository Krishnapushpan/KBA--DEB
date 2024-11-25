import express,{json} from 'express'
import {admin} from './routes/admin.js'
import cors from 'cors'
const app = express();
app.use(
    cors({ 
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
const port= 8000;
app.use(json());
app.use('/',admin)
app.listen(port, () => {
    console.log("server is running in ",  port)
})