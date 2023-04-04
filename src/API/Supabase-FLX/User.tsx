import { UserInfoType } from "../../Types/User";
import supabase from "./client"

export const GetIds = async() =>{
    
    let { data: Identifiant, error } = await supabase.from('Identifiant').select('id,COM_ACTnom')
    if(error){
        console.log(error.details); 
    }else{
        return Identifiant
    }
}

export const LoginAdmin = async(body:UserInfoType)=>{
  
    let { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password
    })
  
    if(data.user){
      return data
    }else{
        return(error?.message);
    }
}

export const ValidDl = async(id:string)=>{
    await supabase
    .from('Identifiant')
    .update({ "QrDl": true })
    .eq("id", id)
}