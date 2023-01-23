import styled from 'styled-components';
import React, { Component } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
// import Creatures from "./assets/sound/1.mp3";
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;
// const audio =[
//     {sound: Creatures, label:'Sound'}
// ]
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
const FlexContainer = styled(Flex)`
  height: 110vh;
  padding-bottom: 150px;
  
  @media (max-height: 80vh) {
    height: 80vh;
  }
`;
const BoxContainer = styled(Box)`
  width: 700px;
  
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const TextElement = styled(Text)`
  font-size: 38px;
  text-shadow: 0 10px #000000;

  &:hover{
    color:red;
 }

  @media (max-width: 50vw) {
    font-size: 24px;
  }
`;

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.hover = new Howl({ src: hover });
        this.state = {
            result: null,
            hover: false,
        }
    }


// RenderButtonAndSound = () => {
//     return audio.map((soundObj, index) => {
//         return(
         
//             <ButtonElement
// className="shake"
// marginTop="200px"
// type="submit"
// backgroundColor="#D6517D"
// borderRadius="5px"
// boxShadow="0px 2px 2px 1px #0F0F0F"
// color="Black"
// cursor="pointer"
// fontFamily="inherit"
// padding="10px"
// margin="0 50px"
// key={index} 
// onClick={() => {this.SoundPause(); this.HoverPlay()}} 
// onMouseEnter={() => this.setState({buttonText: "Music"})} 
// onMouseLeave={() => this.setState({buttonText: this.state.isPlaying ? "Stop" : "Play"})}
// >
// {this.state.buttonText}
// </ButtonElement>
//         )
//     })
// }
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
// componentDidMount() {
//     this.SoundPlay();
//   }
  render() {
    Howler.volume(0.15,0)
    return ( 
         <div>
            
              {/* {this.RenderButtonAndSound()} */}
            
            <FlexContainer justify="center" align="center">
                <BoxContainer>
                    <Text fontSize="38px" textShadow="0 10px #000000">What is to come?</Text>
                    <ButtonElement
                        className='shake'
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="5px"
                        margin="0 15px"
                        onClick={this.props.onButtonClick}>CHECK WHITELIST
                    </ButtonElement>
                </BoxContainer>
            </FlexContainer>

        </div>
    )
}


}

export default LandingPage;