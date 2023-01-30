import styled from 'styled-components';
import React, { Component } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

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
const BackButtonContainer = styled.div`
position: absolute;
top: 75%;
left: 75%;
transform: translate(-50%, -50%);
`;
const ButtonElement = styled.button`
  background-color: #D6517D;
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
class Whitepaper extends Component {
    constructor(props){
        super(props);
    }
render() {
     
    return ( <div>

<TextContainer>
                    <TextElement fontSize="calc(2vh + 2vw)" className ="shake" textShadow="0 10px #000000">Coming Soon</TextElement>
                    </TextContainer>
                    <BackButtonContainer>  <ButtonElement
    className="shake"
    type="submit"
    backgroundColor="#D6517D"
    borderRadius="5px"
    boxShadow="0px 2px 2px 1px #0F0F0F"
    color="Black"
    cursor="pointer"
    fontFamily="inherit"
    padding="5px"
    marginRight="20px"
    marginBottom="15px"
    onMouseEnter={this.HoverOverPlay}
    onClick={this.props.onButtonClick}>
    BACK
  </ButtonElement></BackButtonContainer>



</div>

)}

    }






export default Whitepaper;