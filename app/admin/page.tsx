"use client"

import { useState } from "react"

export default function Admin(){

 const [file,setFile]=useState<File|null>(null)
 const [password,setPassword]=useState("")
 const [auth,setAuth]=useState(false)

 const login=async()=>{

  const res=await fetch("/api/check")

  const data=await res.json()

  if(password===data.password){
   setAuth(true)
  }else{
   alert("Wrong password")
  }
 }

 const upload=async()=>{

  if(!file) return

  const form=new FormData()

  form.append("file",file)

  await fetch("/api/upload",{
   method:"POST",
   body:form
  })

  alert("Uploaded")
 }

 if(!auth){

  return(

   <div style={{padding:"40px"}}>

    <h2>Admin Login</h2>

    <input
     type="password"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button onClick={login}>Login</button>

   </div>

  )
 }

 return(

  <div style={{padding:"40px"}}>

   <h1>Upload Batchmate Photo</h1>

   <input
    type="file"
    onChange={(e)=>setFile(e.target.files?.[0]||null)}
   />

   <button onClick={upload}>Upload</button>

  </div>
 )
}