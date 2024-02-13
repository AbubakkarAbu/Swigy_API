const mongo = require("mongoose")
const RestaruntDetailes = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    costForTwo:{
        type:String,
        required:true,
    },
    areaName:{
        type:String,
        required:true
    },
    avgRating:{
        type:Number
    },
    cuisines:{
        type:Array
    }
},{versionKey:false})
const Restaurant = mongo.model("Restarunt_Detaile",RestaruntDetailes)

const UserSchema=new mongo.Schema({
    UserName:{
        type:String,
        required:true//necessary to enter else shows the error
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Contact:{
        type:Number,
        required:true
    }
})
const User = mongo.model("UserDetails",UserSchema)
module.exports ={Restaurant, User}
