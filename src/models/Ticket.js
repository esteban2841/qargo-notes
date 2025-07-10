import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    
    products: {
        type: Array,
        required: true
    },
    paymentInfo: {
        type: Object,
        required: true
    },
    userPayer: {
        type: Object,
        required: true
    },
    shippingDetails: {
        type: Object,
        required: true
    },
    
}, {timestamps: true})

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema)

export default Ticket;