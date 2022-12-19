import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import withdrawModel from "../Model/withdrawModel"
import Web3 from 'web3';
import { ethers, Wallet } from "ethers"
// import Tx from "ethereumjs-tx"

var Tx = require("ethereumjs-tx").Transaction

const web3 = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

export const withDrawTransactions = (req:express.Request, res:express.Response) =>{
    const { address, amount } = req.body;

    const depositWallet = new ethers.Wallet(
        process.env.DEPOSIT_KEY as string
    )
    
    // console.log(depositWallet.address)


    // const privateKey = Buffer.from(process.env.PRIVATE_KEY as string,"hex") 
    const privateKey = process.env.PRIVATE_KEY as string
    const from_address = process.env.SERVER_ACCOUNT 
    const to_address = address

    
    // const transaction =  web3.eth.sendTransaction({
        //     from: depositWallet.address,
        //     to:to_address,
        //     value: web3.utils.toWei(amount.toString(),'ether')
        // })
        
        // console.log(transaction)
        
        

        // var SignedTransaction = {
        //     from:from_address,
        //     to: to_address,
        //     // value: web3.utils.toBN(amount),
        //     value: web3.utils.toWei(amount.toString(), "ether"),
        //     gas: 10000
        // }
    
        // const SignedTx = 
        // web3.eth.sendTransaction({
        //     from: from_address,
        //     to: to_address,
        //     // value: web3.utils.toBN(amount),
        //     value: web3.utils.toWei(amount.toString(), "ether"),
        // })
        // .then((trans)=>{
        //     return res.json({
        //         message:"Check",
        //         res:trans
        //     })
        // })
        // .catch(err=>console.log(err))



//         const rawTx =
// {
//     nonce: _hex_nonce,
//     from: MainAccountAddress,
//     to: contractAddress,
//     gasPrice: _hex_gasPrice,
//     gasLimit: _hex_gasLimit,
//     gas: _hex_Gas,
//     value: '0x0',
//     data: contract.methods.transfer(toAddress, _hex_value).encodeABI()
// };

// const tx = new Tx(rawTx, { 'chain': 'ropsten' });
// tx.sign(privateKey);

// var serializedTx = '0x' + tx.serialize().toString('hex');
// web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function (err, hash) {
//     if (err) {
//         reject(err);
//     }
//     else {
//         resolve(hash);
//     }
// })

        const rawTx = {
            from: process.env.SERVER_ACCOUNT ,
            to: to_address,
            value: web3.utils.toWei(amount.toString(),'ether')
        }

        const tx = new Tx(rawTx,{"chain":"goerli"})
        tx.sign(privateKey)
       
        const serializeTx = tx.serialize()
        const raw = "0x"+serializeTx.toString("hex")

        web3.eth.sendSignedTransaction(raw,(err, result)=>{
            console.log(result)
        })
}