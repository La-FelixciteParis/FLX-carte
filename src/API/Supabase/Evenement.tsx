import supabase from "./client"

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