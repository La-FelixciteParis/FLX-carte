import styled, { keyframes } from "styled-components";
import { Header } from "../Types/Styles";
import { Principal } from "./Couleur";

const Eclat =(bright:any)=>  keyframes`
0%{
  transform: scale(0);
  opacity:0;
  filter: brightness(1);
}

50%{
  transform: scale(1.75);
  filter: brightness(${bright});
}

100%{
  transform: scale(1);
  opacity:1;
  filter: brightness(1);
}

`


export const HeaderStyle= styled.header`
    display:flex;
    width:100%;
    justify-Content: flex-end;
    align-items: center;
    padding:10px 20% 10px 10px;
    position:fixed;
    top:0;
    border-bottom: 2px solid ${({color})=>color}${({headerAppear}:Header)=>headerAppear ? '80':'00'} ;
    background: ${({color})=>`linear-gradient(to left, ${color}80 ,rgba(255,255,255,1)25%), url(/Images/FelixPlace.jpg)`};
    backdrop-filter: blur(5px);
    background-size: cover;
    background-position: right;
    height: 72px;
    max-height: 72px;
    z-index:2;
    transition:2s;

    nav{
      display:flex;
      justify-content: flex-end;
      gap:30px;
      align-items:center;

      p{
        font-size:20px;
        color: #00000090;

        :hover{
          cursor:pointer;
          color: #000000;
        }
      }

      button{
        border:none;
      }

      .Commerce{
        font-size:20px;
        width:none;
      }

      .adhésion{
        color:#FFFFFF;
        font-size:20px;
        background: ${Principal};
        padding:10px;
        border-radius:10px;

        :hover{
          color:#000000;
          cursor:pointer;
          background: none;
          border: 2px solid ${Principal}; 
      }
      }

      .menu{
        @media (max-width: 900px){
          display:none;
        }
      }
    }

    .logo {
        width: 125px;
        transition: transform 1s;
        opacity: 0.8;
        position:fixed;
        top:12.5px;
        left:60px;
        z-index:10;
      }
    
      img:hover {
        opacity: 1;
        cursor: pointer;
      }

      .anime{
        width:28px;
        position:fixed;
        top:14px;
        left:157px;
        animation: ${Eclat(({bright}:Header)=>bright)} 1s ease-in;
        z-index:10;
      }


      a{
        text-decoration: none;
      }

      .menusortie{
        display:none;
        position:fixed;
        left:0;
        top:0;
        z-index:2;
        width:100vw;
        background:white;
        padding:60px;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:10px;
        height:100vh;

        p{
          cursor: pointer;
          :hover{
            text-decoration: underline 2px ${Principal};
          }
        }
      }

      .menusortie.show{
        display:flex;

        @media (min-width:900px){
          display:none;
        }
      }

      @media (max-width: 1100px){
        padding:10px;
      }
`

export const MenuBurger=styled.div`
    z-index:3;

    .show_bar {
        span{
            width:0;
            background:transparent;
            &:before{
                transform: rotate(45deg);
            };

            &:after{
                transform: rotate(-45deg);
            };
        };
    };

    button{
        border:none;
        background:none;
        width:40px;
        height:40px;
        padding:0;

        span{
            width: 40px;
            background:${({headerAppear}:Header)=>headerAppear ? 'black' : 'white'};
            height:3px;
            display:block;
            position:relative;
            border-radius:3px;
            transition: all .5s ease-in-out;

            &:after{
                content: "";
                position: absolute;
                left: 0;
                width: 40px;
                background:${({headerAppear}:Header)=>headerAppear ? 'black' : 'white'};
                height:3px;
                display:block;
                border-radius:3px;
                transform: translateY(15.5px);
                transition: all .5s ease-in-out;

            };

            &:before{
                content: "";
                position: absolute;
                left: 0;
                width:40px;
                background:${({headerAppear}:Header)=>headerAppear ? 'black' : 'white'};
                height:3px;
                display:block;
                border-radius:3px;
                transform: translateY(-15.5px);
                transition: all .5s ease-in-out;

            };
        };

        :hover{
            cursor:pointer;
        }
    }

    @media (min-width: 900px){
        display:none;
    }
`

export const MyContain = styled.section`
/* Dropdown Button */
.dropbtn {
  background:none;
  color: #00000090;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  padding-left:30px;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color:#00000090;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
  color:#000000;
}

/* Show the dropdown menu on hover */
.dropdown{
  &:hover{
    .dropdown-content{
      display: block;
    }
  }
}
/* Change the color of the dropdown button when the dropdown content is shown */
.dropdown{
  &:hover{
    .dropbtn{
      color: #000000;
    }
  } 
}
`
