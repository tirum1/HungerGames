import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl, Howler } from 'howler';
import HoverSound from './assets/sound/click-21156.mp3';
import backgroundImage from './assets/background/Unbenannt-3.png';
import XTRAIMAGE from './assets/Items/1.png';
import SKIPIMAGE from './assets/Items/2.png';
import BOOSTIMAGE from './assets/Items/3.png';
import VIMAGE from './assets/Items/4.png';
import clickSound from './assets/sound/hover.mp3';
import "./App.css";
import Web3 from 'web3';
import hgmsTokenAbi from './assets/ABI/HungerGames.json';
import GCAbi from "./assets/ABI/GnomesCollective.json";
import {ethers, BigNumber} from 'ethers';

const hgmsTokenAddress = '0x73229e7c7d8f9276e7a69cb0cc22ec503cf9c7c6'; 
const GnomesCollectiveAddress = "0x3acAcDfbF7fe223d42031a2cd185e232D911405F";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 1000; /* Ensure it appears on top of everything */
`;
const BalanceModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BalanceModalContainer = styled.div`
  position: relative;
  text-align: center;
`;
const BalanceModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%; 
`;
const BalanceTable = styled.div`
  margin-top: 20px;
`;
const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const BalanceLabel = styled.p`
  font-size: calc(0.7vh + 0.7vw);
  color: #000;
`;
const BalanceValue = styled.p`
  font-size: calc(0.7vh + 0.7vw);
  color: #000;
  font-weight: bold;
`;
const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -20px;
  font-size: 2vw;
  padding: 1vh 1vw;
  background-color: #ff5252;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff3333;
  }
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;
const BackButtonContainer = styled.div`
  position: absolute;
  top: 80vh;
  left: 80vw;
  transform: translate(-50%, -50%);
`;
const ButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  margin: 0 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const IncButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 55.5vw;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const DecButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 37.5%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const DepButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 63vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const BalButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const ApplyButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 70vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const Image = styled.img`
  width: calc(50vw + 50vh); /* Adjust the size as needed */
  height: calc(22vw + 22vh);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  position: relative; /* Add relative positioning to the image container */
`;
const ItemImage = styled.img`
  width: calc(5vw + 5vh); /* Adjust the size as needed */
  height: calc(5vw + 5vh);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  position: absolute; /* Use absolute positioning */
  top: 45%; /* Position at the top */
  left: 45%; /* Position at the left */
  animation: itemImageAnimation 3s infinite alternate; /* Apply the animation */

  @keyframes itemImageAnimation {
    0% {
      box-shadow: 0px 0px 60px rgba(0, 0, 0, 2);
    }
    100% {
      box-shadow: 0px 0px 180px rgba(255, 165, 0, 2); /* Adjust shadow color and size as needed */
    }
  }
`;
const blurAnimation = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    filter: blur(0.7px);
  }
  100% {
    text-shadow: 0 0 0px rgba(0, 0, 0, 0);
    filter: blur(0px);
  }
`;
const Text = styled.p`
font-size: calc(.6vh + .6vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 25%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const DescText = styled.p`
font-size: calc(.6vh + .6vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 65%;
  white-space: pre-line;

  &:hover {
    color: red;
  }
`;
const TextHGMS = styled.p`
  font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextETH = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 35%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextPOTIONS = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 40%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextSKIP = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 45%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextBOOST = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextV = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 55%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const Text2 = styled.p`
  font-size: calc(1vh + 1vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 65%;
  left: 40%;
  &:hover {
    color: red;
  }
`;
const PriceText = styled.p`
  font-size: calc(1vh + 1vw);
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 42%;
  white-space: pre-line;
  &:hover {
    color: red;
  }
`;
const Title = styled.h1`
  font-size: calc(2vh + 2vw);
  font-weight: bold;
  color: #fff; /* Updated color to black */
  margin: 15px auto; /* Center the title horizontally */
  position: absolute; /* Use absolute positioning */
  top: 10%; /* Place the title at the vertical center */
  left: 50%; /* Place the title at the horizontal center */
  transform: translate(-50%, -50%); /* Center the title precisely */
  z-index: 1; /* Ensure the title is on top of the image */
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  filter: blur(5px);
  animation: ${blurAnimation} 2s linear alternate infinite, glowTitle 2s linear infinite;

  &:hover {
    color: red;
    text-shadow: 0 0 100px rgba(255, 0, 0, 0.5);
  }

  @keyframes glowTitle {
    0% {
      text-shadow: 0 0 10px rgba(255, 255, 0, 0.7);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 255, 0, 0.9);
    }
    100% {
      text-shadow: 0 0 10px rgba(255, 255, 0, 0.7);
    }
  }
`;
const ImageContainer = styled.div`
  position: relative;
`;
const NFTModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75); // darker semi-transparent background
  z-index: 9999; // significantly high z-index
`;

const NFTModalContent = styled.div`
  width: 15vw;  
  height: 50vh;
  background-color: #fff;
  padding: 2rem; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); 
  border-radius: 15px; 
  overflow-y: hidden;


  @media (max-width: 1920px)  {
    width: 20%
  }
  
  @media (max-width: 1350px)  {
    width: 22%
  }
 
  @media (max-width: 1200px) {
    width: 27%; 
  }

  @media (max-width: 1155px) {
    width: 32%;
  }
  @media (max-width: 800px) {
    width: 37%;
  }
  @media (max-width: 620px) {
    width: 42%;
  }
  @media (max-width: 520px) {
    width: 55%;
  }
  @media (max-width: 520px) {
    width: 80%;
  }

`;



class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.hoverover = new Howl({
      src: HoverSound,
      volume: 0.5,
    });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });
    }

render() {
    
    
 

    return (<div></div>
            );
          }
}
  
export default Shop;