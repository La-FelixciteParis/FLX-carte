import styled, { keyframes } from "styled-components";
import { Principal } from "./Couleur";
import { Background, Couleur, Header } from "../Types/Styles";

export const WidthUp = keyframes`
    0%{
        width:0%;
    }

    100%{
        width:100%;
    }
`

export const WidthDown = keyframes`
    0%{
        width:100%;
    }

    100%{
        width:0;
    }
`

export const UnderlineAnimEnd= keyframes`
    0%{
        width:100%;
        margin-left:0;
    }

    100%{
        width:0;
        margin-left:100%;
    }
`

export const MenuBurger=styled.div`
    position:fixed;
    top:16px;
    left:16px;
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
`

export const CommerceContain= styled.div`
    margin: 72px 0 0;
    width:100%;
    transition:1s;
    min-height:80vh;
    display:flex;
    justify-content:center;

    h2{
        padding:5px;
        background:${({Primaire}:Couleur)=>Primaire};
        color:${({TextColor}:Couleur)=>TextColor};
    }

    hr{
        border: none;
        border-top: 10px double ${({Primaire}:Couleur)=>Primaire};
        overflow: visible;
        text-align: center;
        height: 5px;
        width:100%;
    }

    .InfoCom{
        min-width: 50%;
    }

    .Village{
        cursor:pointer; 
        margin-bottom:25px;
        text-decoration:underline 2px ${({Secondaire}:Couleur)=>Secondaire};

        :hover{
            transform: scale(1.1);
            padding-left:25px;
            text-decoration:underline 3px ${({Secondaire}:Couleur)=>Secondaire};
        }
    }

    .false{
        padding:0;
        max-width:0;
    }

    .active{
        order:-1;
        border-top:1px solid black;
        border-bottom:1px solid black;
        transition:0.5s;

        small{
            opacity:1;
            top:0;
        }
    }

    section{
        display:flex;
        flex-direction:column;
        gap:30px;
        width:100%;
        max-width:1300px;
        padding:30px;
        animation: ${WidthUp} 0.5s forwards;

        article{
            display:flex;
            gap:20px;

            div{
                display:flex;
                flex-direction:column;

                ul{
                    margin:0;
                    padding:0 0 10px;
                    
                    li{
                        display:table-header-group;
                    }

                    a{
                        color:#00000080;
                        text-decoration:none;
                        
                        &:after{
                            content:"";
                            display:block;
                            background:${({Primaire}:Couleur)=>Primaire};
                            width:0;
                            height:2px;
                            animation: ${UnderlineAnimEnd} 0.5s forwards;
                        }

                        :hover{
                            color:black;
                            transition:0.5s;
                            &:after{
                                animation: ${WidthUp} 0.5s forwards;
                            };
                        };
                    };
                };
            };

            
        };

        .infos{
            @media (max-width: 780px){
                flex-direction:column;
            };
        }
    }
`

export const Visuel=styled.div`
    width:100%;
    height:100vh;
    background:linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${({backgroundUrl}:Background)=>backgroundUrl}) no-repeat center/cover;
    display:flex;
    justify-content:center;
    align-items:center;
    h1{
        text-align:center;
        color:${({color})=>color};
        padding:5px;
        border-bottom: 1px solid;
        border-right:1px solid;
        border-image: linear-gradient(to bottom right, #FFFFFF00 70%, ${({colorSec}:Background)=>colorSec}) 1;

    }
`

export const Ul=styled.ul`
    display:flex;
    flex-wrap:wrap;
    gap:30px;

    a{
        img{
            width:50px;
            height:50px;
        }
    };


    .Plus{
        margin:0;
        padding:0;
        width:50px;
        height:50px;
        background:Lightgray;
        border-radius:50px;     
        border: none;
        text-align:center;
        font-size:40px;

        .ajout{
            display:block;
            width:30px;
            position:relative;
            left:10px;
            height:2px;
            background: black;
        }

        .vertical{
            transform:rotate(90deg);
        }
    }
`

export const Village = styled.section`
    opacity:0;
    z-index:-1;
    transition:0.3s;
    article {
        padding: 0;
        display:flex;
        flexDirection:"row";
        gap:0;
        min-height:80vh;
        width:100%;
        position:absolute;
        left:0;
        top:72;     

        aside{
            width:20%;
            padding:20px;
            height:80vh;
            background:white;
            overflow-y:scroll;
            scrollbar-width: none;

            div{
                div{
                    width:100%;
                
                small{
                    opacity:0;
                    margin:5px;
                    position:relative;
                    transition:0.5s;
                    top:-35px;
                    left:24px;
                    width:90%;

                    button{
                        background:none;
                        color: #00000050;
                        border:none;
                        diplay:block;

                        &:hover{
                            color: black;
                        };
                    };

                    &:before{
                        content:"↪";
                    };
                };

                :hover{

                    color:${Principal};

                    small{
                        opacity:1;
                        transition:0.5s;
                        top:0;
                    }
                }
                }
            };

        };

        div{
            z-index:-1;
            float: left;
            width:100%;
        };
    };

`