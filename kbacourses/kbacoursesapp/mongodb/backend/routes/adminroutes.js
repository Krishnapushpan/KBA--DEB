import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config()
const admin=Router();
const secretkey = process.env.secretkey;
//define User Schema
const userSchema = new mongoose.Schema(
                    {firstname:String,
                    lastname:String,
                    username:{type:String,unique:true},
                    password:String,
                    role:String})
mongoose.connect('mongodb://localhost:27017/KBA')

//create Model
const  User = mongoose.model('Userdetails',userSchema);

//define course  schema
const CoursesSchema= new mongoose.Schema({
  courseid:{type:String,unique:true},
  coursename:String,
  coursetype:String,
  description:String,
  price:String       
})
//create model
const  Courses = mongoose.model('Coursedetails',CoursesSchema);
admin.post('/signup',async(req,res)=>{
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
admin.post('/login',async(req,res)=>{
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
admin.post('/addcourse',authenticate,async(req,res)=>{
  // try{
    const data = req.body;
   const {courseid,coursename,coursetype,description ,price}= data;
    const role =req.userrole;
    // const admin= "admin";
            if(role!== "admin"){

            res.send("you have no permission")
            }
            else{
              const existingCourse= await Courses.findOne({courseid:courseid})
              if(existingCourse){
                  res.status(400).json({message:"Course already saved"}) 
              }
                else{

                  const newCourse= new Courses({
                    courseid:courseid,
                    coursename:coursename,
                    coursetype:coursetype,
                    description:description,
                    price:price
                  })
                  await newCourse.save(); 
                  console.log("course added successfully")
                    res.status(201).json({message:"course added"})
                    
                }
            }
    // }
    // catch(error){
    //     res.status(500).json(error);
    // }
})

// update course

admin.post('/update',authenticate,async(req,res)=>{
      const data = req.body;
     const {courseid,newcoursename,newcoursetype,newdescription,newprice}= data;
      const role =req.userrole;
              if(role!== "admin"){
              res.send("you have no permission")
              }
              else{ 
                const existingCourse= await Courses.findOne({courseid:courseid})
              if(existingCourse){
                await Courses.updateOne(
                  { courseid },
                  { 
                      coursename: newcoursename,
                      coursetype: newcoursetype,
                      description: newdescription,
                      price: newprice
                  })
                  // await newCourse.save(); 
                  console.log('updated course sucessfully');
                  res.send('updated course sucessfully');
              }
                  else{  
                    res.send("this course not exist")
                  }
              }
  })
//update course using patch
admin.patch('/patchupdate',authenticate, async(req,res)=>{
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
            else{ const existingCourse= await Courses.findOne({courseid:data.courseid})
            if(existingCourse){
              await Courses.updateOne(
                { courseid },
                { 
                    coursename: newcoursename,
                    coursetype: newcoursetype,
                    description: newdescription,
                    price: newprice
                })
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
admin.put('/putupdate',authenticate,async(req,res)=>{
  // try 
  // {
  const role=req.userrole;
  // console.log(role);
  const coursedetails=req.body;
  const{courseid,newcoursename,newcoursetype,newdescription,newprice}=coursedetails;
  if(role!=='admin'){
      res.send('you dont have permission !');
    }
  else{
    const existingCourse= await Courses.findOne({courseid:courseid})
      if(existingCourse)
          {
            await Courses.updateOne({courseid},{
                    coursename: newcoursename,
                    coursetype: newcoursetype,
                    description: newdescription,
                    price: newprice

            })
          // addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription,newprice});
          // console.log(addcourse.get(courseid));
          console.log('course updated sucessfully');
          res.send(' course updated sucessfully');
          
          }
      else{
          res.send('this course does not exist !')
      }
}
// }
// catch(error){
//   res.send ('something wrong !')
// }
})
 //view
 admin.post('/view',async(req,res)=>{
    try{
      const data = req.body;
     const {courseid}= data;
      const existingCourse=await Courses.find({courseid:courseid})
                  if(existingCourse){
                     console.log("view data");
                    // addcourse.set(courseid,{courseid,newcoursename,newcoursetype,newdescription});
                    console.log(existingCourse);
                   
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
//  admin.get('/getcourseq',async(req,res)=>{
//   const data = req.query.courseid;
//     console.log("get course using query");
//     console.log(req.query.courseid)
   
//       // try{
//         const existingCourse= await Courses.find({courseid :data})
//           if(existingCourse){
  
//              console.log("view data in get method using query");
//             console.log(addcourse.get(req.query.courseid));
//           res.send(addcourse.get(req.query.courseid));
  
//           }
//           else{
              
//             res.send("this course not exist")
//           }
//   //       }
//   // catch(error){
//   // res.status(500).json(error);
//   // }
  
  //  })

  admin.get('/getcourseq', async (req, res) => {
    const courseId = req.query.courseid;
    console.log("get course using query");
    console.log(courseId);
   
    try {
        const existingCourse = await Courses.findOne({ courseid: courseId });
        if (existingCourse) {
            console.log("Course found:", existingCourse);
            res.status(200).json(existingCourse); // Send the course data directly
        } else {
            console.warn("Course does not exist.");
            res.status(404).send("This course does not exist");
        }
    } catch (error) {
        console.error("Error retrieving course data:", error);
        res.status(500).json({ error: "Server error" });
    }
});


 //delete course

 admin.delete('/deletecourse',authenticate,async(req,res)=>{
  const role =req.userrole;
  // console.log(role);
  const courseid= req.query.courseid;
  if(role!=="admin"){
    res.send('you dont have  permission to delete course')
  }else{
    await Courses.find({courseid})
    if(courseid){
      await Courses.deleteOne({courseid})
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

try {
  // Fetch all courses from MongoDB
  const allCourses = await Courses.find({});
  
  if (allCourses.length != 0) {
      console.log("All courses data found:");
      console.log(allCourses);
      res.status(200).json(allCourses);  // Send all course data as JSON
  } else {
      console.log("No courses found.");
      res.status(404).json({ message: 'No courses found' });
  }
} catch (error) {
  console.error("Error fetching all courses:", error);
  res.status(500).json({ message: "Internal server error" });
}


})
 
export {admin};//logout
 admin.post('/logout',(req,res)=>{
  res.clearCookie('authtoken');
  res.send('logout  successfully');
  console.log("logout  successfully");
 })