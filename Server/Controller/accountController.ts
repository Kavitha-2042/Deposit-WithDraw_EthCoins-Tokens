import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Web3 from "web3";
import accountModel from "../Model/accountModel";
import mongoose from "mongoose";
// import Double from "@mongoosejs/double"
const web3 = new Web3(
  "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);

export const accountDetails = (req: express.Request, res: express.Response) => {
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
};

export const deposit = (req: express.Request, res: express.Response) => {
  const { address, amount } = req.body;

  console.log("amount: ", amount);
  // let parsedAmount = web3.utils.toNumber(amount)

  accountModel
    .findOne({ address })
    .then((findResponse) => {
      if (findResponse) {
        console.log(Number(findResponse.balance));
        // let balance = findResponse[0].balance + amount;
        // accountModel.updateOne({address: address},{$set:{ balance: findResponse[0]+amount}})

        accountModel
          .updateOne(
            { address: address },
            { $set: { balance: Number(findResponse.balance) + Number(amount) } }
          )
          // accountModel.updateOne({address:address}, {$set: { balance: web3.utils.toNumber(findResponse.amount) + parsedAmount}})
          .then((updateResponse) => {
            return res.json({
              message: "Successfully deposited",
              res: updateResponse,
              bal: findResponse,
            });
          })
          .catch((err) => console.log(err));
      } else {
        accountModel
          .create({ address, amount, balance: amount })
          .then((createResponse) => {
            return res.json({
              message: "Successfully created and deposited",
              response: createResponse,
              again: createResponse,
            });

            // let balance;
            // accountModel.updateOne({address: address}, {balance: amount })
            // .then((insertResponse)=>{

            // })
            // .catch(err=>console.log(err))
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

export const depositedBalance = (
  req: express.Request,
  res: express.Response
) => {
  const { address } = req.body;

  accountModel
    .find({ address })
    .then((findResponse) => {
      // console.log("Bal: ", findResponse[0].balance)
      return res.json({
        message: "Deposited Balance",
        response: findResponse[0].balance,
      });
    })
    .catch((err) => console.log(err));
};

// export const withDraw = (req: express.Request, res: express.Response) => {
//   const { address, amount } = req.body;

// //   const account1 = process.env.SERVER_ACCOUNT;
//   const account2 = address; 

//   accountModel
//     .find({ address })
//     .then((findResponse) => {
//       if (findResponse.length < 0) {
//         return res.json({
//           message: "User does not exist!",
//         });
//       } else {
//         if (Number(findResponse[0].balance) < Number(amount)) {
//           return res.json({
//             message: "Withdrawing amount execeds your balance!",
//           });
//         } else {
//           const transaction = web3.eth.sendTransaction({
//             to: account2,
//             value: web3.utils.toWei(amount.toString(), "ether"),
            
//           });
//           console.log(transaction);

//           accountModel
//             .updateOne(
//               { address: address },
//               {
//                 $set: {
//                   balance: Number(findResponse[0].balance) - Number(amount),
//                 },
//               }
//             )
//             .then((updateResponse) => {
//               return res.json({
//                 message: "Successfully amount withdrawed",
//                 response: updateResponse,
//               });
//             })
//             .catch((err) => console.log(err));
//         }
//       }
//     })
//     .catch((err) => console.log(err));
// };
