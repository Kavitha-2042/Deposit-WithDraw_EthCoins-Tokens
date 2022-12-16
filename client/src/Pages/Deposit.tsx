import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

const Deposit = () => {

  const [input, setInput] = useState()
  const [amount, setAmount] = useState(0)
  const [currentAddress, setCurrentAddress] = useState("")

  useEffect(()=>{
   async function load(){
    const web3 = new Web3(Web3.givenProvider);

    const currentAccount = await  web3.eth.requestAccounts();
    console.log(currentAddress);
    setCurrentAddress(currentAccount[0])
   }
   load()
  },[])



  const inputHandler = (e:any) =>{
    setAmount(e.target.value)
    // setTimeout(() => {
      
    //   console.log("am: ", amount)
    // }, 20);
  }

  const eventHandler = (e:any) =>{
    e.preventDefault();
    
    console.log("AMount: ", amount)
    console.log("Add: ", currentAddress)

    axios.post("/account/deposit",{address: currentAddress, amount: amount})
    .then((response)=>{
      console.log("Response sent")
      alert(response.data.message)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <div>
        <h1>Enter amount to deposit!</h1>
      </div>

      <div>
        <input 
        // className='my-2 w-full  outline-none border-x-cyan-600 text-white '
        placeholder='Amount(ETH)'
        name="amount"
        step="0.0001"
        type="number"
        value={amount}
        onChange={inputHandler}
        style={{
          padding:"10px",
          border:"1px solid grey",
          borderRadius:"10px",
        }}
        />
        <button
        onClick={eventHandler}
        style={{
          borderRadius:"10px",
          padding:"10px",
          margin:"10px",
        }}
        >Send</button>
      </div>
    </div>
  )
}

export default Deposit