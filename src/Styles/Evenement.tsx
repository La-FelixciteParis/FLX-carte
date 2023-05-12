import styled from "styled-components";
import { Background } from "../Types/Styles";

export const EvenementContain = styled.div`
    background: ${({Foncé}:Background)=>Foncé && "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),"} url(${({backgroundUrl}:Background)=>backgroundUrl});
    min-width:250px;
    height:350px;
    color: white;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;

    p{
        border:none;
        margin:5px;
    }

    .Description{
        gap:0;
        flex-direction:column;
    }
`

export const EvenementsContain = styled.div`

    min-width:100%;
    .Evenements{
        overflow-x:scroll;
        flex-direction: row;
        gap:20px;
        flex-wrap:nowrap;
        width:100%;
    }
`