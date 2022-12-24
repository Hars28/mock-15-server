const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("./user.model")
const app = express.Router();
const axios  = require("axios")
const checkAuth = require("../../middleware/authMiddleware")

app.post("/signup", async(req,res) => {
    let { email, name ,password } = req.body;
    try{
        let isPresent=await User.findOne({email});
        if(isPresent){
            res.status(401).send("User already exists")
        }
        else{
        let newUser= await User.create({email, name, password})
        res.status(200).send({message:"User created succesfully",newUser})
        }
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

app.post("/signin",async(req,res)=>{
    let { email,password }=req.body;

    try{
        let user=await User.findOne({email,password});
        if(!user){
            res.status(404).send("Authentication failed")
        }
        else{
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email},
            "SECRET123",
            {
                expiresIn: "1 hour"
            }
        )
        res.status(200).send({message: "Login Succesfull", token})

        }
    }
    catch(e){
        res.status(500).send(e.message)
    }
})



module.exports = app;