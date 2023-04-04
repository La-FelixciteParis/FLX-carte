import styled from "styled-components";

export const AdminContain=styled.div`
    flex:1;
    margin: 72px 0 20px;
    padding:0 30px 10px;
    display:flex;
    flex-direction:column;

    section{
        display:flex;
        width:100%;
        overflow-x:auto;
        scrollbar-width: none;
        gap:20px; 
    }
`

export const QR=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    height:250px;
    p{
        padding:5px;
        border: 1px solid black;
        border-radius:50px;
        :hover{
            cursor: pointer;
            color:red;
        };
    }
`