import express,{json} from 'express';
// import bcrypt from 'bcrypt';
import { admin } from './routes/adminroutes.js';
const app=express();
app.use(json())
app.use('/', admin)
const port =8000;
// const user = new Map();


//req means request and res means response
// app.get('/',(req,res)=>{
//     res.send("hello world!");
// })
// app.post('/signup',async(req,res)=>{
//     try{
//     console.log("hi");
//     const data =req.body;
  
//     const { firstname,lastname,username ,password, role}=data;
//     console.log(firstname);
    
//     const newp = await bcrypt.hash(password,10)
//     console.log(newp)
//     if(user.has(username)){
//         res.status(201).json({message:"data already saved"}) 
//     }
//     else{
//         user.set(username,{firstname,lastname, username,password:newp,role});
//         console.log(user.get(username));
//         // res.status(201).send("data saved");
//         res.status(201).json({message:"data saved"})
//     }
// }
//     catch(error){
//         res.status(500).json(error);
//     }
// })  
app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})