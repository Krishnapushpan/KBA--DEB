import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from "dotenv";


dotenv.config();
const admin=Router();

const addbook =new Map();
const user = new Map();
const secretkey = process.env.Secretkey;

admin.post('/signup',async(req,res)=>{
    try{
    // console.log("hi");
    const data =req.body;
  
    const {username,emailid,password,role}=data;
    console.log("signup details");
    
    const newp = await bcrypt.hash(password,10)
    // console.log(newp)
    if(user.has(username)){
        res.status(400).json({message:"data already saved"}) 
    }
    else{
        user.set(username,{username,emailid,password:newp,role});
        console.log(user.get(username));
        // res.status(201).send("data saved");
        console.log("sign up successfully");
        
        res.status(201).json({message:"data saved"})
    }}
    catch(error){
        res.status(500).json(error);
    }
})  

// login part
admin.post('/login',async(req,res)=>{

    const{username,password}=req.body;
    // console.log(username);
    console.log("login details");
    const result= user.get(username);
    console.log(result);
    if(!result){
        res.status(404).json("user not found")
    }
    else{
    
        const isvalid =await bcrypt.compare(password,result.password)
        // console.log(isvalid);
        if(isvalid){
        const token = await jwt.sign({username:username,userrole:result.role},secretkey,{expiresIn:'1h'})
        res.cookie('book',token,{httpOnly:true});
        res.status(200).json({token});
        console.log("login successfully")
        }
    }
    })

// add book
admin.post('/addbook',authenticate,(req,res)=>{
    // try{
      const data = req.body;
     const {bookname,authorname,description,price}= data;
      const role =req.userrole;
      // const admin= "admin";
              if(role!== "admin"){
  
              res.send("you have no permission")
              }
              else{
                  if(addbook.has(bookname)){
                      res.status(400).json({message:"book already added"})
                  }
                  else{
                      addbook.set(bookname,{bookname,authorname,description,price});
                      console.log(addbook.get(bookname));
                      console.log("book added ");
                      res.status(201).json({message:"book added"})
                      
                  }
              }
      // }
      // catch(error){
      //     res.status(500).json(error);
      // }
  })

  //viewbook on click  of button
  admin.get('/viewbook', async(req,res)=>{
    try{
        console.log(addbook.size);
  
        if(addbook.size!=0){
           
            
        res.send(Array.from(addbook.entries()))
    }
  else{
    res.status(404).json({message:'Not Found'});
  }}
    catch{
        res.status(404).json({message:"Internal error"})
    }
  })

  //view certificate 
// admin.get('/viewbook',async(req,res)=>{
    
//     const data = req.query;
//     const {bookname,authorname,description,price}= data;
//     if(addbook.has(bookname))
//     {
//       console.log("view book ")
//       console.log( "details",find)
     
//       console.log(addbook.get(bookname));
//       res.status(201).json(bookname)
//       console.log("book added ");
//       // res.json(find);

      
//     }else{
//       res.status(400).json("book is not found")
//       console.log("book is not found")
//     }
// })

//view add course depending on the role means user or admin
admin.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.userrole;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
  })



export {admin};
