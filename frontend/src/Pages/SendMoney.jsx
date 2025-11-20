import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import  axios from "axios"

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Send Money</h2>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">
           {name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{name}</span>
        </div>

        <label className="block text-left font-medium mb-1">Amount (in Rs)</label>
        <input
        onChange={(e)=>setAmount(e.target.value)}
        value={amount}
          type="number"
          className="w-full border rounded-xl p-2 mb-6"
          placeholder="Enter amount"
        />

        <button className="w-full bg-green-600 text-white p-2 rounded-xl shadow-md"
        onClick={
          axios.post("http://localhost:3000/api/router/account/transfer",{
            to: id,
            amount: amount
          },{
            withCredentials:true
          })
        }>
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
