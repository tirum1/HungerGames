import styled from 'styled-components';
import React, { Component } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const FlexContainer = styled(Flex)`
  height: 110vh;
  padding-bottom: 150px;
  
  @media (max-height: 80vh) {
    height: 80vh;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextElement = styled(Text)`

  text-shadow: 0 10px #000000;
  text-align: center;
  &:hover {
    color: red;
  }
`;

const ButtonContainer = styled.div`
position: absolute;
top: 60%;
left: 50%;
transform: translate(-50%, -50%);
`;
const ButtonContainer2 = styled.div`
position: absolute;
top: 70%;
left: 50%;
transform: translate(-50%, -50%);
`;
const ButtonContainer3 = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const ButtonElement = styled.button`
background-color: #D6517D;
border-radius: 5px;
box-shadow: 0px 2px 2px 1px #0F0F0F;
color: black;
cursor: pointer;
font-family: inherit;
padding: calc(0.5vw + 0.5vh);
transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #FFFF00;
    color: white;
  }
`;

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.hover = new Howl({ src: hover });
        this.hoverover = new Howl({ src: HoverSound });
        this.state = {
            result: null,
            hover: false,
        }
    }

handleSubmit = (e) => {
    e.preventDefault();
    this.HoverPlay();
}
SoundPlay = () => {
    this.sound.play();
  }
  HoverPlay = () => {
  this.hover.play();
}
HoverOverPlay = () => {
    this.hoverover.play();
  }

  render() {
    Howler.volume(0.15,0)
    return ( <div>
         <div>
             <TextContainer>
                    <TextElement fontSize="calc(2vh + 2vw)" className ="shake" textShadow="0 10px #000000">What is to come?</TextElement>
                    </TextContainer>
            </div>
            <div>
                    <ButtonContainer>
                    <ButtonElement
                        className='shake'
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        onMouseEnter={() => { this.HoverOverPlay() }}
                        onClick={this.props.onButtonClick}>CHECK WHITELIST
                    </ButtonElement>
                    </ButtonContainer>
                    <ButtonContainer2>
                    <ButtonElement
                        className='shake'
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        onMouseEnter={() => { this.HoverOverPlay() }}
                        onClick={this.props.onWhitepaperButtonClick}>WHITEPAPER
                    </ButtonElement>
                    </ButtonContainer2>
                    <ButtonContainer3>
                    <ButtonElement
                        className='shake'
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        onMouseEnter={() => { this.HoverOverPlay() }}
                        onClick={this.props.onMintButtonClick}>MINT
                    </ButtonElement>
                    </ButtonContainer3>

         

        </div></div>
    )
}


}

export default LandingPage;