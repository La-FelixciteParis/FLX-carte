import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { CarteProps } from "../Types/Carte";

export const MainContainer = styled.div`
    margin: 72px 0 0;
    width:100%;
    min-height:1000px;
`

export const Dl = styled.p`
  top: 800px;
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
    transform:rotate(${({rotate}:CarteProps)=>rotate}deg);
`

export const CanvasContainer = styled.div`
  position: relative;
`

export const BackgroundCanvas = styled.canvas`
  position: absolute;
  left: ${({x}:CarteProps)=>x}px;
  top: ${({y}:CarteProps)=>y}px;
  background:url(/Images/${({image}:CarteProps)=>image}.png) center center/cover no-repeat;
`

export const QRCanvas = styled(QRCodeCanvas)`
  position: absolute;
  left: ${({x}:CarteProps)=>x}px;
  top: ${({y}:CarteProps)=>y}px;  
`