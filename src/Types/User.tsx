export interface UserType{
    COM_ACTnom?: string,
​
    COMid?: string,
​
    Couleur?: string,

    CouleurSec?: string,

    TextColor?: string,
​
    Description?: string,
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
    Nom?: string,
    ​
    OP?: boolean,
    ​
    Paire?: null|boolean,
    ​
    Prénom?: string,
    ​
    QrDl?: boolean,
    ​
    SiteWeb?: string,

    Image?:string,

    Vidéo?: string,
    ​
    Tel?: string,
    ​    ​
    adresse?: string,
    ​
    besoin?: string,
    ​
    contribution?: string,
    ​
    created_at?: string,
    ​
    email?: string,
    
    id: string,
    ​
    métier?: string,

    Artisant?:boolean,
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