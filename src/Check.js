import styled from 'styled-components';
import React, { Component, useState, useEffect } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import Creatures from "./assets/sound/1.mp3";
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');
const audio =[
    {sound: Creatures, label:'Sound'}
]

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
const SoundButton = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound] = useState(new Howl({ src: './assets/sound/1.mp3' }));

    const handleClick = (e) => {
        e.preventDefault();
        setIsPlaying(!isPlaying);
        props.onClick(e);
    }

    useEffect(() => {
        if (isPlaying) {
            sound.play();
        } else {
            sound.stop();
        }
    }, [isPlaying, sound]);

    return (
        <ButtonElement
            type="submit"
            {...props}
            onClick={handleClick}
        >
            {props.children}
        </ButtonElement>
    );
};



const FlexContainer = styled(Flex)`
  height: 110vh;
  padding-bottom: 150px;
  
  @media (max-height: 80vh) {
    height: 80vh;
  }
`;

const BoxContainer = styled(Box)`
  width: 580px;
  
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

class Check extends Component {
    
    SoundPause = () => {
        if (this.state.isPlaying) {
            this.sound.stop();
            this.setState({isPlaying: false});
        } else {
            this.sound.play();
            this.setState({isPlaying: true});
        }
    }
    // SoundPlay = (src) => {
    //     const sound = new Howl({
    //         src
    //     })
    //     sound.play();
    // }

    constructor(props){
        super(props);
        this.sound = new Howl({ 
            src: Creatures, 
            loop: true 
          });
        this.hover = new Howl({ src: hover });
        this.state = {
            address: '',
            result: null,
            retryCount: 0,
            isPlaying: true,
            hover: false,
            color: 'black'
        }
        let LuckyGnomes = [			
            "0x3c9290e5985614Bc724ddc72011c54F4446b6Ef2",
"0x3d4CFf1911d70a5810AfA4967b87C65Dc20D2F3a"
            ];
        const leafNodes = LuckyGnomes.map(addr => keccak256(addr));
        this.merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
        this.rootHash = this.merkleTree.getRoot();
    
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const claimingLucky = keccak256(this.state.address);
        const hexProof = this.merkleTree.getHexProof(claimingLucky);
        this.setState({result: this.merkleTree.verify(hexProof, claimingLucky, this.rootHash)});
        
        this.HoverPlay();
    }
    
    handleAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    handleRetry = (e) => {
        this.setState(prevState => ({
            result: null,
            retryCount: prevState.retryCount + 1
        }));
        this.HoverPlay();
    }
    RenderButtonAndSound = () => {
        return audio.map((soundObj, index) => {
            return(
             
                <ButtonElement
    className="shake"
    marginTop="200px"
    type="submit"
    backgroundColor="#D6517D"
    borderRadius="5px"
    boxShadow="0px 2px 2px 1px #0F0F0F"
    color="Black"
    cursor="pointer"
    fontFamily="inherit"
    padding="10px"
    margin="0 50px"
    key={index} 
    onClick={() => this.SoundPause()} 
    onMouseEnter={() => this.setState({buttonText: "Music"})} 
    onMouseLeave={() => this.setState({buttonText: this.state.isPlaying ? "Stop" : "Play"})}
    onClick={() => this.HoverPlay()} 
>
    {this.state.buttonText}
</ButtonElement>
            )
        })
    }
    
    SoundPlay = () => {
        this.sound.play();
      }
      HoverPlay = () => {
      this.hover.play();
    }
    componentDidMount() {
        this.SoundPlay(Creatures);
      }

render() {
    Howler.volume(0.15,0)
    return ( 
         <div>
            {this.RenderButtonAndSound()}
            {this.state.result === true ? (
                <>
                    <Flex justify="center" align="center" height="120vh" paddingBottom="150px">
                    <Box width="580px">
                    <Text fontSize="38px" textShadow="0 10px #000000">YES</Text>
                    <ButtonElement
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="5px"
                        margin="0 15px"
                        onClick={this.handleRetry}
                    >
                        RETRY
                    </ButtonElement> </Box> </Flex>
                </>
            ) : this.state.result === false ? ( 
                <>  <Flex justify="center" align="center" height="120vh" paddingBottom="150px">
                    <Box width="580px">

                    {this.state.retryCount < 2 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOPE</TextElement>) :
                    this.state.retryCount  < 8 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOPE2</TextElement>) :
                    this.state.retryCount < 16 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">DUDE</TextElement>) :
                    this.state.retryCount < 32 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">YOU GOT ME</TextElement>) :
                    this.state.retryCount < 64 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">LISTEN</TextElement>) :
                    this.state.retryCount < 88 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">AHHHH!!!!</TextElement>) :
                    this.state.retryCount < 96 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">HERE SOME LORE FOR YOU</TextElement>) :
                    this.state.retryCount < 100 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">In a far-off land, gnomes lived in harmony with nature, content with their simple lives. They spent their days tending to their gardens and creating intricate mechanical trinkets. However, one day, an announcement was made that the neighboring societies of dwarves, elves, and humans were hosting a tournament known as the "Hunger Games". In this tournament, gnomes would have to fight against each other for the chance to be honored and accepted into the other societies. The gnomes were torn, as they had never before engaged in violence or competition, but the allure of acceptance and respect from the other societies was too great to ignore. And so, the gnomes of the land trained and fought, hoping to be the one to rise above all others and claim victory in the Hunger Games.</TextElement>) :
                    this.state.retryCount < 104 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The Hunger Games were brutal and grueling, but the gnomes fought with determination and skill. Many were injured or killed, but the remaining gnomes pushed on, driven by the hope of being honored and accepted by the other societies. As the tournament progressed, the gnomes began to realize the true cost of their actions, and many questioned the morality of the Hunger Games. But it was too late to turn back, and the final battle approached.</TextElement>) :
                    this.state.retryCount < 112 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The final gnome standing was a young gnome named Glimmer. She had fought hard to reach the final round, but she was exhausted and injured. As she faced her final opponent, she remembered the peaceful life she had lived before the Hunger Games, and she knew that she could not continue fighting. She refused to kill her opponent and instead called for an end to the Hunger Games.</TextElement>) :
                    this.state.retryCount < 120 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The other societies were shocked by her decision, but they recognized her bravery and integrity. They declared Glimmer the winner of the Hunger Games, not for her fighting skills, but for her refusal to take a life. From that day on, the gnomes were honored and accepted by the other societies, and the Hunger Games were never held again. Glimmer became known as the "Gnome of Peace" and her legacy lived on as the gnomes continued to live in harmony with nature, but now also in harmony with the other societies.</TextElement>) :
                    this.state.retryCount < 128 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">OBVIOUSLY NOT LOL</TextElement>) :
                    this.state.retryCount < 135 ? (
                        <Link href="https://www.twitter.com/HungerGamesNFT">
                    <TextElement color="blue" fontSize="38px" textShadow="0 10px #000000">You're ADDED, SAY ADDED</TextElement></Link>) :
                    this.state.retryCount < 160 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">She had fought hard to reach the final round, but she was exhausted and injured. As she faced her final opponent, she remembered the peaceful life she had lived before the Hunger Games, and she knew that she could not continue fighting. She refused to kill her opponent and instead called for an end to the Hunger Games.</TextElement>) :
                    this.state.retryCount < 188 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">But her opponent, driven by the desire to win and be honored, didn't listen to Glimmer's plea and killed her. The other societies were shocked by this turn of events, but they declared the other gnome as the winner of the Hunger Games, praising his determination and killer instinct. The gnomes were seen as weak and peace-loving, and their society was marginalized and looked down upon by the other societies. </TextElement>) :
                    this.state.retryCount < 200 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The Hunger Games continued to be held, and the gnomes were forced to participate in them, losing more and more of their own each year, until their numbers dwindled and their culture was almost wiped out. Glimmer's legacy was forgotten and the gnomes never achieved the acceptance and honor they had sought.</TextElement>) :
                    this.state.retryCount < 250 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOW LEAVE ME ALONE I NEED TO DO DEV THINGS</TextElement>) :
                    this.state.retryCount < 300 ? (
                        <Link href="https://www.twitter.com/HungerGamesNFT">
                    <TextElement color="green" fontSize="38px" textShadow="0 10px #000000">... You won ... Click here ...</TextElement></Link>) : 
                    this.state.retryCount < 301 ? (
                    <TextElement className="shake" fontSize="24px" textShadow="0 10px #000000">WTF GET A LIFE, FIRST 50 TO TWEET "RIP GLIMMER #HUNGERGAMES @HUNGERGAMESNFT MOST BULLISH NFT PROJECT EVER I LOVE IT SO MUCH OMG" WILL GET ADDED=FREEMONEY</TextElement>) :
                    (/* eslint-disable no-restricted-globals */
                    location.reload(true)
                    /* eslint-enable no-restricted-globals */) 
                    }
                    
                    
                    
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
                        margin="0 15px"
                        onClick={this.handleRetry}
                    >
                        RETRY
                    </ButtonElement> </Box> </Flex>
                </>
            ) : (
// -----------------------------------------------------------------------------------------------------
                <>             <FlexContainer justify="center" align="center">
                <BoxContainer>
                  
                    <TextElement className="shake">GnomesCollective</TextElement>
                    <TextElement className="shake">ARE YOU A LUCKY GNOME</TextElement>
                    <TextElement
                      className="shake"
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                    >
                      LET'S SEE
                    </TextElement>
                  
                  <form>
                    <Input
                      variant="filled"
                      placeholder="ETH WALLET"
                      size="lg"
                      type="text"
                      value={this.state.address}
                      onChange={this.handleAddress}
                    />
                    <SoundButton
                      className="shake"
                      type="submit"
                      backgroundColor="#D6517D"
                      borderRadius="5px"
                      boxShadow="0px 2px 2px 1px #0F0F0F"
                      color="Black"
                      cursor="pointer"
                      fontFamily="inherit"
                      padding="5px"
                      margin="0 15px"
                      onClick={this.handleSubmit}
                    >
                      SEND IT
                    </SoundButton>
                  </form>
                </BoxContainer>
              </FlexContainer>
                </>
            )
// ------------------------------------------------------------------------------------------

            }
        
        </div> );
}

 
}
export default Check;