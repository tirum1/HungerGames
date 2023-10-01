
import React, { Component } from 'react';
import styled, { keyframes }  from 'styled-components';
import NFTImage from './assets/background/1.png';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const MintButtonContainer = styled.div`
  position: absolute;
  top: 80vh; /* Adjust the vertical position as needed */
  left: 45vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;
const radiantGlow = keyframes`
  0% {
    background-color: #833929;
  }
  50% {
    background-color: #a3563d;
  }
  100% {
    background-color: #833929;
  }
`;

const FightButtonContainer = styled.div`
position: absolute;
top: 80vh; /* Adjust the vertical position as needed */
left: 35vw; /* Adjust the value as needed */
transform: translate(-50%, -50%);
  

`;

const ReadMeButtonContainer = styled.div`
  position: absolute;
  top: 80vh; /* Adjust the vertical position as needed */
  left: 55vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;
const ShopButtonContainer = styled.div`
  position: absolute;
  top: 80vh; /* Adjust the vertical position as needed */
  left: 65vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;
const Title = styled.h1`
  position: absolute;
  top: 15vh;
  left: 32vw;
  font-size: calc(2vh + 2vw);
  font-weight: bold;
  color: #000; /* Updated color to black */
  text-shadow: 
    0px 0px 15px rgba(128, 128, 128, 0.9),
    0px 0px 30px rgba(128, 128, 128, 0.8),
    0px 0px 45px rgba(128, 128, 128, 0.7),
    0px 0px 60px rgba(128, 128, 128, 0.6),
    0px 0px 75px rgba(128, 128, 128, 0.5),
    0px 0px 90px rgba(128, 128, 128, 0.4);
  &:hover {
    color: red;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }
`;
const Text = styled.p`
  position: absolute;
  top: 23vh;
  left: 32vw;
  font-size: calc(1vh + 1vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }
`;
const shadowAnimation = keyframes`
  0% {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0px 0px 70px rgba(0, 255, 0, 0.5);
  }
  100% {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
  }
`;
const ImageContainer = styled.div`
position: absolute;
top: 30vh;
left: 40vw;
  width: calc(14vw + 14vh);
  max-width: calc(20vw + 20vh);
  height: auto;
  max-height: auto;
  border: 2px solid #000;
  animation: ${shadowAnimation} 3s infinite alternate; /* Apply the animation to the shadow only */
`;
const Image = styled.img`
  max-width: 100%;
  height: auto;
  border: 2px solid #0000;
  box-shadow: 0px 0px 180px rgba(0, 102, 255, 0.3);
`;
const ButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px #0F0F0F;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(.7vw + .7vh);
  margin: 0 20px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #FFFF00;
    color: white;
  }
`;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.hoverover = new Howl({ src: HoverSound,
    volume: 0.5 });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });
    // You can access props using this.props here or initialize state if needed
  }
  HoverOverPlay = () => {
    this.hoverover.play();
}
  clickPlay = () => {
      this.click.play();
  }
  handleMint = () => {
    const { onButtonClick } = this.props;
    if (typeof onButtonClick === 'function') {
      onButtonClick('Mint');
    }
  };
  handleFight = () => {
    const { onButtonClick } = this.props;
    if (typeof onButtonClick === 'function') {
      onButtonClick('Fight');
    }
  };
  handleRead = () => {
    const { onButtonClick } = this.props;
    if (typeof onButtonClick === 'function') {
      onButtonClick('Read'); 
    }
  };
  handleShop = () => {
    const { onButtonClick } = this.props;
    if (typeof onButtonClick === 'function') {
      onButtonClick('Shop'); 
    }
  };
  handleStake = () => {
    const { onButtonClick } = this.props;
    if (typeof onButtonClick === 'function') {
      onButtonClick('Stake'); 
    }
  }
  render() {
    return (
      
      <div>
        <div><Title>HUNGER GAMES</Title></div>
        <Container>
          
        {/* Add the additional text here */}
        <Text>
          $HGMS 0x0000000000000000
        </Text>
          <ImageContainer>
            <Image src={NFTImage} alt="NFT" />
          </ImageContainer>
          <MintButtonContainer><ButtonElement onClick={() => {
                          this.handleMint();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Mint</ButtonElement></MintButtonContainer>
          <ShopButtonContainer><ButtonElement onClick={() => {
                          this.handleShop();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Shop</ButtonElement></ShopButtonContainer>
         <FightButtonContainer><ButtonElement onClick={() => {
                          this.handleFight();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Fight</ButtonElement></FightButtonContainer>
          <ReadMeButtonContainer><ButtonElement onClick={() => {
                          this.handleRead();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Read</ButtonElement></ReadMeButtonContainer>
        
         </Container>
       
        
        
      </div>
    );
  }
}

export default LandingPage;

