import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Web3 from "web3";
import accountModel from "../Model/accountModel";
import mongoose from "mongoose";
// import Double from "@mongoosejs/double"
const web3 = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export const accountDetails = (req:express.Request, res: express.Response) =>{
    // const { address, balance } = req.body;
    // accountModel.findOne({address})
    // .then((findResponse)=>{
    //     if(findResponse){
    //         return res.json({
    //             message: "Account Details already exist"
    //         })
    //     }
    //     accountModel.create({ address, balance})
    //     .then((createResponse)=>{
    //         return res.json({
    //             message:"Account created",
    //             details: createResponse
    //         })
    //     })
    //     .catch(err=>console.log(err))
    // })
    // .catch(err=>console.log(err))

}


export const deposit = (req: express.Request, res: express.Response) =>{
    const { address, amount} = req.body;

    console.log("amount: ", amount)
    // let parsedAmount = web3.utils.toNumber(amount)

    accountModel.findOne({ address })
    .then((findResponse)=>{
        if( findResponse ){
            console.log(Number(findResponse.balance) )
            // let balance = findResponse[0].balance + amount;
            // accountModel.updateOne({address: address},{$set:{ balance: findResponse[0]+amount}})

            accountModel.updateOne({address: address},{$set: { balance: Number(findResponse.balance) + Number(amount)}})
            // accountModel.updateOne({address:address}, {$set: { balance: web3.utils.toNumber(findResponse.amount) + parsedAmount}})
            .then((updateResponse)=>{
                return res.json({
                    message:"Successfully deposited",
                    res: updateResponse,
                    bal: findResponse
                })
            })
            .catch(err=>console.log(err))

        }
      else  {
        accountModel.create( { address, amount, balance:amount })
        .then((createResponse)=>{

            return res.json({
                message:"Successfully created and deposited",
                response: createResponse,
                again: createResponse
            })

            // let balance;
            // accountModel.updateOne({address: address}, {balance: amount })
            // .then((insertResponse)=>{
               
            // })
            // .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))}
    })
    .catch(err=>console.log(err))
}

