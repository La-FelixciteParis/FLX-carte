import styled, { keyframes } from "styled-components";

const Rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    } 
`

export const Img = styled.img`
    width: 30vw;
    animation: ${Rotate} 2s infinite;
`