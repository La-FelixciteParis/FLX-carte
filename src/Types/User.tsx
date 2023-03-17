export interface UserType{
    id: string, 
    created_at: string, 
    Prénom: string,
    Nom: string,
    email:string
    Couleur:string
}

export interface UserACTType{
    id: number,
    created_at: string,
    identifiantId: string,
    email: string,
    password: string 
}

export interface UserInfoType{
    email:string,
    password:string
}