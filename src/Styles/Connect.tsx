import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    align-items:center;

    div{
        display:flex;
        gap:20px;

        @media (max-width: 780px){
            flex-direction:column;
        };
    }

    
`

export const FormContain= styled.div`
flex:1;
margin: 72px 0 20px;
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
`

export const ErrorContain= styled.div`
    text-align: center;
    gap:5px;
    p{
        margin:0;
    };
    small{
        color:red;
        margin: 0;
    };
    ul{
        align-self: center;
        text-align: left:
        margin: 0;
    };
`