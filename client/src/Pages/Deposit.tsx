import axios from "axios";
import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  const [clicked, setClicked] = useState(false);
  const [depositBalance, setDepositBalance] = useState(0);

  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    async function load() {
      const currentAccount = await web3.eth.requestAccounts();
      console.log(currentAddress);
      setCurrentAddress(currentAccount[0]);
    }
    load();
  }, []);

  const inputHandler = (e: any) => {
    setAmount(e.target.value);
    // setTimeout(() => {

    //   console.log("am: ", amount)
    // }, 20);
  };

  // const check = web3.eth.getBalance(currentAddress, (err, result)=>console.log(result))

  const eventHandler = (e: any) => {
    e.preventDefault();

    console.log("AMount: ", amount);
    console.log("Add: ", currentAddress);

    // const check = web3.eth.sendTransaction({from: account1,to: account2,value: web3.utils.toWei('1','ether')})
    // console.log(check)

    const account1 = currentAddress;
    const account2 = "0xC3492744f9Bd9aAfa44439ba7eBE51A42253fB3F";
    // const amount1 = web3.utils.toBN(amount)

    const transaction = web3.eth.sendTransaction({
      from: account1,
      to: account2,
      value: web3.utils.toWei(amount.toString(), "ether"),
    });
    console.log(transaction);

    // axios.post("/account/deposit",{address: currentAddress, amount: web3.utils.toNumber(amount)})
    axios
      .post("/account/deposit", { address: currentAddress, amount: amount })
      .then((response) => {
        console.log("Response sent : ", amount);
        alert(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = (e: any) => {
    e.preventDefault();
    setClicked(true);
    axios
      .post("/account/depositedBalance", { address: currentAddress })
      .then((balanceResponse) => {
        setDepositBalance(balanceResponse.data.response);
      })
      .catch((err) => console.log(err));
  };

  const closeHandler = (e: any) => {
    e.preventDefault();
    setClicked(false);
  };

  return (
    <div>
      <div>
        <h1>Enter amount to deposit!</h1>
      </div>

      <div>
        <input
          // className='my-2 w-full  outline-none border-x-cyan-600 text-white '
          placeholder="Amount(ETH)"
          name="amount"
          step="0.0001"
          type="number"
          value={amount}
          onChange={inputHandler}
          style={{
            padding: "10px",
            border: "1px solid grey",
            borderRadius: "10px",
          }}
        />
        <button
          onClick={eventHandler}
          style={{
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
          }}
        >
          Send
        </button>
      </div>
      <div>
        <h1>To check the deposited amount, </h1>
        {!clicked && <button onClick={clickHandler}>Click here</button>}
        {clicked && (
          <div>
            <h3>{web3.utils.toNumber(depositBalance)} GoerliETH</h3>
            <button onClick={closeHandler}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
