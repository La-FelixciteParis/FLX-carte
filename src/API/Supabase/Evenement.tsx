import supabase from "./client"

export const GetEvenement = async (idVillage:string) =>{
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