import styled from "styled-components";

export const ACPBcontain = styled.section`
    flex:1;
    margin: 72px 0 20px;
    padding:0 30px 10px;
    display:flex;
    flex-direction:column;
    align-items:center;

    h1,h2{
        text-align:center;
    }

    img{
        max-width:975px;
        width:70%;

        @media (max-width: 780px){
            width:95vw;
        }
    }
`