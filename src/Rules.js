import styled from 'styled-components';
import React, { Component } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const TextContainer1 = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextContainer2 = styled.div`
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TextContainer3 = styled.div`
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TextContainer4 = styled.div`
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TextContainer5 = styled.div`
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TextContainer6 = styled.div`
  position: absolute;
  top: 70%;
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
  padding: 5px;
  margin: 0 15px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #FFFF00;
    color: white;
  }
`;

class Rules extends Component {
    constructor(props){
        super(props);
        this.hoverover = new Howl({ src: HoverSound });
    }
  
render() {
     
    return ( <div>
                    <TextContainer1>
                    <TextElement fontSize="calc(1vh + 1vw)" color = "green" className ="shake" textShadow="0 10px #000000">2.888 > 70% & 30%   </TextElement>
                    </TextContainer1>
                    <TextContainer2>
                    <TextElement fontSize="calc(1vh + 1vw)" color="white" className ="shake" textShadow="0 10px #000000">Phase 1 WL</TextElement>
                    </TextContainer2>
                    <TextContainer3>
                    <TextElement fontSize="calc(1vh + 1vw)" color="orange" className ="shake" textShadow="0 10px #000000">1 Free + 1 Additional > .00888ETH </TextElement>
                    </TextContainer3>
                    <TextContainer4>
                    <TextElement fontSize="calc(1vh + 1vw)" color="white" className ="shake" textShadow="0 10px #000000">Phase 2 Public </TextElement>
                    </TextContainer4>
                    <TextContainer5>
                    <TextElement fontSize="calc(1vh + 1vw)" color="orange" className ="shake" textShadow="0 10px #000000">1 > .0111ETH </TextElement>
                    </TextContainer5>
                    <TextContainer6>
                    <TextElement fontSize="calc(1vh + 1vw)" className ="shake" textShadow="0 10px #000000"></TextElement>
                    </TextContainer6>

    
    <BackButtonContainer> 
    <ButtonElement
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
    onMouseEnter={()=>this.hoverover.play()}
    onClick={this.props.onButtonClick}>
    BACK
  </ButtonElement></BackButtonContainer>



</div>

)}

    }






export default Rules;