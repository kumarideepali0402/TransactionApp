import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
export default function SignUp() {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
        async function handleSignUp() {
        const user = {
            name: name,
            email:email,
            password:password
        }
       await axios.post("http://localhost:3000/api/router/user/signup",user,{
            withCredentials : true
        })
        navigate("/dashboard")

    }
  

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
<h2 className="text-2xl font-bold mb-6 text-center">
   SignUp
</h2>
   <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full border rounded-xl p-2"
          placeholder="Enter your name"
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded-xl p-2"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border rounded-xl p-2"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <button className="w-full bg-blue-600 text-white p-2 rounded-xl mt-4 shadow-md" onClick={handleSignUp}>
        Signup
      </button>
        <div>Already have account? <Link to={"/signin"}>Click Here</Link></div>
      
    </form>
    </div>
    </div>
        
  )
}




