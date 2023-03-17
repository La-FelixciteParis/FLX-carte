import styled from "styled-components";

export const FooterStyle = styled.footer`
    background: black;
    display: flex;
    padding: 0 20px;
    align-items:center;
    position:fixed;
    bottom: 0;
    width:100vw;
    height: 218px;
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
        overflow:auto;
        padding-bottom:10px;
    }
`