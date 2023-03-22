import styled, { keyframes } from "styled-components";

const underline = keyframes`
    0%{
        width:0%;
    }
    100%{
        width:100%;
    }
`

export const InfoContain= styled.div`
flex:1;
margin: 72px 0 20px;
padding:0 30px 10px;
display:flex;
flex-direction:column;

h1{
    text-align:center;
    align-self:center;
    font-size:30px;

    &:after{
        content:"";
        display:block;
        animation:${underline} 0.8s linear;
        height:2px;
        background:${({color})=>color};
    }
}

p{
    transition: padding 0.5s;
    padding: 5px 0;
    transition: border 0.8s;
    border-top: 2px solid #FFFFFF;
    border-bottom: 2px solid #FFFFFF;

    :hover{
        @media (min-width: 500px){  
            padding-left:20px;
            transition: border 0.5s;
            transition: padding 0.5s;
            border-top: 2px solid ${({color})=>color};
            border-bottom: 2px solid ${({color})=>color};
            border-left: 2px solid ${({color})=>color};
            border-radius: 20px 0 0 20px;
        }
    }
}

input{
    border:none;
    width:36px;
    height:36px;
    background:transparent;
    cursor:pointer;

    ::-webkit-color-swatch {
        border-radius:50%;
        border:none;
    }

    ::-moz-color-swatch {
        border-radius:50%;
        border:none;
    }
}

button{
    background:transparent;
    border-radius: 50px;
    padding:5px;
    border: 2px solid;

    :disabled{
        border:none;
    }
}

div{
    display: flex;
    align-items:center;
    gap:10px;
    flex-wrap:wrap;

    @media (max-width: 500px){
        justify-content: center;
    }
}

article{
    width:30vw;

    @media (max-width: 500px){
        width:90vw;
    }
}

section{
    display: flex;
    justify-content:space-between;

    @media (max-width: 500px){
        flex-direction:column;
        text-align:center;
        justify-content:center;
        align-items:center;
        gap: 5px;
    }
}
`

