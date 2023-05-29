import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { CarteProps } from "../Types/Carte";

export const MainContainer = styled.div`
    margin: 72px 0 0;
    width:100%;
    min-height:72vh;
`

export const Dl = styled.p`
  top: 400px;
  position: absolute;

  :hover {
    cursor: pointer;
    color: red;
  }
`

export const Text = styled.p`
    position: absolute;
    left: ${({x}:CarteProps)=>x}px;
    top: ${({y}:CarteProps)=>y}px; 
    font-size: ${({size}:CarteProps)=>size}px;
`

export const CanvasContainer = styled.div`
  position: relative;
`

export const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  background:url(/Images/${({image}:CarteProps)=>image}.png) center center/cover no-repeat;
`

export const QRCanvas = styled(QRCodeCanvas)`
  position: absolute;
  left: ${({x}:CarteProps)=>x}px;
  top: ${({y}:CarteProps)=>y}px;  
`