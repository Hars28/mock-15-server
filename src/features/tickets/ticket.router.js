const express = require("express")
const jwt = require("jsonwebtoken")
const Ticket = require("./ticket.model")
const app = express.Router();
const axios  = require("axios")
const checkAuth = require("../../middleware/authMiddleware")

app.get("/",checkAuth, async(req,res)=>{
    const id = req.userData.userId;
    try{
        let tickets = await Ticket.find({id:id})
        res.send(tickets)
    }
    catch(e){
        res.status(500).send("Unauthorised")
    }
})

app.post("/",checkAuth, async(req,res) => {
    const id = req.userData.userId;
    const {title, category, message} = req.body;
    try{
        let x = new Date()
        let newTicket = await Ticket.create({id:id, title, category, message,date:`${x.getDate()}/${x.getMonth()}/${x.getFullYear()}`})
        res.status(200).send({message:"New Ticket Created Successfully", newTicket})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = app;