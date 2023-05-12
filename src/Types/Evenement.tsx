export interface EvenementProps{
    Villageid:string
}

export interface EvenementContact{
    Nom:string,
    Mail:string,
    Tel?:string,
}

export interface EvenementInfo{
    id:number,
    description:string,
    dateDébut:string,
    dateFin:string,
    nom:string,
    villageId:string,
    Lieu:string,
    Type:string,
    Contacts:EvenementContact [],
    Image:string,
    noAffiche:boolean
}

export interface Evenement{
    evenement: EvenementInfo
}