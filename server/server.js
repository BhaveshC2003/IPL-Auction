const express = require('express');
const app = express();
const cors=require('cors');
const mongoose= require('mongoose');
const PORT =9000;
const teamUser=require('./models/models.js')
const Players = require("./models/Players")
const Team = require("./models/Team")
const throwError = require("./Error")
const ErrorHandler = require("./ErrorHandler");
const { json } = require('express');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/Ipl';

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true,family: 4})
.then(()=>{
    console.log('connected to mongoDB successfully');
}).catch(err=>{console.log('No connection')});

app.listen(PORT,()=>{
    console.log(`listening on port http://localhost:${PORT}`);
});

//Logging in user
app.post("/login",(req,res)=>{
    const {name,password} =req.body;
    teamUser.findOne({name:name},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"login successfully",user:user})
            }else{
                res.send({message:"password does not match"})
            }
        }else{
            res.send({message:"user not registered"});
        }
    })
})

//Fetching data of all teams
app.get("/team/all",async(req,res,next)=>{
    try{
        const teams = await Team.find().select("name score")
        res.status(200).json({
            success:true,
            teams
        })
    }catch(error){
        next(new ErrorHandler())
    }

})

//Fetching all players of specific team
app.get("/team/:name",async(req,res,next)=>{
    try{
        const {name} = req.params
        const teamDetails = await Team.findOne({name:name}).populate("players")
        res.status(200).json({
            success:true,
            teamDetails
        })
    }catch(error){
        next(new ErrorHandler())
    }
})

//Updating team score
app.put("/score/:name",async(req,res,next)=>{
    try{
        const {name} = req.params
        await Team.findOneAndUpdate({name:name},{score:req.body.score})
        res.status(200).json({
            success:true,
            message:"Score Updated Successfully"
        })
    }catch(error){
        next(new ErrorHandler())
    }
})

//Middleware for Error
app.use(throwError)