import styled from "styled-components";

export const Form = styled.div`
margin: 72px 0 20px;
flex:1;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

min-height:50vh;

form{

    display:flex;
    flex-direction:column;
    width:50vw;
    gap:20px;
    align-items:center;
    justify-content:center;
    
    textarea{
        width:100%;
        max-width:500px;
        height:300px;
    }
}

.valider{
    color:green;
}

.error{
    color:red;
}
`