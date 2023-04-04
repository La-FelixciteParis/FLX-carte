import supabase from "./client"

export const GetIds = async() =>{
    console.log("test");
    
    let { data: Identifiant, error } = await supabase.from('Identifiant').select('id,COM_ACTnom')
    if(error){
        console.log(error.details); 
    }else{
        return Identifiant
    }
}