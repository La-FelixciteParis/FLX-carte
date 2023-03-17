import supabase from "./client"

export const GetVillage= async (villageid:string)=>{
    const { data: Village, error } = await supabase.from('Village').select('Nom_Village').eq('id',villageid)
    if(Village){
        return Village
    }else{
        console.log(error);
        
    }
}