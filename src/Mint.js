import styled from 'styled-components';
import React, { Component, useState } from 'react';
import {ethers, BigNumber} from 'ethers';
import GnomesCollective from './GnomesCollective.json';
import"./App.css";
import Check from "./Check";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import clickSound from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { Buffer } from "buffer/";




window.Buffer = window.Buffer || Buffer;

const GnomesCollectiveAddress = "0xde91643273a60AF006fe307457A418b1F2eaf3af"

const TextContainer = styled.div`
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TextContainer2 = styled.div`
  position: absolute;
  top: 45%;
  left: 30%;
  transform: translate(-50%, -50%);
`;
const TextContainer4 = styled.div`
  position: absolute;
  top: 55%;
  left: 30%;
  transform: translate(-50%, -50%);
`;
const TextContainer3 = styled.div`
  position: absolute;
  top: 45%;
  left: 70%;
  transform: translate(-50%, -50%);
`;
const TextContainer5 = styled.div`
  position: absolute;
  top: 55%;
  left: 70%;
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
top: 75vh;
left: 75vw;
transform: translate(-50%, -50%);
`;
const FormButtonContainer = styled.div`
position: absolute;
top: 60%;
left: 50%;
transform: translate(-50%, -50%);
`;
const IncrementButtonContainer = styled.div`
position: absolute;
top: 58%;
left: 51.5%;
transform: translate(-50%, -50%);
`;
const DecrementButtonContainer = styled.div`
position: absolute;
top: 62%;
left: 51.5%;
transform: translate(-50%, -50%);
`;
const MintButtonContainer = styled.div`
position: absolute;
top: 67vh;
left: 50vw;
transform: translate(-50%, -50%);
`;
const RulesButtonContainer = styled.div`
position: absolute;
top: 75vh;
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


class Mint extends Component {
  constructor(props) {
  super(props);
  this.state = {
  totalSupply: 2888,
  whitelistedUsers: 0,
  mintedWLSupply: 0,
  mintedAdditionalSupply: 0,
  shake: false,
  mintAmount: 1,
  isConnected: Boolean(this.props.accounts[0]),
  y: 0,
  x: 0,
  z: 0,
  j: 0
  }
  this.hoverover = new Howl({ src: HoverSound });
  this.click = new Howl({ src: clickSound });
  this.handleMint = this.handleMint.bind(this)
  this.HandleIncrement = this.HandleIncrement.bind(this);
  this.HandleDecrement = this.HandleDecrement.bind(this);
  }
  
  componentDidMount() {
    const check = new Check();
    const whitelistedUsers = check.getWLAmount() + 500 +20 +7 +10 +5 +10 +10 +5 +5 +5 +5 +5 + 10;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(GnomesCollectiveAddress, GnomesCollective.abi, signer);
    
    contract.getmintedWL().then(mintedWLSupply => {
      contract.getmintedAdditional().then(mintedAdditionalSupply => {
        this.setState({whitelistedUsers, mintedWLSupply, mintedAdditionalSupply}, () => {
          // perform calculations and update state
          const y = (this.state.whitelistedUsers / this.state.totalSupply) * 100;
          const x = ((this.state.whitelistedUsers / this.state.totalSupply) - (this.state.mintedWLSupply / (this.state.totalSupply))) * 100;
          const z = (100 - (this.state.whitelistedUsers / this.state.totalSupply) * 100);
          const j = (1 - (this.state.whitelistedUsers / this.state.totalSupply) - (this.state.mintedAdditionalSupply / (this.state.totalSupply))) * 100;
          this.setState({ y, x, z, j});
        });
      });
    });
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
        if(this.state.mintAmount >= 2) return;
        this.setState({ mintAmount: this.state.mintAmount + 1 });
      }

      handleMint = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(GnomesCollectiveAddress, GnomesCollective.abi, signer);
        
        // Check if user is whitelisted
        const check = new Check();
        const userAddress = await signer.getAddress();
        const isWhitelisted = check.isLuckyGnomes(userAddress);

        console.log("WL: " + isWhitelisted);
        // check if paused
        const isPaused = await contract.paused();
        if(isPaused) {
        console.log("Minting is paused");
        return;
        }  

    // Check if publicMint is true or false
    const publicMint = await contract.publicMint();

    // check if the user is the owner
    const ownerAddress = await contract.owner();

    // other checks
    const balance = await signer.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    const walletMints = await contract.getWalletMints(userAddress);
    let requiredBalance = 0.0111;

