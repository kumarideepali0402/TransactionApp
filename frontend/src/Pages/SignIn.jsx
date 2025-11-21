import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     async function handleSignIn() {
        const user = {
            email:email,
            
            password:password
        }
         await axios.post(`${backendUrl}/api/router/user/signin`,user,{
            withCredentials : true
        })
        navigate("/dashboard");

    }
  

return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
<h2 className="text-2xl font-bold mb-6 text-center">
SignIn
</h2>
  <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded-xl p-2"
          placeholder="Enter your email"
          value = {email} onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border rounded-xl p-2"
          placeholder="Enter your password"
          value = {password} onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <button className="w-full bg-green-600 text-white p-2 rounded-xl mt-4 shadow-md"
      type="button"
      onClick={handleSignIn}>
        SignIn
      </button>
      <div>Dont have an account <Link to={"/signup"}>Click Here</Link></div>
    </form>
    </div>
    </div>
  )
}




