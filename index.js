const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./src/features/user/user.router")
const ticketRouter = require("./src/features/tickets/ticket.router")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors())

app.use("/user",userRouter)
app.use("/ticket", ticketRouter)
mongoose.connect("mongodb+srv://harsh:harsh@cluster0.mflch7u.mongodb.net/mock-15?retryWrites=true&w=majority").then(()=>{
    app.listen(8080, () => {
        console.log("Server started")
    })
})
