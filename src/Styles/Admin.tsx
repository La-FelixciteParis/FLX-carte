import styled from "styled-components";

export const AdminContain=styled.div`
    flex:1;
    margin: 72px 0 20px;
    padding:0 30px 10px;
    display:flex;
    flex-direction:column;

    section{
        padding-left:5px;
        display:flex;
        width:100%;
        overflow-x:auto;
        scrollbar-width: none;
        gap:20px;

        .none{
            display:none;
        }
    }
`

export const QR=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    p{
        padding:5px;
        border: 1px solid black;
        border-radius:50px;
        text-align:center;
        color:#00000090;
        width:120px;
        box-shadow:0px 0px 9px 1px rgba(0,0,0,0.30);
        :hover{
            cursor: pointer;
            color:#000000;
            border:1px solid #00000010;
            box-shadow: inset -5px 5px 15px 5px rgba(64,64,64,0.2);
            transition: 0.2s;
        };
    }
`