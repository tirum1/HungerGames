
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
top: 90vh;
left: 50vw;
transform: translate(-50%, -50%);
`;
const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  color: #0000ff; /* U
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
const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
  border: 5px solid #00008f;
  box-shadow: 0px 0px 20px rgba(0, 102, 255, 0.3);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border: 2px solid #0000;
  box-shadow: 0px 0px 20px rgba(0, 102, 255, 0.3);
`;
const ButtonElement = styled.button`
  background-color: #0066ff;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px #0F0F0F;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(.7vw + .7vh);
  margin: 0 15px;
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
    this.hoverover = new Howl({ src: HoverSound });
    this.click = new Howl({ src: clickSound });
    // You can access props using this.props here or initialize state if needed
  }
  HoverOverPlay = () => {
    this.hoverover.play();
}
clickPlay = () => {
    this.click.play();
}
  handleMint = () => {
    // Access props here
    const { onButtonClick } = this.props;

    // Handle minting logic
    console.log('Minting...');

    // Invoke the onButtonClick prop if provided
    if (typeof onButtonClick === 'function') {
      onButtonClick();
    }
  };
  render() {
    return (
      <div>
        <Container>
          <Title>#0066FF</Title>
        
          <ImageContainer>
            <Image src={NFTImage} alt="NFT" />
          </ImageContainer>
          <Description className="shake" color="green" fontSize="calc(2vh + 2vw)">
        In the shadows of existence, every creation emerges with a purpose shrouded in enigma. In a world of diverse perceptions, some see waste while others perceive it as a profound canvas embodying the collective's emotions.
      </Description>
          <MintButtonContainer><ButtonElement onClick={() => {
                          this.handleMint();
                          this.clickPlay();
                        } }onMouseEnter={this.HoverOverPlay}>Mint</ButtonElement></MintButtonContainer>
        </Container>
      </div>
    );
  }
}

export default LandingPage;

