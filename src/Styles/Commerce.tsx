import styled, { keyframes } from "styled-components";
import { Klein } from "./Couleur";

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
            background:black;
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
                background:black;
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
                background:black;
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

    .hidden{
        animation: ${WidthDown} 0.5s forwards;
        padding:0;
        height:80vh;
    }

    .show{
        padding:0;
        opacity:1;
        transition:1s;
        z-index:1;
        article{
            gap:0;

            div{
                z-index:1;
            }
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
        padding:30px;
        animation: ${WidthUp} 0.5s forwards;

        article{
            display:flex;
            gap:20px;
            overflow-x:auto;
            scrollbar-width: none;

            div{
                display:flex;
                flex-direction:column;

                ul{
                    margin:0;
                    width:38%;
                    a{
                        color:#00000080;
                        text-decoration:none;
                        
                        &:after{
                            content:"";
                            display:block;
                            background:${({color})=>color};
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
    width:50%;
    max-height:500px;
    padding:20px;

    iframe{
        width:100%;
        height:100%;
    };

    img,video{
        width:100%;
    };

    small{
        width:130px;
    }

    a{
        color:#00000080;
        text-decoration:none;
        
        &:after{
            content:"";
            display:block;
            background:${({color})=>color};
            width:0;
            transition:0.5s;
            height:2px;
        }

        :hover{
            color:black;
            transition:0.5s;
            &:after{
                width:100%;
                transition:0.5s;
            };
        };
    };

    @media (max-width: 780px){
        padding:5px;
        width:100%;
        height:400px;
    };
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

                    color:${Klein};

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