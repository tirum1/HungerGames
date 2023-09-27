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
                 {this.state.currentComponent === "Page0" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Gnomes Collective
                    </Title>
                  </TitleContainer>
                 <Text>Hungergames, pioneered by the Gnomes, brings the excitement of battle royale to the blockchain. Inspired by the thrill of competition and bloody fights</Text>
                 <Text>Join us for the ultimate ERC20 + ERC721 experience where the weak can beat the strong, and the market doesn't control your destiny.</Text>
                  <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page1");
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                </div>
              )}
              {this.state.currentComponent === "Page1" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Tokenomics
                    </Title>
                  </TitleContainer>
                  <Text>
                     1B $HGMS
                  </Text>
                  <Text>
                     3/3 
                  </Text>
                  <Text>
                    {"1 - > Prizepool "}
                  </Text>
                  <Text>
                  {" 1 - > Marketing "}
                  </Text>
                  <Text>
                   {" 1 - > Maintanance "}
                  </Text>
                  <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page2");
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page0"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
        
              {this.state.currentComponent === "Page2" && (
                <div>
                  <TitleContainer>
                    <Title>
                      NFT
                    </Title>
                  </TitleContainer>
                
                  <ImageContainer>
                    <TextContainer>
                        <Text>Random Stats</Text>
                    </TextContainer>
                    <Image src={Character} alt="Image Description" />
                    </ImageContainer>

                  <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page3"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page1"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
               {this.state.currentComponent === "Page3" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Arena
                    </Title>
                  </TitleContainer>
                
                  
                    <TextContainer>
                    <Text>2888 Contestants</Text>
                        <Text>1v1 PVP Fight</Text>
                        <Text>1 loss = Death</Text>
                        <Text>1 Winner</Text>
                    </TextContainer>
                    

                  <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page4"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page2"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
               {this.state.currentComponent === "Page4" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Fight
                    </Title>
                  </TitleContainer>
            
                    <TextContainer>
                    <FightText> Total Power <BlackText>(P) </BlackText>= Attack + Defense + Intelligence + Special + HP </FightText>
                    <FightText> Chance of Winning <BlackText>(COW) </BlackText>= P1 / (P1 + P2)</FightText>
                    <FightText> Random Factor <BlackText>(RF) </BlackText>= Random number between 0 and 1</FightText>
                    <FightText> Adjusted Chance of Winning <BlackText>(ACOW) </BlackText>= COW1 * RF1</FightText>
                    <FightText> Adjusted Chance of Winning <BlackText>(ACOW)</BlackText> = COW2 * RF2</FightText>
                    
                    </TextContainer>
                    

                  <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page5"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page3"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
              {this.state.currentComponent === "Page5" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Mint
                    </Title>
                  </TitleContainer>
            
                    <TextContainer>
                    <Text>NFT Price = 100k $HGMS + 0.006 ETH</Text>
                    <Text>{"$HGMS Tokens -> Burned"} </Text>
                    <Text>{"$ETH -> Maintanance"}</Text>
                    <Text>Rince & Repeat!</Text>
                    </TextContainer>
                    <NextButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page6"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Next
                    </ButtonElement>
                  </NextButtonContainer>
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page4"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
                            {this.state.currentComponent === "Page6" && (
                <div>
                  <TitleContainer>
                    <Title>
                      Shop
                    </Title>
                  </TitleContainer>
            
                    <TextContainer>
                    <Text>Deposit $HGMS</Text>
                    <Text>Buy Items with $HGMS</Text>
                    <Text>{"All deposited $HGMS -> Burned"}</Text>
                    <Text>Rince & Repeat!</Text>
                    </TextContainer>
                   
                  <PrevButtonContainer>
                    <ButtonElement
                      onClick={() => {
                        this.clickPlay();
                        this.handlePage("Page5"); 
                      }}
                      onMouseEnter={this.HoverOverPlay}
                    >
                      Prev
                    </ButtonElement>
                  </PrevButtonContainer>
                </div>
              )}
   
            <BackButtonContainer>
                          <ButtonElement
                          className="shake"
                          onClick={() => {
                            this.clickPlay();
                            this.props.onButtonClick("LandingPage");
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
  
  