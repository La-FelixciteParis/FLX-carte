import styled, { keyframes } from "styled-components";
import { Header } from "../Types/Styles";

const Eclat =(bright:any)=>  keyframes`
0%{
  transform: scale(0);
  opacity:0;
  filter: brightness(1);
}

50%{
  transform: scale(1.75);
  filter: brightness(${bright});
}

100%{
  transform: scale(1);
  opacity:1;
  filter: brightness(1);
}

`


export const HeaderStyle= styled.header`
    display:flex;
    width:100%;
    justify-Content: space-around;
    align-items: center;
    padding:10px;
    position:fixed;
    top:0;
    border-bottom: 2px solid ${({color})=>color}${({headerAppear}:Header)=>headerAppear ? '80':'00'} ;
    background:${({headerAppear,color}:Header)=>headerAppear ? `linear-gradient(to left, ${color}80 ,rgba(255,255,255,1)25%), url(/Images/FelixPlace.jpg)`: "none"};
    background-size: cover;
    background-position: right;
    height: 72px;
    max-height: 72px;
    overflow: hidden;
    z-index:2;
    transition:1s;

    .logo {
        width: 125px;
        transition: transform 1s;
        opacity: 0.8;
        position:fixed;
        top:12.5px;
        left:222px;
        
      }
    
      img:hover {
        opacity: 1;
        cursor: pointer;
      }

      .anime{
        width:28px;
        position:fixed;
        top:14px;
        left:318px;
        animation: ${Eclat(({bright}:Header)=>bright)} 1s ease-in;
      }

      button{ 
        border: ${({headerAppear}:Header)=>!headerAppear && 'none'};
        font-size:${({headerAppear}:Header)=>!headerAppear && '20px'};
        position:fixed;
        top:21px;
        left:70%;
      }

      a{
        text-decoration: none;
        color: ${({headerAppear}:Header)=>headerAppear? "#00000090": "#FFFFFF90"};

        :hover{
            cursor:pointer;
            color: ${({headerAppear}:Header)=>headerAppear? "#000000": "#FFFFFF"};
        }
      }
`
