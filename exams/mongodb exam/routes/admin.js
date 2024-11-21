import {json,Router} from 'express'
import mongoose from 'mongoose'

const admin =Router();
mongoose.connect("mongodb://localhost:27017/VEHICLES")
const vehicleschema = new mongoose.Schema({
    serviceno:String,
    vehicleno:String,
    vehicletype:String,
    servicedate:String,
    servicetime:String,
    ownername:String,
    servicetype:String
})
const Vehicle = mongoose.model("servicedetail",vehicleschema)
admin.post('/addvehicle', async(req,res)=>{
    const data=req.body;
    const {serviceno,vehicleno,vehicletype,servicedate,servicetime,ownername,servicetype}= data;
        const newvehicle=new Vehicle({
            serviceno:serviceno,
            vehicleno:vehicleno,
            vehicletype:vehicletype,
            servicetype:servicetype,
            servicedate:servicedate,
            servicetime:servicetime,
            ownername:ownername
        })

        await newvehicle.save()
        res.send({message:"vehicle added successfully"})
        console.log("vehicle added successfully")
})
admin.put('/updatevehicle',async(req,res)=>{
    const data=req.body
    const {serviceno,newvehicleno,newvehicletype,newservicedate,newservicetime,ownername,newservicetype}= data;
    const checkvehicle = Vehicle.findOne({serviceno:serviceno})
    if(checkvehicle){
       const updatedvehicle= Vehicle.updateOne({serviceno},{
            vehicleno:newvehicleno,
            vehicletype:newvehicletype,
            servicetype:newservicetype,
            servicedate:newservicedate,
            servicetime:newservicetime,
            ownername:ownername
        })
        await updatedvehicle.updateOne()
        res.send({message:"vehicle updated successfully"})
        console.log("vehicle updated successfully")
    }
    else{
        res.send({message:"no service found"})
        console.log("no service found")
    }
})
admin.get('/viewvehicles',async(req,res)=>{
        const allvehicles = await Vehicle.find({})
        if(allvehicles.length!=0 ){
            console.log("list of vehicle services added")
            res.send(allvehicles)
            console.log(allvehicles)
   
        }
        else{
            console.log("no vehicle services added")
            res.send("  no vehicle services added")
        }
})
admin.get('/typevehicles',async(req,res)=>{
    const data=req.query.vehicletype;
    const sametype = await Vehicle.find({vehicletype:data})
    if(sametype.length!=0 ){
        console.log("list of vehicle type : ",data)
        res.send(sametype)
        console.log(sametype)

    }
    else{
        console.log("no vehicle services added")
        res.send("  no vehicle services added")
    }
})
admin.delete('/removevehicle',async(req,res)=>{
    const data=req.query.serviceno;
    const serviceno=data
    const checkvehicle = await Vehicle.findOne({serviceno:serviceno})
    // console.log(checkvehicle)
    if(checkvehicle){
        // console.log(checkvehicle)
       await Vehicle.deleteOne({serviceno})
       res.send("service removed successfully")
        console.log("service removed successfully")
    }
    else{
        console.log("service not found")
    }

})
export {admin}