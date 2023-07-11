//Back user et commerçant

import { UserInfoType, UserType } from "../../Types/User" /*Import type pour les user */
import supabase from "./client"


//Récupérer un user par son id (FLX-ect...)
export const UserParIdentifiant = async (id:string) =>{
      
      const { data: Identifiant, error } = await supabase.from('Identifiant').select().eq('id',id)
      if(Identifiant){
        return Identifiant
      }else{
        console.log(error);
        
      }
      
}

//Récupérer un user avec son mail
export const UserIdParLogin = async(email:string)=>{
  let { data: Identifiant, error } = await supabase.from('Identifiant').select().eq('email',email)
  if(Identifiant){
    return Identifiant
  }else{
    console.log(error);
    
  }
}

//Créer un commerce/une activité (pas encore mis en place mais présent)
// export const ACTCreate = async(body:UserInfoType)=>{
//   let { data, error } = await supabase.auth.signUp({
//     email: body.email,
//     password: body.password
//   })
// }


//Login
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

//Récupérer user avec le token
export const GetACT = async(token:string)=>{

const { data: { user },error } = await supabase.auth.getUser(token)
if(error){
  return null
}

return user

}


//modifier les couleur d'un user
export const ChangeColorUser = async (color:string,color2:string,textColor:string,id:string)=>{
  const { data, error } = await supabase
  .from('Identifiant')
  .update({ 'Couleur': color,'CouleurSec':color2,'TextColor':textColor })
  .eq('id', id)

  if(error){
    console.log(error);
  }

  return data
}

//Récupérer touut les ids
export const GetIds = async() =>{
    
    let { data: Identifiant, error } = await supabase.from('Identifiant').select('id,COM_ACTnom,QrDl,QrDlCom')
    if(error){
        console.log(error.details); 
    }else{
        return Identifiant
    }
}


//Log en admin
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

  //Valider qu'un qr perso est dl
  export const ValidDl = async(id:string)=>{
      await supabase
      .from('Identifiant')
      .update({ "QrDl": true })
      .eq("id", id)
  }

  //Velider qu'un qr commerce est dl
  export const ValidDlCom = async(id:string)=>{
    await supabase
    .from('Identifiant')
    .update({ "QrDlCom": true })
    .eq("id", id)
}


//modifier la description du user
  export const UpdateDesc= async(text:string,id:string)=>{
    await supabase.from('Identifiant').update({"Description":text}).eq("id",id)
  }


  //récupère les commerce d'un village
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


  //modifie l'image du user
  export const UpdateImageUser= async(id:string,path:string)=>{
    await supabase
      .from('Identifiant')
      .update({ "Image": path })
      .eq("id", id)
  }

  //modifie un colomn d'un user
  export const Update=async(id:string,column:string,value:string)=>{
    await supabase
    .from('Identifiant')
    .update({[column]:value})
    .eq("id",id)
  }

  //créer un user si il n'existe pas
  export const UserCreate=async(body:UserType)=>{
    const {data:id,error} = await supabase
    .from('Identifiant')
    .select('id')
    .eq('id',body.id)
    
    if(id){
      if(id.length === 0){
      await supabase
      .from('Identifiant')
      .insert([
        body,
      ])
    }else{
      console.log('existe déjà');
      
    }
    }else{
      console.log(error);
      
    }

    
  }