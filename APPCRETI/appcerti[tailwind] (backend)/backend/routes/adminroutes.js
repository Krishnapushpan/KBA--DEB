import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth.js";
import dotenv from "dotenv";


dotenv.config();


const adminroute=Router();
const user= new Map();
const certidetails =new Map();
// const secretkey = "hello";1
const secretkey = process.env.Secretkey;


// signup part
adminroute.post("/signup",async(req,res)=>{
    try{
        const data =req.body;
        const {firstname,lastname,username,password,role}=data;
        const newp =await bcrypt.hash(password,10)

        if(user.has(username)){
            res.send('user already exist');
        }else{
            user.set(username,{firstname,lastname,username,password:newp,role})
            console.log(user.get(username));
            ;
            res.send("data saved")
            console.log("signup successfully");
            
        }
    }
    catch{
        res.send("error");
    }
});

// login part
adminroute.post("/login",async(req,res)=>{
    // try{
        const  data =req.body;
        const {username,password}=data;
        const result = user.get(username);
        if(!result){
            res.send("user not found")
        }else{
            const info = await bcrypt.compare(password,result.password)
            if(info){
                const token = jwt.sign({username:username, role:result.role},secretkey,{expiresIn:"3h"})
                res.cookie('certiapp',token,{httpOnly:true});
                res.send("login success")
                console.log("Secret Key:", process.env.Secretkey);
                console.log("login successfully");
            }
        }
    // }
    // catch(error){
    //     res.send("error")
    // }
})
//view certificate

adminroute.post('/issuecerti',authenticate,(req,res)=>{
    try{
        const data =req.body;
        const {coursename,candidateid,candidatename,selectgrade,issuedate}=data;
        const role=req.role;
        if(role!=="admin")
        {
            res.send("you are not admin to issue certificate")
            console.log("you are not admin to issue certificate")
        }else{
            if(certidetails.has(candidatename)){
                res.send("certificate already exist")
            }
            else{
                certidetails.set(candidatename,{coursename,candidateid,candidatename,selectgrade,issuedate});
                console.log(certidetails.get(candidatename));
                // console.log("certificate issued")
                res.send("certificate issued")
                // const detailcert =`This is to certify that ${Candidatename} has successfully completed the course ${coursename} with a grade of ${SelectGrade}.Certificate ID: ${certificateid} Issued on: ${IssueDate}`;
                //     console.log(detailcert);
            }
        }
    }
    catch(error){
        res.send("error")
    }
})
adminroute.post('/viewcerti',authenticate,(req,res)=>{
    // try{
        const data =req.body;
        // const {Candidatename}=data;
        const {coursename,candidateid,candidatename,selectgrade,issuedate}=data;
        const role=req.role;
        if(role!=="admin")
        {
            res.send("you are not admin to view certificate")
            console.log("you are not admin to view certificate")
        }else{
            if(certidetails.has(candidateid)){
                // res.send("certificate already exist")
                certidetails.get(candidatename);
                console.log(certidetails.get(candidateid));
                res.send("here the issued certificate ")
                // const { coursename, certificateid, SelectGrade, IssueDate } = certDetails;
                const detailcert =`This is to certify that ${candidatename} has successfully completed the course ${coursename} with a grade of ${selectgrade}.Certificate ID: ${certificateid} Issued on: ${issuedate}`;
                    console.log(detailcert);
            }
            // else{
            //     certidetails.set(Candidatename,{coursename,certificateid,Candidatename,SelectGrade,IssueDate});
            //     // console.log(certidetails.get(Candidatename));
            //     console.log("certificate issued")
                
            // }
        }
    // }
    // catch(error){
    //     res.send("error")
    // }
})
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