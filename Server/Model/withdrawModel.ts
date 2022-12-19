import mongoose from "mongoose";

export const withDrawSchema = new mongoose.Schema({
    address:{
        type:String
    },
    balance:{
        type: Number
    },
    amount:{ 
        type:Number
    }
},{timestamps:true})

export default mongoose.model("WithDraw_Details", withDrawSchema)