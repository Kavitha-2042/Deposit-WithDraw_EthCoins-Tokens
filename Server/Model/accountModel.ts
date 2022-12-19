import mongoose, { model } from "mongoose";


export const accountSchema = new mongoose.Schema({
    address:{
        type: String,
        // unique:true
    },
    balance:{
        type:  Number
    },
    symbol:{
        type: String,
        default: "ETH"
    },
    amount:{
        type:Number
    }
},{timestamps: true})

export default mongoose.model("Account_Details", accountSchema)