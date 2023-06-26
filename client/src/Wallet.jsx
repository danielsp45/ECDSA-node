import server from "./server";
import { useState } from "react";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const publicKey = secp256k1.getPublicKey(privateKey);

    const slicedpublickey = publicKey.slice(1);
    const address = toHex(keccak256(slicedpublickey).slice(-20));
    setAddress(address);
    console.log(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="balance">Address: 0x{address.slice(0, 10)}...</div>
    </div>
  );
}

export default Wallet;
