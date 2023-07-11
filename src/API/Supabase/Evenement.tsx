// Back Evenement

import supabase from "./client"

// Récupérer les évènement lié à un village
export const GetEvenements = async (idVillage:string) =>{
    let { data: evenement, error } = await supabase
  .from('evenement')
  .select()
  .eq('villageId',idVillage)

  if(evenement){
    return(evenement);
  }else{
    console.log(error);
    return []
  }
  
}

//Récupérer Evenement lié à un commerce/une activité
export const GetEvenement = async (id:string) =>{
  let {data,error} = await supabase
  .from('evenement')
  .select()
  .eq('id',id)
  if (error) {
    console.log(error);    
  }else{
    return data
  }
}

//Tables lien entre evenement et village ou commerce
export const GetLink = async (link:string,id:string)=>{
  let {data:Link,error} = await supabase
  .from(link)
  .select()
  .eq('id_evenement',id)

  if (error) {
    console.log(error);    
  }else{
    return Link
  }
}