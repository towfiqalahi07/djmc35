import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/blob"
import Tesseract from "tesseract.js"
import fs from "fs"
import path from "path"

export async function POST(req:Request){

  const data=await req.formData()
  const file=data.get("file") as File

  if(!file) return NextResponse.json({error:"no file"})

  const buffer=Buffer.from(await file.arrayBuffer())

  const {data:{text}}=await Tesseract.recognize(buffer,"eng")

  const name=text.split("\n")[0]

  const blob=await uploadImage(file.name,file)

  const filePath=path.join(process.cwd(),"data/metadata.json")

  const db=JSON.parse(fs.readFileSync(filePath,"utf8"))

  db.push({
    name:name,
    url:blob.url
  })

  fs.writeFileSync(filePath,JSON.stringify(db,null,2))

  return NextResponse.json({success:true})
}