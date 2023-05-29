import styled, { keyframes } from "styled-components";
import { Header } from "../Types/Styles";

const RotateAnim=keyframes`
    0% {
        transform: translateX(-300px)rotate(0deg);
    }
    100% {
        transform: translateX(0px)rotate(360deg);
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

    img {
        animation: ${RotateAnim} 0.8s linear;
        width: 50px;
        transform: scale(1);
        transition: transform 1s;
        opacity: 0.8;
        
      }
    
      img:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 1s;
        animation-delay: 0s;
      }

      button{ 
        border: ${({headerAppear}:Header)=>!headerAppear && 'none'};
        font-size:${({headerAppear}:Header)=>!headerAppear && '20px'};
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
