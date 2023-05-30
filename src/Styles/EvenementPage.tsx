import styled from "styled-components";
import { Background } from "../Types/Styles";

export const MainContainer=styled.section`
    margin: 72px 0 20px;
    width:100%;

    .Image{
        h1{
            color:white;
            font-size:32px;
        }
        width:100%;
        height:100vh;
        display:flex;
        margin:0;
        justify-content:center;
        align-items:center;
       background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${({backgroundUrl}:Background)=>backgroundUrl}) no-repeat center/cover
    }

    article,h2{
        margin: 30px 20px;
    }

    .Commerces{
        display:flex;
        gap:20px;
        overflow-x:scroll;
        scrollbar-width: none;
        justify-content:flex-start;
    }
`

export const CommerceDiv=styled.div`
   width:200px;
   height: 300px;
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   align-items:center;
   color:white;
   background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${({backgroundUrl}:Background)=>backgroundUrl}) no-repeat center/cover
`