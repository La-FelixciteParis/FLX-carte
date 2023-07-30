import styled from "styled-components";
import { CarouselType } from "../Types/Carousel";

export const CarouselContain=styled.section`
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
        color:white;
        border:none;
        font-size:40px;
        padding:5px;
    }
    .precedent{
        left:30px
    }
    .suivant{
        right:30px;
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