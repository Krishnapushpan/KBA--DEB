import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";

const admin=Router();

const addcourse =new Map();
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
// login part
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
// add course
admin.post('/addcourse',authenticate,(req,res)=>{
  try{
    const data = req.body;
   const {courseid,coursename, coursetype,description}= data;
    const role =req.userrole;
    // const admin= "admin";
            if(role!== "admin"){

            res.send("you have no permission")
            }
            else{
                if(addcourse.has(courseid)){
                    res.status(201).json({message:"course already added"})
                }
                else{
                    addcourse.set(courseid,{courseid,coursename, coursetype,description});
                    console.log(addcourse.get(courseid));
                    console.log("data saved");
                    res.status(201).json({message:"data saved"})
                    
                }
            }
    }
    catch(error){
        res.status(500).json(error);
    }
})

// update course

admin.post('/update',authenticate,(req,res)=>{
    try{
      const data = req.body;
     const {courseid,newcoursename,newcoursetype,newdescription}= data;
      const role =req.userrole;
      // const admin= "admin";
              if(role!== "admin"){
  
              res.send("you have no permission")
              }
              else{ 
                  if(addcourse.has(courseid)){
                    //   res.status(201).json({message:"course already added"})
                    addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription});
                    console.log(addcourse.get(courseid));
                    console.log("data updated");
                    res.send("data updated")
                  }
                  else{
                      
                    res.send("this course not exist")
                  }
              }
      }
      catch(error){
          res.status(500).json(error);
      }
  })

 //view
 admin.post('/view',(req,res)=>{
    try{
      const data = req.body;
     const {courseid}= data;
      
                  if(addcourse.has(courseid)){
                     console.log("view data");
                    // addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription});
                    console.log(addcourse.get(courseid));
                   
                    // res.send("data updated")
                  }
                  else{
                      
                    res.send("this course not exist")
                  }
                }
      catch(error){
          res.status(500).json(error);
      }
  })
 
export {admin};