    if(userAddress == ownerAddress) {
        try {
            const tx = await contract.mint(BigNumber.from(this.state.mintAmount),check.getProof(userAddress),check.getLeaf(userAddress));
           
            console.log('Transaction successful: ', tx);
        } catch(err) {
            console.log("Transaction error: ", err);
        }
        return;
    } 
    if (isWhitelisted) {
        if(this.state.mintAmount <= 2 - walletMints){
            if(this.state.mintAmount == 2 || walletMints == 1){
                if(publicMint){
                     requiredBalance = 0.00888 + 0.00222;
                } else{
                     requiredBalance = 0.00888;
                }
                 if(balanceInEth < requiredBalance) {
                    console.log("Not enough funds in wallet. Please add at least " + requiredBalance + " ETH.");
                    return;
                 }
                 try {
                 const value = ethers.utils.parseEther(String(requiredBalance));
                 const tx = await contract.mint(BigNumber.from(this.state.mintAmount),check.getProof(userAddress),check.getLeaf(userAddress), {value});
                 
                 console.log('Transaction successful: ', tx);
                 } catch(err) {
                    console.log("Transaction error 1: ", err);
                }
            } else {
              requiredBalance = 0;
             try {
                 const value = ethers.utils.parseEther(String(requiredBalance));
                 const tx = await contract.mint(BigNumber.from(this.state.mintAmount),check.getProof(userAddress),check.getLeaf(userAddress), {value});
                 
                 console.log('Transaction successful: ', tx);
                 } catch(err) {
                    console.log("Transaction error 2: ", err);
                }
          }
            
        }
     }
     if(!isWhitelisted && publicMint){
        if(this.state.mintAmount > 1 || walletMints > 1) {
            console.log("mintAmount > maxAmount");
            return;
        }
         requiredBalance = 0.00888 + 0.00222;
        try {
            const value = ethers.utils.parseEther(String(requiredBalance));
            const tx = await contract.mint(BigNumber.from(this.state.mintAmount),check.getProof(userAddress),check.getLeaf(userAddress), {value});
           
            console.log('Transaction successful: ', tx);
            } catch(err) {
               console.log("Transaction error: ", err);
           }
     }

 }
       
 handlePercentage(supply) {
  if (supply <= 10) {
    this.setState({ loadingBarState: 1 });
  } else if (supply <= 20) {
    this.setState({ loadingBarState: 2 });
  } 
  //and so on
}

  connectAccount = async() => {
    if(!window.ethereum) {
      console.log("Metamask is not installed or not connected");
      return;
    }
    try{
      const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
      });
      if(accounts.length === 0) {
        console.log("User denied account access");
        return;
      }
      this.props.setAccounts(accounts);
      this.setState({ isConnected: Boolean(accounts[0]) }, () => {
        console.log(this.state.isConnected);
      });
      
    } catch (error) {
      console.error(error);
    }
  }


    render() {
        return ( 
            <div>
    <Flex justifyContent="flex-end" alignItems="flex-end">
    <BackButtonContainer>  
        <ButtonElement
            className="shake"
            type="submit"
            onMouseEnter={this.HoverOverPlay}
            onClick={this.props.onButtonClick}>
            BACK
        </ButtonElement>
    </BackButtonContainer>
    </Flex>

            {this.state.isConnected ? (

                <div>


                    <TextContainer><TextElement className="shake" color = "green" fontSize="calc(1.2vh + 1.2vw)">Connected.</TextElement></TextContainer>
                    <Flex justify="center" align="center" height ="100vh" paddingBottom="1px">
                       
                     <ButtonElement className="shake"  onClick={() => {this.HandleDecrement();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>-</ButtonElement>
                     <Input width="50px" className="my-input-style"  fontSize="20px" type="number" margin="20 center" value={this.state.mintAmount} readOnly={true} css={{appearance: "none"}} />
                     <ButtonElement className="shake" onClick={() => {this.HandleIncrement();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>+</ButtonElement>
                     </Flex>
                     <MintButtonContainer><ButtonElement className="shake" onClick={() => {this.handleMint();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>Mint</ButtonElement></MintButtonContainer>
                                     
                     <TextContainer2><TextElement className="shake" color = "yellow" fontSize="calc(0.7vh + 0.7vw)">WL SUPPLY</TextElement></TextContainer2>
                     <TextContainer4><TextElement className="shake" color = "white" fontSize="calc(1vh + 1vw)"> {`${Math.round(this.state.x)}% of ${Math.round(this.state.y)}%`}</TextElement></TextContainer4>
                     <TextContainer3><TextElement className="shake" color = "orange" fontSize="calc(0.7vh + 0.7vw)">ADDITIONAl SUPPLY</TextElement></TextContainer3>
                     <TextContainer5><TextElement className="shake" color = "white" fontSize="calc(1vh + 1vw)">{`${Math.round(this.state.j)}% of ${Math.round(this.state.z)}%`}</TextElement></TextContainer5>
                     <RulesButtonContainer><ButtonElement className="shake" onClick={() => {this.props.onRulesButtonClick();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>RULES</ButtonElement></RulesButtonContainer>
                    
                </div>

          

            ) : (
                <div>
                   <TextContainer><TextElement className="shake" fontSize="calc(1.3vh + 1.3vw)"> You need to connect to mint.</TextElement></TextContainer>
                   <ConnectButtonContainer> <ButtonElement className="shake" onClick={() => {this.connectAccount();this.clickPlay();}} onMouseEnter={this.HoverOverPlay}>Connect</ButtonElement></ConnectButtonContainer>

                </div>
            )}

    
 </div>
        )
    }
}
export default Mint;
