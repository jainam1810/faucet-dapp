import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [sendAmount, setSendAmount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const sendETH = async () => {
    if (!account) return alert("Connect wallet first");
    if (!sendAmount || !toAddress) return alert("Enter amount and address");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(sendAmount),
    });

    await tx.wait();
    alert(`Sent ${sendAmount} ETH to ${toAddress}`);
  };

  return (
    <div className="App">
      <h1>🔗 Direct ETH Transfer</h1>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={sendAmount}
        onChange={(e) => setSendAmount(e.target.value)}
      />
      <button onClick={sendETH}>Send ETH</button>
    </div>
  );
}

export default App;
