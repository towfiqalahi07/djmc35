import { NextResponse } from "next/server"
import { deleteImage } from "@/lib/blob"
import fs from "fs"
import path from "path"

export async function POST(req:Request){

  const {url}=await req.json()

  await deleteImage(url)

  const filePath=path.join(process.cwd(),"data/metadata.json")

  let db=JSON.parse(fs.readFileSync(filePath,"utf8"))

  db=db.filter((x:any)=>x.url!==url)

  fs.writeFileSync(filePath,JSON.stringify(db,null,2))

  return NextResponse.json({success:true})
}