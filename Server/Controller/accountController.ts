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

export const ServerAccount = (req:express.Request, res: express.Response) =>{
  

}


export const deposit = (req:express.Request, res: express.Response) =>{
    const { address, amount } = req.body;

   try {
    
    const web3 = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    
    const account1 = address;
    const account2 = process.env.SERVER_ACCOUNT as string;


    // const check = web3.eth.getBalance(account1, (err, result)=> console.log(result))
    // .then((response)=>{
    //     return res.json({
    //         message:"sent",
    //         bal: response
    //     })
    // })
    // .catch(err=>console.log(err))
       // const parsedTotal = web3.utils.toBN(total)
            // const parsedAmount = web3.utils.toBN(amount) 



            // const parsedTotal = web3.utils.fromWei(total, "Gwei")
            // const parsedAmount = web3.utils.fromWei(amount, "Gwei")


            // accountModel.updateMany({address: account1},{balance: parsedTotal + parsedAmount})

            // var value = (0.001*(10**total)).toString();
            // var parsedTotal = web3.utils.toBN(value)

            // var value = (0.001*(10**total)).toString();
            // var parsedTotal = web3.utils.toBN(total)

            // var value1 = (0.001*(10*amount)).toString();
            // var parsedAmount = web3.utils.toBN(amount)

    

    accountModel.find({address})
    .then((findResponse)=>{
        if(findResponse.length > 0){
            const total = findResponse[0].balance

            const parsedTotal = web3.utils.toNumber(total)
            const parsedAmount = web3.utils.toNumber(amount)


         

            accountModel.updateMany({address: account1},{balance: parsedTotal + parsedAmount})
            // accountModel.updateMany({address: account1},{balance: {$add:{parsedTotal, parsedAmount}}})
            // accountModel.updateMany({address: account1},{balance: {$add:{total, amount}}})
            .then((updateResponse)=>{
                return res.json({
                    message:"Successful in update",
                    fullResponse: updateResponse
                })
            }) 
            .catch(err=>console.log(err)) 
        }
        accountModel.create({ address, amount})
        .then((createResponse)=>{
            const parsedAmount = web3.utils.toNumber(amount)
            const total = 0;
            accountModel.updateMany({address: account1},{balance: total + parsedAmount})
            // accountModel.updateMany({address: account1},{balance: {$add:{parsedTotal, parsedAmount}}})
            // accountModel.updateMany({address: account1},{balance: {$add:{total, amount}}})
            .then((createUpdateResponse)=>{
                return res.json({
                    message:"Successful in create",
                    fullResponse: createUpdateResponse,
                    create: createResponse
                })
            }) 
            .catch(err=>console.log(err)) 
        })
        .catch(err=>console.log(err)) 
    })
    .catch(err=>console.log(err))
    

 

   } catch (error) {
    
   }
        
    
}