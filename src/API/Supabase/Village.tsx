//Back Village

import supabase from "./client"


//Récupère un village
export const GetVillage= async (villageid:string)=>{

    let { data: Village, error } = await supabase
  .from('Village')
  .select('nomVillage')
  .eq("id",villageid)
    
    if(Village){
        return Village
    }else{
        console.log(error);
        
    }
}