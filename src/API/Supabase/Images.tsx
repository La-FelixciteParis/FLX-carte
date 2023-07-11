//Back image

import supabase from "./client"

//Upload une image dans le storage
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


//Recupère l'image dans le storage
export const donwload = (path:string)=>{
  
const { data } =  supabase
.storage
.from('Images')
.getPublicUrl(path)
return data

}


//Efface une image dans le storage
export const RemoveImage= (path:string)=>{
   supabase
  .storage
  .from('Images')
  .remove([path])
}