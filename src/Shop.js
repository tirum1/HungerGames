import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl, Howler } from 'howler';
import HoverSound from './assets/sound/click-21156.mp3';
import backgroundImage from './assets/background/Unbenannt-3.png';
import XTRAIMAGE from './assets/Items/Download.png';
import clickSound from './assets/sound/hover.mp3';


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
  font-size: calc(1.1vh + 1.1vw);
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
const TextHGMS = styled.p`
  font-size: calc(1vh + 1vw);
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
const TextPOTIONS = styled.p`
  font-size: calc(1vh + 1vw);
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

class Shop extends Component {
  constructor(props) {
    super(props);
    this.hoverover = new Howl({
      src: HoverSound,
      volume: 0.5,
    });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });
    }

  HoverOverPlay = () => {
    this.hoverover.play();
  };

  clickPlay = () => {
    this.click.play();
};

render() {
    return (
      <div>
        <Text>BALANCE</Text>
        <TextHGMS>X $HGMS</TextHGMS>
        <TextPOTIONS>X XTRA POTIONS </TextPOTIONS>
        <Text2>XTRA POTION</Text2>
        <Title>SHOP</Title>
          <Image src={backgroundImage} alt="Image Description" />
          <ItemImage src={XTRAIMAGE}  />
        <BackButtonContainer>
          <ButtonElement
            className="shake"
            onClick={() => {
              this.clickPlay();
              this.props.onButtonClick('LandingPage');
            }}
            onMouseEnter={this.HoverOverPlay}
          >
            Back
          </ButtonElement>
        </BackButtonContainer>
        </div>
    );
  }
}

export default Shop;






