'use client'
import { authClient } from "@/lib/auth-client";
import { useState } from "react";


const Page = () => {
 const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
     const { 
        data: session, 
    } = authClient.useSession()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      
      authClient.signUp.email({
        email,
        password,
        name
      },
      {
        onError:()=>{
          alert("error")
        },
        onSuccess:()=>{
          alert("success")
        }
      }
    )
     
  };

  if(session){
    console.log(session.user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {session && <div> Welcome {session.user.name}</div> }

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Page