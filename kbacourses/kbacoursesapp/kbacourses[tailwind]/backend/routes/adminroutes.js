import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from "dotenv";


dotenv.config();
const admin=Router();

const addcourse =new Map();
const user = new Map();
const secretkey = process.env.secretkey;

//req means request and res means response
// admin.get('/',(req,res)=>{
//     // res.send("hello world!");
// })
admin.post('/signup',async(req,res)=>{
    try{
    // console.log("hi");
    const data =req.body;
  
    const { firstname,lastname,username ,password, role}=data;
    console.log("signup details");
    
    const newp = await bcrypt.hash(password,10)
    // console.log(newp)
    if(user.has(username)){
        res.status(400).json({message:"data already saved"}) 
    }
    else{
        user.set(username,{firstname,lastname, username,password:newp,role});
        console.log(user.get(username));
        // res.status(201).send("data saved");
        // console.log("sign up successfully");
        
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
// console.log(result);
if(!result){
    res.status(404).json("user not found")
}
else{

    const isvalid =await bcrypt.compare(password,result.password)
    // console.log(isvalid);
    if(isvalid){
    const token = await jwt.sign({username:username,userrole:result.role},secretkey,{expiresIn:'1h'})
    res.cookie('authtoken',token,{httpOnly:true});
    res.status(200).json({token});
    console.log("login successfully")

    }
    
}

})
// add course
admin.post('/addcourse',authenticate,(req,res)=>{
  // try{
    const data = req.body;
   const {courseid,coursename,coursetype,description ,price}= data;
    const role =req.userrole;
    // const admin= "admin";
            if(role!== "admin"){

            res.send("you have no permission")
            }
            else{
                if(addcourse.has(courseid)){
                    res.status(400).json({message:"course already added"})
                }
                else{
                    addcourse.set(courseid,{courseid,coursename,coursetype,description,price});
                    console.log(addcourse.get(courseid));
                    console.log("course added ");
                    res.status(201).json({message:"course added"})
                    
                }
            }
    // }
    // catch(error){
    //     res.status(500).json(error);
    // }
})

// update course

admin.post('/update',authenticate,(req,res)=>{
    try{
      const data = req.body;
     const {courseid,newcoursename,newcoursetype,newdescription,newprice}= data;
      const role =req.userrole;
      // const admin= "admin";
              if(role!== "admin"){
  
              res.send("you have no permission")
              }
              else{ 
                  if(addcourse.has(courseid)){
                    //   res.status(201).json({message:"course already added"})
                    addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription,newprice});
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
//update course using patch
admin.patch('/patchupdate',authenticate,(req,res)=>{
  try{
    const data = req.body;
   const {courseid,newcoursename,newcoursetype,newdescription }= data;
   console.log(data);
   
    const role =req.userrole;
    // const admin= "admin";
    console.log(role);
    
            if(role!== "admin"){

            res.send("you have no permission")
            }
            else{ 
                if(addcourse.has(courseid)){
                  const existingdetails = addcourse.get(courseid);
                  //   res.status(201).json({message:"course already added"})
                  console.log(existingdetails);
                  
                  addcourse.set(courseid,{courseid:courseid || existingdetails.courseid,coursename: newcoursename || existingdetails.coursename,coursetype:  newcoursetype || existingdetails.coursetype,description:newdescription || existingdetails.description});
                  console.log(addcourse.get(courseid));
                  console.log("data updated using patch");
                  // res.send("data updated")
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
admin.put('/putupdate',authenticate,(req,res)=>{
  try 
  {
  const role=req.userrole;
  console.log(role);
  const coursedetails=req.body;
  const{courseid,newcoursename,newcoursetype,newdescription,newprice}=coursedetails;
  if(role!=='admin'){
      res.send('you dont have permission !');
    }
  else{
      if(addcourse.has(courseid))
          {
          addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription,newprice});
          console.log(addcourse.get(courseid));
          console.log('course updated sucessfully');
          res.send(' course updated sucessfully');
          
          }
      else{
          res.send('this course does not exist !')
      }
}
}
catch(error){
  res.send ('something wrong !')
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
                    console.log("this course not exist");  
                    res.send("this course not exist")
                  }
                }
      catch(error){
          res.status(500).json(error);
      }
  })
//   get course using params
 admin.get('/getcourse/:courseid',authenticate,(req,res)=>{
console.log( req.params.courseid);
try{

    
                if(addcourse.has(req.params.courseid)){
                   console.log("view data in get method using params");
                  console.log(addcourse.get(req.params.courseid));

                }
                else{
                    
                  res.send("this course not exist")
                }
              }
    catch(error){
        res.status(500).json(error);
    }

 })
 //   get course using query
 admin.get('/getcourseq',(req,res)=>{
    console.log("get course using query");
    console.log(req.query.courseid)
    try{

    
        if(addcourse.has(req.query.courseid)){

           console.log("view data in get method using query");
          console.log(addcourse.get(req.query.courseid));
        res.send(addcourse.get(req.query.courseid));

        }
        else{
            
          res.send("this course not exist")
        }
      }
catch(error){
res.status(500).json(error);
}

 })

 //delete course

 admin.delete('/deletecourse',authenticate,(req,res)=>{
  const role =req.userrole;
  // console.log(role);
  const result= req.query.courseid;
  if(role!=="admin"){
    res.send('you dont have  permission to delete course')
  }else{
    if(addcourse.has(result)){
      addcourse.delete(result);
      res.send("course deleted successfully")
      console.log("course deleted successfully");
      // res.send(`coures "${result}" has been  deleted`)
    }else{
      res.send("this course not exist");
    }
  }
 })

 //view add course depending on the role means user or admin
 admin.get('/viewuser',authenticate,(req,res)=>{
  try{
  const user=req.userrole;
  res.json({user});}
  catch{
      res.status(404).json({message:'user not authorized'});
  }
})
//viewcourse on click  of button
admin.get('/viewcourse', async(req,res)=>{
  try{
      console.log(addcourse.size);

      if(addcourse.size!=0){
         
          
      res.send(Array.from(addcourse.entries()))
  }
else{
  res.status(404).json({message:'Not Found'});
}}
  catch{
      res.status(404).json({message:"Internal error"})
  }
})
 
//logout
 admin.post('/logout',(req,res)=>{
  res.clearCookie('authtoken');
  res.send('logout  successfully');
  console.log("logout  successfully");
 })
 export {admin};