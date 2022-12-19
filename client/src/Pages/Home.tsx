import React, { useState } from 'react'
import Web3 from 'web3';
// import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

  const { ethereum  }:any = window;

const [accounts, setAccounts] = useState("")
const [isConnected, setIsConnected] = useState(false)
const [balances, setBalances] = useState("")



if(!ethereum){
  alert("Connect to metamask")
  console.log("Connecy")
}
else{
  console.log("exist")
}

const web3 = new Web3(Web3.givenProvider)


const eventHandler = async() =>{

  const account:string = await ethereum.request({method:"eth_requestAccounts"})
  const slicedAccount = (account: string | any) => `${account.slice(0,5)}...${account.slice(account.length-4)}`
  setAccounts(slicedAccount(account[0]));

  const balanceNum = await web3.eth.getBalance(account[0])
  const balance = (web3.utils.fromWei(balanceNum))
  // const parsedAmount = (balance: string | any) => `${balance.slice(0,1)}.${balance.slice(1,5)}`
 
  setBalances(balance);
  console.log(balance[0])


  setIsConnected(true)

  // axios.post("/account/details",{ address: slicedAccount(account[0]), balance: balance})
  // .then((response)=>{
  //   if(response){
  //     console.log(response.data.message)
  //     console.log(response.data.details)
  //   }
  // })
  // .catch(err=>console.log(err))

}

  return (
    <div>
      {
        !isConnected && (
      <div>
        <h1>Please connect to metamask!</h1>
        <button onClick={eventHandler}>Connect</button>
      </div>
        )
      }
      <div>
        {
          isConnected && (
            <div>
              <h1>You are connected to Metamask!!!</h1>
              <p>Your account is: {accounts}</p>
              <p>Your balance is: {balances} GoerliETH</p>
              <div>
                <Link to='/deposit'><button>Deposit</button></Link>
                <button>WithDraw</button>
                
              </div>

            </div>
          )
        }

      </div>
    </div>
  )
}

export default Home
