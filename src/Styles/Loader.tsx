import styled, { keyframes } from "styled-components";

const Rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    } 
`

const Translate=keyframes`

100%{
    transform:translateY(-10px);
}

`

export const Load = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    flex: 1;

    p, p:hover{
        cursor: default;
        padding: 0;
        border:none;
    }

    img{
        width: 30vw;
        animation: ${Rotate} 2s infinite;
    }
`

export const LoadUpload = styled.div`
    width:150px;
    height:50px;
    display:flex;
    justify-content:space-around;
    aligns-items:center;

    .dot{
        background:black;
        width:20px;
        height:20px;
        border-radius:50px;
        animation: 0.5s ${Translate} infinite alternate;
        transform: translateY(10px);

    }

    .dot2{
        animation-delay:0.2s
    }

    .dot3{
        animation-delay:0.4s
    }
`