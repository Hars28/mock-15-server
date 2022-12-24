const mongoose = require("mongoose")
const ticketSchema = new mongoose.Schema({
    title: { type: String, require: true},
    category: { type: String, required: true},
    message: { type: String, required: true},
    date: { type: String, required: true},
    
})

const Ticket = mongoose.model("ticket",ticketSchema)
module.exports = Ticket;