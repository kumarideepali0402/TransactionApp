import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("")
  const navigate = useNavigate();
  useEffect(()=>{
     axios.get(`${backendUrl}/api/router/account/filter?filter=`+filter,{
      withCredentials: true
     })
     
    .then((response)=>{
      setUsers(response.data.users)
    })

  }, [filter])
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top Bar */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-xl font-semibold">PayTM App</h1>

        <div className="flex items-center gap-2">
          <span className="text-gray-700">Hello</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="mb-6">
        <p className="text-lg font-medium">Your balance <span className="font-bold">Rs 10,000</span></p>
      </div>

      {/* Users Section */}
      <div className="mb-2 font-semibold">Users</div>

      <input
        onChange={(e)=>setFilter(e.target.value)}
        value={filter}
        type="text"
        placeholder="Search users..."
        className="border w-full p-2 rounded-xl mb-4"
      />

      {/* User Card */}
      <div className="flex flex-col items-center">
        {users.map((user) =>
          <div key={user._id} className="flex justify-between items-center bg-white shadow rounded-xl p-4 border">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
                {user.name.charAt(0)}
              </div>

              <span className="font-medium">{user.name}</span>
            </div>

            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-md"
            onClick={(e)=>{
              navigate("/sendMoney?id=" + user._id+"&name="+user.name);
            }}>
              Send Money
            </button>
          </div>
        )}

      </div>
      
      

    </div>
  );
}
