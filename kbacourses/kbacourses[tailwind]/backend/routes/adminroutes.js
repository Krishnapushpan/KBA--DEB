import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const admin=Router();

const user = new Map();
const secretkey = "hello";

//req means request and res means response
admin.get('/',(req,res)=>{
    res.send("hello world!");
})
admin.post('/signup',async(req,res)=>{
    try{
    console.log("hi");
    const data =req.body;
  
    const { firstname,lastname,username ,password, role}=data;
    console.log(firstname);
    
    const newp = await bcrypt.hash(password,10)
    console.log(newp)
    if(user.has(username)){
        res.status(201).json({message:"data already saved"}) 
    }
    else{
        user.set(username,{firstname,lastname, username,password:newp,role});
        console.log(user.get(username));
        // res.status(201).send("data saved");
        res.status(201).json({message:"data saved"})
    }}
    catch(error){
        res.status(500).json(error);
    }
})  

admin.post('/login',async(req,res)=>{

const{username,password}=req.body;
console.log(username);
const result= user.get(username);
console.log(result);
if(!result){
    res.status(404).json("user not found")
}
else{

    const isvalid =await bcrypt.compare(password,result.password)
    console.log(isvalid);
    if(isvalid){
    const token = await jwt.sign({username:username,userrole:result.role},secretkey,{expiresIn:'1h'})
    res.cookie('authtoken',token,{httpOnly:true});
    res.status(200).json({token});
    console.log(token)

    }
    
}

})



export {admin};