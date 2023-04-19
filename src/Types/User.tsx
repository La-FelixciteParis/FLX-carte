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

export interface CommerceInfoType{
    
    COM_ACTnom: string,
​
    COMid?: string,
​
    Couleur: string,
​
    Description: string,
​
    Facebook?: string,
    ​
    Instagram?: string,

    Twitter?: string,

    TikTok?:string,

    GoogleBusiness?:string,
    ​
    Linkedin?: string,
    ​
    Nom: string,
    ​
    OP: boolean,
    ​
    Paire: null|boolean,
    ​
    Prénom: string,
    ​
    QrDl: boolean,
    ​
    SiteWeb?: string,

    Image?:string,

    Vidéo?: string,
    ​
    Tel?: string,
    ​    ​
    adresse?: string,
    ​
    besoin: string,
    ​
    contribution: string,
    ​
    created_at: string,
    ​
    email: string,
    
    id: string,
    ​
    métier: string,
}