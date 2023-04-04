import supabase from "./client"

export const GetIds = async() =>{
    let { data: Identifiant, error } = await supabase.from('Identifiant').select('id,COM_ACTnom')
    if(error){
        console.log(error); 
    }else{
        return Identifiant
    }
}