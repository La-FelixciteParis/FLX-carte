import styled from "styled-components";

export const FooterStyle = styled.footer`
    background: black;
    display: flex;
    padding:20px;
    align-items:center;
    width:100%;
    section{
        flex:1;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:10px;
        h3{
            color: white;
        };
        a{  
            color: #FFFFFF90;
            margin:0;
            text-decoration:none;
            :hover{
                cursor:pointer;
                color:white;
                text-decoration: underline 2px ${({color})=>color}
            };
        };
    };

    article{
        display:flex;
        gap:20px;
    };

    div{
        display:flex;
        flex-direction:column;
        gap:10px;
    };
    img{
        width: 100px;
    };

    @media (max-width: 500px){
        flex-direction:column;
        padding-bottom:10px;
    }
`