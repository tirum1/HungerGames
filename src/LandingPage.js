
import React, { Component } from 'react';
import styled, { keyframes }  from 'styled-components';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import BookButton from './assets/Items/Book Button.gif';
import BookStill from './assets/Items/Book Still.png';
import BookDown from './assets/Items/Book Pressed.png';
import SwordStill from './assets/Items/Sword Still.png';
import SwordButton from './assets/Items/Sword Button.gif';
import SwordDown from './assets/Items/Sword Pressed.png';
import CoinSpin from "./assets/Items/Coin HD.gif";


const size = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
  tv: `(min-width: ${parseInt(size.desktop) + 1}px)`
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media ${device.mobile} {
    align-items: center;
  }
`;
const MintButtonContainer = styled.div`
  position: absolute;
  top: 50vh; /* Adjust the vertical position as needed */
  left: 45vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
  /* For viewport widths between 0px and 320px */
  @media (max-width: 320px) {
    margin: 10px;
    top: 70vh;
    left: 50vw;
    width: 80px;
    height: 80px;
  }
  
  @media (min-width: 321px) and (max-width: 10000px) {
    margin: 10px;
    top: 60vh;
    left: 25vw;
    width: 80px;
    height: 80px;
  }

`;

const Title = styled.h1`
  position: absolute;
  top: 25vh;
  left: 50%; /* Center the title horizontally */
  transform: translateX(-50%); /* Center the title horizontally */
  font-size: calc(1.8vh + 1.8vw);
  font-weight: bold;
  color: #000; /* Updated color to black */
  
  &:hover {
    color: red;
  }

  @media (max-width: 320px) {
  display: none;
  }

  @media (min-width: 321px) and (max-width: 768px)  {
    top: 25vh;
    left: 50%; /* Center the title horizontally on tablets */
    transform: translateX(-50%); /* Center the title horizontally */
    font-size: calc(1.1vh + 1.1vw);
  }
`;

const Text = styled.p`
  position: absolute;
  top: 35vh;
  left: 32vw;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }

  @media ${device.tablet} {
    top: 70vh;
    left: 37vw;
  }


`;
const BATTLEText = styled.p`
  position: absolute;
  top: 35vh;
  left: 60vw;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }
  @media ${device.tablet} {
    top: 80vh;
    left: 37vw;
  }
`;
const SwordElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  img {
    width: 100%;
    height: auto;
  }

  /* For viewport widths between 0px and 320px */
  @media (min-width: 0px) and (max-width: 320px) {
    margin: 10px;
    top: 25vh;
    left: 50vw;
    width: 80px;
    height: 80px;
  }
  
  /* For viewport widths between 321px and 480px */
  @media (min-width: 321px) and (max-width: 1200px) {
    margin: 10px;
    top: 40vh;
    left: 25vw;
    width: 80px;
    height: 80px;
  }
  @media (min-width: 1201px) {
    margin: 10px;
    top: 40vh;
    left: 25vw;
    width: 80px;
    height: 80px;
  }

`;
const CoinButtonContainer = styled.div`
  position: absolute;
  top: 50vh; /* Adjust the vertical position as needed */
  left: 65vw; /* Adjust the value as needed */
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  img {
    width: 60px; /* Set the width to the desired size */
    height: auto; /* Automatically adjust the height */
  }

  /* Add media queries here if needed */
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

  /* For viewport widths between 0px and 320px */
  @media (min-width: 0px) and (max-width: 320px) {
    margin: 10px;
    top: 40vh;
    left: 50vw;
    width: 80px;
    height: 80px;
  }
  
  @media (min-width: 321px) and (max-width: 10000px) {
    margin: 10px;
    top: 40vh;
    left: 70vw;
    width: 80px;
    height: 80px;
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
  @media (min-width: 0px) and (max-width: 320px) {
    display: none;
  }
  @media (min-width: 321px) and (max-width: 10000px) {
    display: none; /* Hide the title on mobile screens */
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
  @media (min-width: 0px) and (max-width: 320px) {
    display: none;
  }
  @media (min-width: 321px) and (max-width: 10000px) {
    display: none; /* Hide the title on mobile screens */
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
  @media ${device.mobile} {
    margin: 10px;
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
    onButtonClick('LeaderBoard'); 
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


          {/* <SwordElement 
              onMouseDown={this.handleFightMouseDown}
              onMouseUp={this.handleFightMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.fightImage} alt="Fight" />
          </SwordElement> */}
          <CoinButtonContainer onClick={this.handleShop}>
            <img src={CoinSpin} alt="Shop" />
          </CoinButtonContainer>
          {/* <BookElement 
              onMouseDown={this.handleBookMouseDown}
              onMouseUp={this.handleBookMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.readImage} alt="Book" />

          </BookElement> */}

        </Container>
      </div>
    );
}

}

export default LandingPage;

