import styled, { keyframes } from "styled-components";

const Rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
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