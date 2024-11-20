import { response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth.js";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const adminroute=Router();
// const user= new Map();
// const certidetails =new Map();
// const secretkey = "hello";1
const secretkey = process.env.Secretkey;
const userSchema = new mongoose.Schema(
    {firstname:String,
    lastname:String,
    username:{type:String,unique:true},
    password:String,
    role:String})
mongoose.connect('mongodb://localhost:27017/CERTIAPP')

//create Model
const  User = mongoose.model('Userdetails',userSchema);

//define certificate schema
const certiSchema= new mongoose.Schema({
    coursename:String,
    candidateid:{type:String,unique:true},
    candidatename:String,
    selectgrade:String,
    issuedate:String      
  })
  //create model
  const  Certificates = mongoose.model('certificates',certiSchema);
// signup part
adminroute.post('/signup',async(req,res)=>{
    try{

    const data =req.body;
  
    const { firstname,lastname,username ,password, role}=data;
    console.log("signup details");
    
    const newp = await bcrypt.hash(password,10)
    const existingUser= await User.findOne({username:username})
    if(existingUser){
        res.status(400).json({message:"username already saved"}) 
    }
    else{

      const newUser= new User({
        firstname:firstname,
        lastname:lastname,
        username:username,
        password:newp,
        role:role
      })
       
       await newUser.save(); 
       console.log("signup successfully")
        res.status(201).json({message:"data saved"})
    }}
    catch(error){
        res.status(500).json(error);
    }
})

// login part
adminroute.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    console.log("login details");
    const result= await User.findOne({username:username})
    // console.log(result);
    if(!result){
        res.status(404).json("user not found")
    }
    else{
      console.log(password)
      console.log(result.password)
        const isvalid =await bcrypt.compare(password,result.password)
        console.log(isvalid);
        if(isvalid){
        const token = await jwt.sign({username:username,userrole:result.role},secretkey,{expiresIn:'1h'})
        res.cookie('certiapp',token,{httpOnly:true});
        res.status(200).json({token});
        console.log("login successfully")
        }  
    }
    })
//issue certificate

 adminroute.post('/issuecerti',authenticate,async(req,res)=>{
    // try{
        const data =req.body;
        const {coursename,candidateid,candidatename,selectgrade,issuedate}=data;
        const role=req.role;
        console.log("trying",req.role)
        const checkadmin = await  User.findOne({role:role})

        if(checkadmin == "user")
        {
            res.status(200).json("you are not admin to issue certificate")
            console.log("you are not admin to issue certificate")
        }else {
  
          const checkcertid = await Certificates.findOne({candidateid:data.candidateid})
            if(checkcertid){
                res.send("certificate already exist")
            }
            else{
                const newCertid= new Certificates({
                    coursename:coursename,
                    candidateid:candidateid,
                    candidatename:candidatename,
                    selectgrade:selectgrade,
                    issuedate:issuedate
                  })
                   
                   await newCertid.save(); 
                   console.log("certificate issued successfully")
                    res.status(201).json({message:"certificate issued successfully"})
               
            }
        }
})

//view certificate 
adminroute.get('/viewcertificate', async (req, res) => {
  const { candidateid } = req.query;
  try {
      const find = await Certificates.findOne({ candidateid: candidateid });
      if (find) {
          console.log("Certificate found:", find);
          res.status(200).json(find);
      } else {
          res.status(404).json("Candidate ID not found.");
          console.log("Candidate ID not found.");
      }
  } catch (error) {
      res.status(500).json("An error occurred while retrieving the certificate.");
      console.error("Error fetching certificate:", error);
  }
});

// onloadfunction 
adminroute.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
  })
//logout
adminroute.post('/logout',(req,res)=>{
    res.clearCookie('certiapp');
    res.send('logout  successfully');
    console.log("logout  successfully");
   })
export{adminroute};