import { UserInfoType } from "../../Types/User"
import supabase from "./client"

export const UserParIdentifiant = async (id:string) =>{
      
      const { data: Identifiant, error } = await supabase.from('Identifiant').select().eq('id',id)
      if(Identifiant){
        return Identifiant
      }else{
        console.log(error);
        
      }
      
}

export const UserIdParLogin = async(email:string)=>{
  let { data: Identifiant, error } = await supabase.from('Identifiant').select().eq('email',email)
  if(Identifiant){
    return Identifiant
  }else{
    console.log(error);
    
  }
}

// export const ACTCreate = async(body:UserInfoType)=>{
//   let { data, error } = await supabase.auth.signUp({
//     email: body.email,
//     password: body.password
//   })
// }

export const LoginACT = async(body:UserInfoType)=>{
  
  let { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password
  })

  if(data){
    return data
  }else{
    console.log(error);
  }

  
}

export const GetACT = async(token:string)=>{

const { data: { user },error } = await supabase.auth.getUser(token)
if(error){
  return null
}

return user

}

export const ChangeColorUser = async (color:string,id:string)=>{
  const { data, error } = await supabase
  .from('Identifiant')
  .update({ 'Couleur': color })
  .eq('id', id)

  if(error){
    console.log(error);
  }

  return data
}

export const GetIds = async() =>{
    
    let { data: Identifiant, error } = await supabase.from('Identifiant').select('id,COM_ACTnom,QrDl')
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

  export const UpdateDesc= async(text:string,id:string)=>{
    await supabase.from('Identifiant').update({"Description":text}).eq("id",id)
  }

  export const CommerceParVillage=async(regex:RegExp)=>{
    let {data:Commerces,error} = await supabase.from('Identifiant').select()

    if(error){
      console.log(error);
      
    }

    const CommerceVillage = Commerces?.filter((commerce)=>{
      return regex.test(commerce.id)
    }
    )

    return(CommerceVillage);
    
  }