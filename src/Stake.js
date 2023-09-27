import React, { Component } from 'react';
import styled from 'styled-components';
import Character from './assets/characters/nobg.png';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import LandingPage from "./LandingPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const TitleContainer = styled.div`
text-align: center;
`;
const MintButtonContainer = styled.div`
  position: absolute;
  top: 98vh; /* Adjust the vertical position as needed */
  left: 50vw;
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
const FightText = styled.p`
  font-size: calc(.7vh + .7vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    color: red;
  }
`;
const BlackText = styled.span`
  color: black; /* Set the text color to black */
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ensure the container takes the full viewport height */
`;

const ImageContainer = styled.div`
  width: calc(10vw + 10vh);
  height: calc(10vw + 10vh);
  max-width: calc(20vw + 20vh);
  max-height: calc(20vw + 20vh);



  /* Center the content */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%; /* To make the image circular */
`;


const BackButtonContainer = styled.div`
position: absolute;
top: 80vh;
left: 80vw;
transform: translate(-50%, -50%);
`;
const NextButtonContainer = styled.div`
position: absolute;
top: 80vh;
left: 60vw;
transform: translate(-50%, -50%);
`;
const PrevButtonContainer = styled.div`
position: absolute;
top: 80vh;
left: 40vw;
transform: translate(-50%, -50%);
`;

const TextContainer = styled.div`
  
  top: 4; /* Adjust the top position as needed */
  left: 2; /* Adjust the left position as needed */
  right: 1; /* Adjust the right position as needed */
  bottom: 0; /* Adjust the bottom position as needed */
  
  
  text-align: right; /* Align text to the left */
  z-index: 0; /* Place the text container above the image */
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

class Read extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentComponent: "Page0"
      }
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
  handlePage = (PageName) => {
    this.setState({ currentComponent: PageName }, () => {
      console.log(this.state.currentComponent);
    });
  }
    render() {
        return (
            <div>
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
  
  export default Read;
  
  