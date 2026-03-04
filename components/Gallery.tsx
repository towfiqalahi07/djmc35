"use client"

import { useEffect,useState } from "react"

export default function Gallery(){

 const [images,setImages]=useState([])
 const [search,setSearch]=useState("")

 useEffect(()=>{
  fetch("/api/list")
  .then(res=>res.json())
  .then(setImages)
 },[])

 const filtered=images.filter((img:any)=>
  img.name.toLowerCase().includes(search.toLowerCase())
 )

 return(

  <div>

   <input
    placeholder="Search name..."
    onChange={(e)=>setSearch(e.target.value)}
    style={{padding:"10px",marginBottom:"20px"}}
   />

   <div className="grid">

    {filtered.map((img:any)=>(
      <div className="card" key={img.url}>

        <img
         src={img.url}
         loading="lazy"
        />

        <p>{img.name}</p>

      </div>
    ))}

   </div>

  </div>
 )
}