import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Web3 from "web3";
import accountModel from "../Model/accountModel";

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

    accountModel.findOne({ address })
    .then((findResponse)=>{
        if( findResponse ){
            console.log(findResponse)
            // let balance = findResponse[0].balance + amount;
            // accountModel.updateOne({address: address},{$set:{ balance: findResponse[0]+amount}})
            accountModel.updateOne({address:address}, { balance: findResponse.amount+amount})
            .then((updateResponse)=>{
                return res.json({
                    message:"updated",
                    res: updateResponse,
                    bal: findResponse
                })
            })
            .catch(err=>console.log(err))
            
        }
      else  {
        accountModel.create( { address, amount })
        .then((createResponse)=>{
            // let balance;
            accountModel.updateOne({address: address}, {balance: amount })
            .then((insertResponse)=>{
                return res.json({
                    message:"Insered",
                    response: createResponse,
                    bal: insertResponse,
                    again: createResponse
                })
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))}
    })
    .catch(err=>console.log(err))
}

