
import React, { Component } from 'react';
import styled from 'styled-components';
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
  top: 98vh; /* Adjust the vertical position as needed */
  left: 50vw;
  transform: translate(-50%, -50%);
`;

const PlayButtonContainer = styled.div`
  position: absolute;
  top: 98vh; /* Adjust the vertical position as needed */
  left: calc(50vw - (10vw + 10vh)); /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;

const ReadMeButtonContainer = styled.div`
  position: absolute;
  top: 98vh; /* Adjust the vertical position as needed */
  left: calc(50vw + (10vw + 10vh)); /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;


const Title = styled.h1`
  font-size: calc(2vh + 2vw);
  font-weight: bold;
  color: #0000; /* U
  pdated color to black */
  margin-bottom: 15px;
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
  font-size: calc(1vh + 1vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }
`;
const ImageContainer = styled.div`
  width: calc(20vw + 20vh); /* Adjust the size as needed */
  max-width: calc(20vw + 20vh); /* Adjust the size as needed */
  height: auto;
  max-height: auto;
  border: 2px solid #000;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;



const Image = styled.img`
  max-width: 100%;
  height: auto;
  border: 2px solid #0000;
  box-shadow: 0px 0px 20px rgba(0, 102, 255, 0.3);
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
  
  render() {
    return (
      
      <div>
        <Container>
          <Title>HUNGER GAMES</Title>
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
          <PlayButtonContainer><ButtonElement onClick={() => {
                          this.handleFight();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Fight</ButtonElement></PlayButtonContainer>
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

