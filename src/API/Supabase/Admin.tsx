import supabase from "./client"

export const ValidAdmin = async(id:any)=>{
    let { data: Admin, error } = await supabase
    .from('Admin')
    .select('UserId')
    .eq('UserId',id)

    return Admin;
    
}