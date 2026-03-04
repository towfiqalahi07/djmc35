import { put, list, del } from "@vercel/blob"

export async function uploadImage(name:string,file:File){
  return await put(name,file,{access:"public"})
}

export async function listImages(){
  const {blobs}=await list()
  return blobs
}

export async function deleteImage(url:string){
  await del(url)
}