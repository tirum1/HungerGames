
import React, { Component } from 'react';
import styled, { keyframes }  from 'styled-components';
import NFTImage from './assets/background/1.png';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import BookButton from './assets/Items/Book Button.gif';
import BookStill from './assets/Items/Book Still.png';
import BookDown from './assets/Items/Book Pressed.png';
import SwordStill from './assets/Items/Sword Still.png';
import SwordButton from './assets/Items/Sword Button.gif';
import SwordDown from './assets/Items/Sword Pressed.png';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const MintButtonContainer = styled.div`
  position: absolute;
  top: 50vh; /* Adjust the vertical position as needed */
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

const ShopButtonContainer = styled.div`
  position: absolute;
  top: 50vh; /* Adjust the vertical position as needed */
  left: 65vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
`;
const Title = styled.h1`
  position: absolute;
  top: 25vh;
  left: 32vw;
  font-size: calc(2vh + 2vw);
  font-weight: bold;
  color: #000; /* Updated color to black */
  
  &:hover {
    color: red;
  }
  // For left value
  @media (min-width: 2560px) {
    left: 34%;
  }
  @media (min-width: 1440px) and (max-width: 2559px) {
    left: 32%;
  }
  @media (min-width: 1024px) and (max-width: 1439px) {
    left: 40%;
  }
  @media (min-width: 844px) and (max-width: 1023px) {
    left: 42%;
  }
  @media (min-width: 768px) and (max-width: 843px) {
    left: 42%;
  }
  @media (min-width: 500px) and (max-width: 767px) {
    left: 42%;
  }
  @media (min-width: 425px) and (max-width: 499px) {
    left: 38%;
  }
  @media (min-width: 390px) and (max-width: 424px) {
    left: 15%;
    top: 30%;
  }
  @media (min-width: 375px) and (max-width: 389px) {
    left: 35%;
  }
  @media (min-width: 320px) and (max-width: 374px) {
    left: 32%;
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
  top: 35vh;
  left: 32vw;
  font-size: calc(1vh + 1vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }

`;
const BATTLEText = styled.p`
  position: absolute;
  top: 35vh;
  left: 60vw;
  font-size: calc(1vh + 1vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }

`;
const NFTText = styled.p`
  position: absolute;
  top: 35vh;
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
const SwordElement = styled.div`
  position: absolute;
  top: 50vh; 
  left: 35vw;
  width: 60px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  
  img {
    width: 100%; 
    height: auto;
  }
`;

const BookElement = styled.div`
  position: absolute;
  top: 50vh; 
  left: 55vw;
  width: 60px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  

  img {
    width: 100%; 
    height: auto;
  }
`;
const HGMSCopyIcon = styled.span`
  cursor: pointer;
  font-size: 24px; 
  position: absolute;
  top: 35vh;
  left: 32vw;

  &:hover {
    opacity: 0.8;
    color: Blue;
  }
`;
const BATTLECopyIcon = styled.span`
  cursor: pointer;
  font-size: 24px; 
  position: absolute;
  top: 35vh;
  left: 60vw;

  &:hover {
    opacity: 0.8;
    color: Blue;
  }
`;
const NFTCopyIcon = styled.span`
  cursor: pointer;
  font-size: 24px; 
  position: absolute;
  top: 35vh;
  left: 32vw;

  &:hover {
    opacity: 0.8;
    color: Blue;
  }
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
    this.state = {
        fightImage: SwordStill,
        readImage: BookStill,
        
        isMouseDown: false,
        mousedownTime: 0,
    };
    this.hoverover = new Howl({ 
      src: HoverSound,
      volume: 0.5 
    });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });

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

  componentWillUnmount() {
    if (this.fightTimeout) {
        clearTimeout(this.fightTimeout);
    }
    if (this.bookTimeout) { // Ensure you also clear the bookTimeout
        clearTimeout(this.bookTimeout);
    }
}
handleFightMouseDown = () => {
  this.setState({ 
      fightImage: SwordButton,
      mousedownTime: Date.now()
  });

  if (this.fightTimeout) {
      clearTimeout(this.fightTimeout);
  }

  this.fightTimeout = setTimeout(() => {
      if (this.state.fightImage === SwordButton) {
          this.setState({ fightImage: SwordDown });
      }
  }, 700);
};

handleFightMouseUp = () => {
  if (this.fightTimeout) {
      clearTimeout(this.fightTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ fightImage: SwordButton });
      setTimeout(() => {
          this.setState({ fightImage: SwordStill });
          this.navigateFight();
      }, 900 - elapsedTime);
  } else {
      this.setState({ fightImage: SwordStill });
      this.navigateFight();
  }
};

navigateFight = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
    onButtonClick('Fight'); 
  }
};



handleBookMouseDown = () => {
  this.setState({ 
      readImage: BookButton, // Corrected this to 'readImage'
      mousedownTime: Date.now()
  });

  if (this.bookTimeout) { // Different timeout for book actions
      clearTimeout(this.bookTimeout);
  }

  this.bookTimeout = setTimeout(() => {
      if (this.state.readImage === BookButton) { // Corrected this to 'readImage'
          this.setState({ readImage: BookDown }); // And this
      }
  }, 800);
};

handleBookMouseUp = () => {
  if (this.bookTimeout) { // Different timeout for book actions
      clearTimeout(this.bookTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ readImage: BookButton }); // Corrected this
      setTimeout(() => {
          this.setState({ readImage: BookStill }); // And this
          this.navigateBook();
      }, 900 - elapsedTime);
  } else {
      this.setState({ readImage: BookStill }); // And this too
      this.navigateBook();
  }
};

navigateBook = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
   onButtonClick('Read'); 
  }
};
copyHGMSAddress = async () => {
  const textToCopy = "0x73229e7c7d8f9276e7a69cb0cc22ec503cf9c7c6";
  try {
      await navigator.clipboard.writeText(textToCopy);
      this.setState({ copied: true });

      // Remove copied feedback after a few seconds
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
  } catch (err) {
      console.error('Failed to copy address: ', err);
  }
};
copyBATTLEAddress = async () => {
  const textToCopy = "BATTLE";
  try {
      await navigator.clipboard.writeText(textToCopy);
      this.setState({ copiedBATTLE: true });

      // Remove copied feedback after a few seconds
      setTimeout(() => {
        this.setState({ copiedBATTLE: false });
      }, 3000);
  } catch (err) {
      console.error('Failed to copy address: ', err);
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
        <Title>HUNGER GAMES</Title>
        <Container>
        {this.state.copied ? (
            <Text>Copied!</Text>
          ) : (
            <HGMSCopyIcon onClick={this.copyHGMSAddress}>$HGMS CONTRACT</HGMSCopyIcon>
          )}
           {this.state.copiedBATTLE ? (
            <BATTLEText>Copied!</BATTLEText>
          ) : (
            <BATTLECopyIcon onClick={this.copyBATTLEAddress}>BATTLECONTRACT</BATTLECopyIcon>
          )}
          <MintButtonContainer>
            <ButtonElement onClick={() => {
                            this.handleMint();
                            this.clickPlay();
                          }} 
              onMouseEnter={this.HoverOverPlay}>
              Mint
            </ButtonElement>
          </MintButtonContainer>

          <ShopButtonContainer>
            <ButtonElement onClick={() => {
                            this.handleShop();
                            this.clickPlay();
                          }} 
              onMouseEnter={this.HoverOverPlay}>
              Shop
            </ButtonElement>
          </ShopButtonContainer>

          <SwordElement 
              onMouseDown={this.handleFightMouseDown}
              onMouseUp={this.handleFightMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.fightImage} alt="Fight" />
          </SwordElement>
          <BookElement 
              onMouseDown={this.handleBookMouseDown}
              onMouseUp={this.handleBookMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.readImage} alt="Book" />

          </BookElement>

        </Container>
      </div>
    );
}

}

export default LandingPage;

