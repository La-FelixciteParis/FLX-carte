import styled from "styled-components";
import { Couleur } from "../Types/Styles";


export const InfoContain= styled.div`
flex:1;
margin: 72px 0 20px;
padding:0 30px 10px;
display:flex;
flex-direction:column;

.Title{
    margin-top:10px;
    height:75px;
    padding:10px;
    background: ${({Primaire}:Couleur)=>Primaire}
}

h1{
    text-align:center;
    align-self:center;
    margin:0;
    color: ${({TextColor}:Couleur)=>TextColor}
}

h2{
    text-align:center;
    text-decoration: underline 2px solid ${({Secondaire}:Couleur)=>Secondaire}
}

p{
    padding: 5px 0;
    border-top: 2px solid #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
}

input{
    border:none;
    width:36px;
    height:36px;
    background:transparent;
    cursor:pointer;

    ::-webkit-color-swatch {
        border-radius:50%;
        border:1px solid #00000020;
    }

    ::-moz-color-swatch {
        border-radius:50%;
        border:1px solid #00000020;
    }
}

button{
    background:transparent;
    border-radius: 50px;
    padding:5px;
    border: 2px solid;

    :disabled{
        border:none;
    }
}

div{
    display: flex;
    align-items:center;
    gap:10px;
    flex-wrap:wrap;

    @media (max-width: 500px){
        justify-content: center;
    }
}

.Lien{
    input{
        width:100px;
        height:25px;
        border:1px solid black;
    }

    button{
        cursor:pointer;
    }
}

.ImageSelect{
    width:100%;
    text-align:center;
}

.UploadButton{
    width:100px;
    border:2px solid ${({Secondaire}:Couleur)=>Secondaire};
    cursor:pointer;

    :hover{
        background:${({Primaire}:Couleur)=>Primaire};
        color:${({TextColor}:Couleur)=>TextColor};
    }
}

article{
    width:300px;
    display:flex;
    flex-direction:column;
    align-items:center;
    .Img{
        width:150px;
    }

    .Couleurs{
        padding-left:30px;
        flex-direction:column;
        align-items:flex-start;

        .Couleur{
            width:180px;
            justify-content: space-between;
        }
    }

    

    @media (max-width: 700px){
        width:90vw;
    }
}

section{
    display: flex;
    justify-content:space-between;
    flex-wrap:wrap-reverse;

    @media (max-width: 500px){
        flex-direction:column;
        text-align:center;
        justify-content:center;
        align-items:center;
        gap: 5px;
    }
}

.Gerance{
    flex-direction:column;
    align-items:flex-start;
    width:250px;

    div{
        width:100%;
        justify-content:space-between;
    }

    @media (max-width: 700px){
    align-items:center;
    width:100%;
    
    div{
        width:250px;
    }
    }
}


.Village{
    flex-wrap:wrap;

    h2{
        width:100%;
        text-align:left;
    }

    @media (max-width:700px){
        h2{
            text-align:center;
        }
    }
}
`

