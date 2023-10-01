import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl} from 'howler';
import HoverSound from './assets/sound/click-21156.mp3';
import backgroundImage from './assets/background/Unbenannt-3.png';
import XTRAIMAGE from './assets/Items/1.png';
import SKIPIMAGE from './assets/Items/2.png';
import BOOSTIMAGE from './assets/Items/3.png';
import VIMAGE from './assets/Items/4.png';
import clickSound from './assets/sound/hover.mp3';
import "./App.css";


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
  const IncButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 55.5vw;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const DecButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 37.5%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const DepButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 63vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const BalButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 50vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
    box-shadow: 0px 2px 2px 1px #ffff00;
    color: white;
    }
  }`;
  const ApplyButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 70vh;
  left: 18%;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  color: black;
  cursor: pointer;
  font-family: inherit;
  padding: calc(0.7vw + 0.7vh);
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

const DescText = styled.p`
font-size: calc(.6vh + .6vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 65%;
  white-space: pre-line;

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
const PriceText = styled.p`
  font-size: calc(1vh + 1vw);
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 42%;
  white-space: pre-line;
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
      this.state = {

        isConnected: Boolean(this.props.accounts[0]),
        isSwitchButton: false,
        networkId: null,
        supportedNetworkId: 5,
      };
      this.hgmsAmountRef = React.createRef();
      this.ethAmountRef = React.createRef();


      this.hoverover = new Howl({
        src: HoverSound,
        volume: 0.5,
      });
      this.click = new Howl({
        src: clickSound,
        volume: 0.3,
      });
    }
  
    handleApplyClick = async () => {
      this.toggleApplyModal();
    };
  
    handleDeposit = () => {
      this.toggleDepositModal()
    }
  
    handleBalance = () => {
      this.toggleBalanceModal()
    }
  
    handleIncrement = () => {
        if (this.state.currentItem === "XTRA") {
          this.setState({ currentItem: "SKIP" });
        }
        if (this.state.currentItem === "SKIP") {
            this.setState({ currentItem: "BOOST" });
          }
        if (this.state.currentItem === "BOOST") {
            this.setState({ currentItem: "V" });
          }
        if (this.state.currentItem === "V") {
            this.setState({ currentItem: "XTRA" });
          }
      };

    handleDecrement = () => {
        if (this.state.currentItem === "SKIP") {
          this.setState({ currentItem: "XTRA" });
        }
        if (this.state.currentItem === "XTRA") {
            this.setState({ currentItem: "V" });
          }
        if (this.state.currentItem === "BOOST") {
            this.setState({ currentItem: "SKIP" });
        }
        if (this.state.currentItem === "V") {
            this.setState({ currentItem: "BOOST" });
          }
      };
  
    HoverOverPlay = () => {
      this.hoverover.play();
    };
  
    clickPlay = () => {
      this.click.play();
    };
  
   
    handleNetwork = async () => {
        const { ethereum } = window;
        if (!ethereum) {
          console.error("MetaMask is not installed or not connected");
          return;
        }

        try {
          const networkId = this.state.supportedNetworkId;
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${networkId.toString(16)}` }],
          });
        } catch (error) {
          console.error(error);
        }
      };
    connectAccount = async () => {
        if (!window.ethereum) {
          console.log("MetaMask is not installed or not connected");
          return;
        }

        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (accounts.length === 0) {
            console.log("User denied account access");
            return;
          }

          const selectedAccount = accounts[0]; 

          this.props.setAccounts(accounts);
          this.setState({ isConnected: Boolean(selectedAccount) }, () => {
            console.log("Connected Address:", selectedAccount);
          });
        } catch (error) {
          console.error(error);
        }
      };
  

    render() {
        const { isConnected, isSwitchButton } = this.state;


    
        return (
          <div>
            <Title>SHOP</Title>
            <Image src={backgroundImage} alt="Image Description" />
    
            {isConnected && !isSwitchButton ? (<div>
            <BalButtonElement onClick={this.handleBalance} onMouseEnter={this.HoverOverPlay}>Balance</BalButtonElement>
            <DepButtonElement onClick={this.handleDeposit} onMouseEnter={this.HoverOverPlay}>Deposit</DepButtonElement>
            </div>
          ) : (
            <DepButtonElement onClick={isConnected ? this.handleNetwork : this.connectAccount}>
              {isConnected ? "Switch Network" : "Connect"}
            </DepButtonElement>
          )}
            <ApplyButtonElement
                onClick={() => {
                    this.handleApplyClick();
                }}
                onMouseEnter={this.HoverOverPlay}
            >
                Apply
            </ApplyButtonElement>
    

            {this.state.currentItem === "XTRA" && (
            <div>
                <ItemImage src={XTRAIMAGE} />
                <Text2>XTRA POTION</Text2>
                <PriceText>15k $HGMS {"\n"} 0.001 $ETH</PriceText>
                <IncButtonElement
                onClick={() => {
                    this.clickPlay();
                    this.handleIncrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >
                {">"}
                </IncButtonElement>
                <DecButtonElement
                onClick={() => {
                    this.clickPlay();
                    this.handleDecrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >
                {"<"}
                </DecButtonElement>
                <DescText>Anti Death</DescText>
            </div>
            )}
    
            {this.state.currentItem === "SKIP" && (
            <div>
                <ItemImage src={SKIPIMAGE} />
                <Text2>SKIP POTION</Text2>
                <PriceText>10k $HGMS {"\n"} 0 $ETH</PriceText>
                <IncButtonElement onClick={() => {
                this.clickPlay();
                this.handleIncrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{">"}</IncButtonElement>
                <DecButtonElement onClick={() => {
                this.clickPlay();
                this.handleDecrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{"<"}</DecButtonElement>
                <DescText>Skip Fight</DescText>
            </div>
            )}
    
            {this.state.currentItem === "BOOST" && (
            <div>
                <ItemImage src={BOOSTIMAGE} />
                <Text2>BOOST POTION</Text2>
                <PriceText>5k $HGMS {"\n"} 0 $ETH</PriceText>
                <IncButtonElement onClick={() => {
                this.clickPlay();
                this.handleIncrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{">"}</IncButtonElement>
                <DecButtonElement onClick={() => {
                this.clickPlay();
                this.handleDecrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{"<"}</DecButtonElement>
                <DescText>Boost 2 Random Stats</DescText>
            </div>
            )}
    
            {this.state.currentItem === "V" && (
            <div>
                <ItemImage src={VIMAGE} />
                <Text2>V POTION</Text2>
                <PriceText>20k $HGMS {"\n"} 0.002 $ETH</PriceText>
                <IncButtonElement onClick={() => {
                this.clickPlay();
                this.handleIncrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{">"}</IncButtonElement>
                <DecButtonElement onClick={() => {
                this.clickPlay();
                this.handleDecrement();
                }}
                onMouseEnter={this.HoverOverPlay}
                >{"<"}</DecButtonElement>
                <DescText>
                Boost All Stats &
                {"\n"}
                Anti Skip
                </DescText>
            </div>
            )}
           

    
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