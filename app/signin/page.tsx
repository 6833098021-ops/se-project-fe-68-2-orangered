'use client'
import { Button, TextField } from "@mui/material"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SinginPage(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    })
  }
  return(
    <div className="flex justify-center items-center flex-1">
      <form onSubmit={handleSubmit} className="items-center font-mono border-2 flex-col flex gap-5 p-10 bg-sky-50 rounded-2xl shadow-2xl shadow-zinc-500">
        <p className="text-black text-xl">Login</p>
        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" className="bg-white rounded-2xl w-64 "/>
        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" className="bg-white rounded-2xl w-64 "/>
        <Button type="submit" variant="contained" className="w-full h-12 bg-blue-800 transition-all duration-200">
          Login
        </Button>
      </form>
    </div>
  )
}