import supabase from "./client"

export const Upload = async(File:File)=>{
  const FilePath = `${File.name}`;
  const { data: image, error } = await supabase.storage
    .from('Images')
    .upload(FilePath, File);
  
    if(error){
      console.log(error);
      
    }else{
      return(image);
      
    }  
  
}

export const donwload = (path:string)=>{
  
const { data } =  supabase
.storage
.from('Images')
.getPublicUrl(path)
return data

}

export const RemoveImage= (path:string)=>{
   supabase
  .storage
  .from('Images')
  .remove([path])
}