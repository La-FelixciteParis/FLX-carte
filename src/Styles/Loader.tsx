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
    align-items:center;
    justify-content: center;
    flex: 1;

    img{
        width: 30vw;
        animation: ${Rotate} 2s infinite;
    }
`