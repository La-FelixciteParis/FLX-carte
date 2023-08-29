import styled from "styled-components";
import { CarouselType } from "../Types/Carousel";

export const CarouselContain=styled.article`
    width:100%;
    display:flex;
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        top:297px;
        width:50px;
        height:50px;
        color:black;
        border:none;
        font-size:40px;
        padding:5px;
        background:none;
        cursor:pointer;
    }
    .precedent{
        left:30px;
        @media (min-width: 1600px){
            left:calc(30px + 5%);
          }
    }
    .suivant{
        right:30px;
        @media (min-width: 1600px){
            right:calc(30px + 5%);
          }
    }

    div{
        width:100%;
        height:500px;
        background-image: url(/Images/imagesCarousel/carousel${({image}:CarouselType)=>image}.jpeg);
        background-size: cover;
        background-position: center;
        background-repeat:no-repeat;
    }
`