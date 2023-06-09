export interface Couleur{
    Primaire?:string,
    Secondaire?:string,
    TextColor?:string,
}

export interface Background{
    backgroundUrl?:string,
    Foncé?:boolean,
    colorSec?:string,
}

export interface Header{
    color?:string,
    headerAppear?:boolean,
    bright:number
}