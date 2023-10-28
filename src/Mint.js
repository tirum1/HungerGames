import styled, { keyframes } from 'styled-components';
import React, { Component, useState } from 'react';
import {ethers, BigNumber} from 'ethers';
import GnomesCollective from './assets/ABI/GnomesCollective.json';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { Buffer } from "buffer/";

window.Buffer = window.Buffer || Buffer;

const GnomesCollectiveAddress = "0xF447E3a627F924EA8b064724001C484fEB39F6f9"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-right: 40px;
`;

const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: #0066ff;
  margin-bottom: 10px;
`;

const Description = styled(Text)`
  font-size: 16px;
  color: #000;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border: 5px solid #0066ff;
  box-shadow: 0px 0px 20px rgba(0, 102, 255, 0.3);
`;

const TextContainer = styled.div`
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextElement = styled(Text)`
  text-shadow: 0 2px #000000;
  text-align: center;
  font-family: ;
  font-weight: bold;
  font-size: 40px;
  &:hover {
    color: red;
  }
`;

const MintButtonContainer = styled.div`
position: absolute;
top: 63vh;
left: 50vw;
transform: translate(-50%, -50%);
`;
const BackButtonContainer = styled.div`
position: absolute;
top: 80vh;
left: 80vw;
transform: translate(-50%, -50%);
`;

const VoteButtonContainer = styled.div`
position: absolute;
top: 71vh;
left: 50vw;
transform: translate(-50%, -50%);
`;

const ConnectButtonContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const ButtonElement = styled.button`
  background-color: #0066ff;
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

class Mint extends Component {
  constructor(props) {
  super(props);
  this.state = {
  totalSupply: 10000,
  shake: false,
  mintAmount: 1,
  isConnected: Boolean(this.props.accounts[0]),
  isSwitchButton: false, 
  networkId: null,
  supportedNetworkId: 5,
  }
  this.hoverover = new Howl({ src: HoverSound,
    volume: 0.5
  });
  this.click = new Howl({
    src: clickSound,
    volume: 0.3,
  });
  this.handleMint = this.handleMint.bind(this)
  this.HandleIncrement = this.HandleIncrement.bind(this);
  }
  
    HoverOverPlay = () => {
        this.hoverover.play();
    }
    clickPlay = () => {
        this.click.play();
    }
    HandleDecrement= (event) => {
        if(this.state.mintAmount <= 1) return;
        this.setState({mintAmount: this.state.mintAmount - 1});
      }
      HandleIncrement= (event) => {
        if(this.state.mintAmount >= 10) return;
        this.setState({ mintAmount: this.state.mintAmount + 1 });
      }

      handleMint = async () => {
        const { ethereum } = window;
        if (!ethereum) {
          console.error("Ethereum provider not available");
          return;
        }
      
        try {
          await ethereum.enable();
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            GnomesCollectiveAddress,
            GnomesCollective.abi,
            signer
          );
      
          const quantity = this.state.mintAmount;
      
          const price = await contract.cost();
          let requiredEth = price.mul(quantity);
      
          const owner = await contract.owner();
          const sender = await signer.getAddress();
          const isOwner = owner === sender;
      
          if (!isOwner) {
            const userBalance = await signer.getBalance();
            
            if (userBalance.lt(requiredEth)) {
              throw new Error('Not enough ETH');
            }
          } else {
            requiredEth = ethers.BigNumber.from(0);
          }
      
          const maxSupply = await contract.maxSupply();
          const currentSupply = await contract.totalSupply();
          if (currentSupply.add(quantity).gt(maxSupply)) {
            throw new Error('SOLD OUT');
          }
      
          const tx = await contract.mint(quantity, { value: requiredEth });
          await tx.wait();
      
          console.log('Minting successful!');
        } catch (error) {
          console.error('Minting error:', error);
        }
      };
      
      componentDidMount() {
        this.checkNetwork();
        setInterval(this.checkNetwork, 1000); // Check network every 3 seconds
      }
      checkNetwork = async () => {
        const { ethereum } = window;
        if (!ethereum) {
          console.error("MetaMask is not installed or not connected");
          return;
        }
      
        try {
          const networkIdHex = await ethereum.request({ method: "eth_chainId" });
          const networkId = parseInt(networkIdHex, 16);
          const isNetwork = networkId === this.state.supportedNetworkId;
          this.setState({
            isSwitchButton: !isNetwork, // Show switch button if not connected
            networkId,
          });
        } catch (error) {
          console.error(error);
        }
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

          const selectedAccount = accounts[0]; // Select the first account

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
            
            {this.state.isConnected ? (
              
                <div>

                    <TextContainer><TextElement className="shake" color = "green" fontSize="calc(2vh + 2vw)">Connected</TextElement></TextContainer>
                    <Flex justify="center" align="center" height ="100vh" paddingBottom="1px">
                       
                     <ButtonElement className="shake"  onClick={() => {this.HandleDecrement();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>-</ButtonElement>
                     <Input width="50px" className="my-input-style"  fontSize="20px" type="number" margin="20 center" value={this.state.mintAmount} readOnly={true} css={{appearance: "none"}} />
                     <ButtonElement className="shake" onClick={() => {this.HandleIncrement();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>+</ButtonElement>
                     </Flex>

                     {isSwitchButton ? (
                      <div> <MintButtonContainer>
                      <ButtonElement
                        className="shake"
                        onClick={() => {
                          this.handleNetwork();
                          this.clickPlay();
                        }}
                        onMouseEnter={this.HoverOverPlay}
                      >
                        Switch Network
                      </ButtonElement>
                    </MintButtonContainer><BackButtonContainer>
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
                          </BackButtonContainer></div>
                    
                    ) : (
                      <div>
                      <MintButtonContainer>
                        <ButtonElement
                          className="shake"
                          onClick={() => {
                            this.handleMint();
                            this.clickPlay();
                          }}
                          onMouseEnter={this.HoverOverPlay}
                        >
                          Mint
                        </ButtonElement>
                      </MintButtonContainer>
                      
                          <VoteButtonContainer>
                          <ButtonElement
                          className="shake"
                          onClick={() => {
                            this.clickPlay();
                          }}
                          onMouseEnter={this.HoverOverPlay}
                        >
                          Vote
                        </ButtonElement>
                          </VoteButtonContainer>
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
                    )}
                    
                </div>

            ) : (
                <div>
                   <TextContainer><TextElement className="shake" fontSize="calc(2vh + 2vw)"> You need to connect to mint.</TextElement></TextContainer>
                   <ConnectButtonContainer> <ButtonElement className="shake" onClick={() => {this.connectAccount();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>Connect</ButtonElement></ConnectButtonContainer>
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
            )}

    
 </div>
        )
    }
}
export default Mint;