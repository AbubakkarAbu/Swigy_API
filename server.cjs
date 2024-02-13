const express = require ('express')
const body = require("body-parser")
const mongo = require("mongoose")

const {Restaurant, User} = require('./schema.cjs')
const app = express()
app.use(body.json())
async function connectDb(){
    try{
        await mongo.connect('mongodb+srv://ABUBAKKAR:Abhu123@cluster0.2y5nd8j.mongodb.net/Restarunt_Details?retryWrites=true&w=majority')

        const port =2222
        app.listen(port,()=>{
            console.log(`I am Listening at ${port}`)
        })
    }
    catch(error)
    {
        console.log(error)
        console.log("there is error in catch block")
    }
}
connectDb()
app.post('/add-restaurant',async(req,res)=>{
    try{
        await Restaurant.create({
            "name":req.body.name,
            "costForTwo":req.body.costForTwo,
            "avgRating":req.body.avgRating,
            "cuisines":req.body.cuisines,
            "areaName":req.body.areaName
        })
        res.status(201).json({
            "status":"Complted",
            "msg":"done"
        })
    }
    catch(error){
        res.status(500).json({
            "Status":"Not Created",
            "msg" : error
        })
    }
})
app.get('/show-restarunt',async(req,res)=>{
    try{
    const data = await Restaurant.find()
    console.log(data)
    if(data)
    {
        res.json(data)
    }
    else{
        res.json("error found")
    }
    }
    catch(error)
    {
        res.json({
            "message":"internal server error"
        })
    }
})

app.post('/find-restarunt',async(req,res)=>{
    try{
    const data = await Restaurant.findOne({
        "name":req.body.resname,
        "areaName":req.body.areaName
    })
    console.log(data)
    if(data)
    {
        res.json({
            "status":"get Successfull",
            "mesage":"User Available"
        })
    }
    else{
        res.json({
            "status":"Not Successfull",
            "mesage":"User unAvailable"
        })
    }
    }
    catch(error)
    {
        res.json({
            "message":error
        })
    }
})
app.post('/remove-restaurant',async(req,res)=>{
    try{
        await Restaurant.deleteOne({
            "name":req.body.resname,
            "areaName":req.body.areaName
        })
        res.status(201).json({
            "status":"Deletion Complted",
            "msg":"done"
        })
    }
    catch(error){
        res.status(500).json({
            "Status":"Not Deleted",
            "msg" : error
        })
    }
})
app.post("/Create-User",async(req,res)=>{ 
try{
    await User.create({
        "UserName": req.body.username,
        "Password":req.body.password,   
        "Email":req.body.email,
        "Contact":req.body.contact
    })
    res.status(201).json({
        "status":"User Created Succesfully"
    })
}
catch(error){
    res.status(500).json({
        "Status":"User Not Created",
        "Error" : error
    })
}
})
