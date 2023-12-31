import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl, Howler } from 'howler';
import HoverSound from './assets/sound/click-21156.mp3';
import clickSound from './assets/sound/hover.mp3';
import "./App.css";
import Web3 from 'web3';
import {ethers} from 'ethers';
import hgmsTokenAbi from './assets/ABI/HungerGames.json';
import GCAbi from "./assets/ABI/GnomesCollective.json";
import FirstPotion from './assets/Items/Potion 1 HD.gif';
import FirstPotionStill from './assets/Items/Potion 1 HD-0 STILL.png';
import FirstPotionPressed from './assets/Items/Potion 1 HD-8 PRESSED.png';
import SecondPotion from './assets/Items/Potion 2 HD.gif';
import SecondPotionStill from './assets/Items/Potion 2 HD-0 STILL.png';
import SecondPotionPressed from './assets/Items/Potion 2 HD-8 PRESSED.png';
import ThirdPotion from './assets/Items/Potion 3 HD.gif';
import ThirdPotionStill from './assets/Items/Potion 3 HD-0 STILL.png';
import ThirdPotionPressed from './assets/Items/Potion 3 HD-8 PRESSED.png';
import FourthPotion from './assets/Items/Potion 4 HD.gif';
import FourthPotionStill from './assets/Items/Potion 4 HD-0 STILL.png';
import FourthPotionPressed from './assets/Items/Potion 4 HD-8 PRESSED.png';

const hgmsTokenAddress = '0x3511910Cd2c60a77a7f095Ce3c5d8AE1fBf680cd'; 
const GnomesCollectiveAddress = "0x6742eE08d1ac25f72d741708E37AD69C9e7F4b22";

const Overlay = styled.div`
  position: fixed; // This will cover the whole screen
  top: 0;
  left: 0;
  width: 100vw; // Full width
  height: 100vh; // Full height
  background-color: rgba(0, 0, 0, 0.5); // Black with 50% opacity
  z-index: -1; // Place it behind the content
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 1000; /* Ensure it appears on top of everything */
`;
const BalanceModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BalanceModalContainer = styled.div`
  position: relative;
  text-align: center;
`;
const BalanceModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%; 
`;
const BalanceTable = styled.div`
  margin-top: 20px;
`;
const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const BalanceLabel = styled.p`
  font-size: calc(0.7vh + 0.7vw);
  color: #000;
`;
const BalanceValue = styled.p`
  font-size: calc(0.7vh + 0.7vw);
  color: #000;
  font-weight: bold;
`;
const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -20px;
  font-size: 2vw;
  padding: 1vh 1vw;
  background-color: #ff5252;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff3333;
  }
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  h2 {
    font-size: 24px; /* Adjust the heading font size as needed */
  }

  label {
    font-size: 16px; /* Adjust the label font size as needed */
  }

  input {
    font-size: 16px; /* Adjust the input font size as needed */
  }

  .button-container {
    text-align: center;

    .cancel-button {
      font-size: 18px; /* Adjust the cancel button font size as needed */
    }

    .deposit-button {
      font-size: 18px; /* Adjust the deposit button font size as needed */
    }
  }
`;

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
    @media (max-width: 610px) {
      top: 70%;
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
    @media (max-width: 610px) {
      top: 75vh;
    }
      
  }`;
  const ApplyButtonElement = styled.button`
  background-color: #833929;
  border-radius: 5px;
  position: absolute;
  top: 72vh;
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
    @media (max-width: 610px) {
      top: 80vh;
    }
  }`;

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

const NFTModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75); // darker semi-transparent background
  z-index: 9999; // significantly high z-index
`;
const StyledLi = styled.li`
  font-size: 14px; /* Adjust the font size as needed */
  top: 150px;
`;

const SecondPotionTitle = styled.h3`
font-size: calc(1vh + 1vw);
color: #000; /* Updated color to black */
margin: 15px auto; /* Center the title horizontally */
position: absolute; /* Use absolute positioning */
top: 25%; /* Place the title at the vertical center */
left: 55%; /* Place the title at the horizontal center */
transform: translate(-50%, -50%); /* Center the title precisely */
z-index: 1; /* Ensure the title is on top of the image */
text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
filter: blur(5px);
animation: ${blurAnimation} 2s linear alternate infinite, glowTitle 2s linear infinite;
@media (max-width: 1024px) {
  top: 30%;
  }
@media (max-width: 768px) {
    top: 33%;
  }
  @media (max-width: 610px) {
    left: 60%;
  }
    
}
`;

const ThirdPotionTitle = styled.h3`
font-size: calc(1vh + 1vw);
color: #000; /* Updated color to black */
margin: 15px auto; /* Center the title horizontally */
position: absolute; /* Use absolute positioning */
top: 51%; /* Place the title at the vertical center */
left: 45%; /* Place the title at the horizontal center */
transform: translate(-50%, -50%); /* Center the title precisely */
z-index: 1; /* Ensure the title is on top of the image */
text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
filter: blur(5px);
animation: ${blurAnimation} 2s linear alternate infinite, glowTitle 2s linear infinite;
@media (max-width: 1024px) {
  top: 55%;
  }
  @media (max-width: 768px) {
    top: 58%;
  }
  @media (max-width: 610px) {
    left: 40%;
  }
    
}
`;
const FourthPotionTitle = styled.h3`
font-size: calc(1vh + 1vw);
color: #000; /* Updated color to black */
margin: 15px auto; /* Center the title horizontally */
position: absolute; /* Use absolute positioning */
top: 51%; /* Place the title at the vertical center */
left: 55%; /* Place the title at the horizontal center */
transform: translate(-50%, -50%); /* Center the title precisely */
z-index: 1; /* Ensure the title is on top of the image */
text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
filter: blur(5px);
animation: ${blurAnimation} 2s linear alternate infinite, glowTitle 2s linear infinite;
@media (max-width: 1024px) {
top: 55%;
}
@media (max-width: 768px) {
  top: 58%;
  left: 56%
}
@media (max-width: 610px) {
  left: 60%;
}
  

}
`;

const FirstPotionTitle = styled.h3`
font-size: calc(1vh + 1vw);
color: #000; /* Updated color to black */
margin: 15px auto; /* Center the title horizontally */
position: absolute; /* Use absolute positioning */
top: 25%; /* Place the title at the vertical center */
left: 45%; /* Place the title at the horizontal center */
transform: translate(-50%, -50%); /* Center the title precisely */
z-index: 1; /* Ensure the title is on top of the image */
text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
filter: blur(5px);
animation: ${blurAnimation} 2s linear alternate infinite, glowTitle 2s linear infinite;
@media (max-width: 1024px) {
  top: 30%;
  }
  @media (max-width: 768px) {
    top: 33%;
  }
  @media (max-width: 610px) {
    left: 40%;
  }
    
}
`;
const FirstPotionElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  top: 40vh;
  left: 45vw;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: auto;
  }

  &:hover {
    background-color: rgba(22, 225, 188, 0.4); /* Transparent #16e1bc (50% opacity) */

    box-shadow: 0px 5px 6px 3px #16e1bc;
    color: white;
    }
    @media (max-width: 1024px) {
      width: 80px; /* Adjust the width for screens up to 1024px */
      height: 80px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 768px) {
      width: 60px; /* Adjust the width for screens up to 1024px */
      height: 60px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 610px) {
      left: 40vw; /* Adjust the width for screens up to 1024px */
    }

`;
const SecondPotionElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  top: 40vh;
  left: 55vw;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: auto;
  }
  &:hover {
    background-color: rgba(234, 242, 87, 0.4); /* Transparent color with 50% opacity */

    box-shadow: 0px 5px 6px 3px #eaf257;
    color: white;
    }
    @media (max-width: 1024px) {
      width: 80px; /* Adjust the width for screens up to 1024px */
      height: 80px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 768px) {
      width: 60px; /* Adjust the width for screens up to 1024px */
      height: 60px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 610px) {
      left: 60vw; /* Adjust the width for screens up to 1024px */
    }
`;
const ThirdPotionElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  top: 65vh;
  left: 45vw;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: auto;
  }


  &:hover {
    background-color: rgba(195, 67, 92, 0.5); /* Transparent #c3435c (50% opacity) */
    box-shadow: 0px 5px 6px 3px #c3435c;
    color: white;
    }
    @media (max-width: 1024px) {
      width: 80px; /* Adjust the width for screens up to 1024px */
      height: 80px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 768px) {
      width: 60px; /* Adjust the width for screens up to 1024px */
      height: 60px; /* Adjust the height for screens up to 1024px */
    }
    @media (max-width: 610px) {
      left: 40vw; /* Adjust the width for screens up to 1024px */
    }
`;
const FourthPotionElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
  top: 65vh;
  left: 55vw;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: auto;
  }

  &:hover {
    background-color: rgba(195, 67, 92, 0.5); /* Transparent #c3435c (50% opacity) */
    box-shadow: 0px 5px 6px 3px #94cc47;
    color: white;
  }

  @media (max-width: 1024px) {
    width: 80px; /* Adjust the width for screens up to 1024px */
    height: 80px; /* Adjust the height for screens up to 1024px */
  }
  @media (max-width: 768px) {
    width: 60px; /* Adjust the width for screens up to 1024px */
    height: 60px; /* Adjust the height for screens up to 1024px */
  }
  @media (max-width: 610px) {
    left: 60vw; /* Adjust the width for screens up to 1024px */
  }
`;
const NFTModalContent = styled.div`
  width: 15vw;  
  height: 50vh;
  background-color: #fff;
  padding: 2rem; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); 
  border-radius: 15px; 
  overflow-y: hidden;


  @media (max-width: 1920px)  {
    width: 50%
  }
  
 

`;

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentItem : "XTRA",
        isConnected: Boolean(this.props.accounts[0]),
        isSwitchButton: false, 
        networkId: null,
        supportedNetworkId: 1,
        isDepositModalOpen: false,
        isBalanceModalOpen: false,
        isApplyModalOpen: false,
        hgmsAmount: "",
        ethAmount: "",
        balanceHGMS: 0, 
        balanceETH: 0,  
        balanceXtraPotions: 0, 
        balanceSkipPotions: 0, 
        balanceBoostPotions: 0, 
        balanceVPotions: 0, 
        isApplyModalOpen: false,
        userNFTs: [],
        currentPage: 1,
        nftsPerPage: 10,
        FirstPotionImage: FirstPotionStill,
        SecondPotionImage: SecondPotionStill,
        ThirdPotionImage: ThirdPotionStill,
        FourthPotionImage: FourthPotionStill,
        isMouseDown: false,
        mousedownTime: 0, 
    };
    this.hgmsAmountRef = React.createRef();
    this.ethAmountRef = React.createRef();
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('MetaMask not found');
    }
    this.hoverover = new Howl({
      src: HoverSound,
      volume: 0.5,
    });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });
    }
    toggleApplyModal = () => {
      this.setState(prevState => ({ isApplyModalOpen: !prevState.isApplyModalOpen }));
  };

    toggleDepositModal = () => {
        this.setState((prevState) => ({
          isDepositModalOpen: !prevState.isDepositModalOpen,
        }));
      };

    toggleBalanceModal = () => {
        this.setState((prevState) => ({
          isBalanceModalOpen: !prevState.isBalanceModalOpen,
        }));
    };      
    async fetchBalance() {
      if (this.fetchingBalance) {
          return; 
      }
  
      this.fetchingBalance = true;
  
      try {
        const accounts = await this.web3.eth.getAccounts();
        const connectedAccount = accounts[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(hgmsTokenAddress, hgmsTokenAbi.abi, signer);
    
        const hgmsBalanceBigNumber = await contract.hgmsShopBalances(connectedAccount);
        const ETHBalanceBigNumber = await contract.ethShopBalances(connectedAccount);
    
        const hgmsBalanceInFullUnits = parseFloat(ethers.utils.formatUnits(hgmsBalanceBigNumber, 0)); 
        const ethBalanceInFullUnits = parseFloat(ethers.utils.formatUnits(ETHBalanceBigNumber, 9)); 
        const hgmsBalanceInMillions = (hgmsBalanceInFullUnits / 1000).toFixed(2); 
    
        console.log(hgmsBalanceInMillions + "HGMS");
        console.log(ethBalanceInFullUnits + "ETH");
        console.log(this.state.balanceHGMS);
    
        this.setState({ 
          balanceHGMS: hgmsBalanceInMillions + "K", 
          balanceETH: ethBalanceInFullUnits 
        });
    
      } catch (error) {
        console.error('Error reading HGMS balance:', error);
    } finally {
        this.fetchingBalance = false; 
    }
}
async fetchUserNFTs() {
  const { isConnected, networkId, supportedNetworkId } = this.state;
  console.log("HERE");
  if (!isConnected || networkId !== supportedNetworkId) return;

  const accounts = await this.web3.eth.getAccounts();
  const connectedAccount = accounts[0];
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(GnomesCollectiveAddress, GCAbi.abi, signer);
  
  try {
    const nftIdsBigNumber = await contract.walletOfOwner(connectedAccount);
    console.log("NFT IDs fetched from contract:", connectedAccount, nftIdsBigNumber);

   
    const nftIds = nftIdsBigNumber.map(id => id.toString());

    this.setState({ userNFTs: nftIds });
} catch (error) {
    console.error('Error fetching NFT IDs:', error);
}
}
handleFirstPotionMouseDown = () => {
  this.setState({ 
      FirstPotionImage: FirstPotion,
      mousedownTime: Date.now()
  });

  if (this.FirstPotionTimeout) {
      clearTimeout(this.FirstPotionTimeout);
  }

  this.FirstPotionTimeout = setTimeout(() => {
      if (this.state.FirstPotionImage === FirstPotion) {
          this.setState({ FirstPotionImage: FirstPotionPressed });
      }
  }, 700);
};

handleFirstPotionMouseUp = () => {
  if (this.FirstPotionTimeout) {
      clearTimeout(this.FirstPotionTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ FirstPotionImage: FirstPotion });
      setTimeout(() => {
          this.setState({ FirstPotionImage: FirstPotionStill });
          this.navigateFight();
      }, 900 - elapsedTime);
  } else {
      this.setState({ FirstPotionImage: FirstPotionStill });
      this.navigateFight();
  }
};

navigateFirstPotionFight = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
    onButtonClick(''); 
  }
};

handleSecondPotionMouseDown = () => {
  this.setState({ 
      SecondPotionImage: SecondPotion,
      mousedownTime: Date.now()
  });

  if (this.SecondPotionTimeout) {
      clearTimeout(this.SecondPotionTimeout);
  }

  this.fightTimeout = setTimeout(() => {
      if (this.state.SecondPotionImage === SecondPotion) {
          this.setState({ SecondPotionImage: SecondPotionPressed });
      }
  }, 700);
};

handleSecondPotionMouseUp = () => {
  if (this.SecondPotionTimeout) {
      clearTimeout(this.SecondPotionTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ SecondPotionImage: SecondPotion });
      setTimeout(() => {
          this.setState({ SecondPotionImage: SecondPotionStill });
          this.navigateFight();
      }, 900 - elapsedTime);
  } else {
      this.setState({ SecondPotionImage: SecondPotionStill });
      this.navigateFight();
  }
};

navigateSecondPotionFight = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
    onButtonClick(''); 
  }
};
handleThirdPotionMouseDown = () => {
  this.setState({ 
      ThirdPotionImage: ThirdPotion,
      mousedownTime: Date.now()
  });

  if (this.ThirdPotionTimeout) {
      clearTimeout(this.ThirdPotionTimeout);
  }

  this.ThirdPotionTimeout = setTimeout(() => {
      if (this.state.ThirdPotionImage === ThirdPotion) {
          this.setState({ fightImage: ThirdPotionPressed });
      }
  }, 700);
};

handleThirdPotionMouseUp = () => {
  if (this.ThirdPotionTimeout) {
      clearTimeout(this.ThirdPotionTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ ThirdPotionImage: ThirdPotion });
      setTimeout(() => {
          this.setState({ ThirdPotionImage: ThirdPotionStill });
          this.navigateFight();
      }, 900 - elapsedTime);
  } else {
      this.setState({ ThirdPotionImage: ThirdPotionStill });
      this.navigateFight();
  }
};

navigateThirdPotionFight = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
    onButtonClick(''); 
  }
};
handleFourthPotionMouseDown = () => {
  this.setState({ 
      FourthPotionImage: FourthPotion,
      mousedownTime: Date.now()
  });

  if (this.FourthPotionTimeout) {
      clearTimeout(this.FourthPotionTimeout);
  }

  this.FourthPotionTimeout = setTimeout(() => {
      if (this.state.FourthPotionImage === FourthPotion) {
          this.setState({ fightImage: FourthPotionPressed });
      }
  }, 700);
};

handleFourthPotionMouseUp = () => {
  if (this.FourthPotionTimeout) {
      clearTimeout(this.FourthPotionTimeout);
  }

  const elapsedTime = Date.now() - this.state.mousedownTime;

  if (elapsedTime < 900) {
      this.setState({ FourthPotionImage: FourthPotion });
      setTimeout(() => {
          this.setState({ FourthPotionImage: FourthPotionStill });
          this.navigateFight();
      }, 900 - elapsedTime);
  } else {
      this.setState({ FourthPotionImage: FourthPotionStill });
      this.navigateFight();
  }
};

navigateFourthPotionFight = () => {
  const { onButtonClick } = this.props;
  if (typeof onButtonClick === 'function') {
    onButtonClick(''); 
  }
};
totalPages = () => {
  return Math.ceil(this.state.userNFTs.length / this.state.nftsPerPage);
}


goToNextPage = () => {
  if (this.state.currentPage < this.totalPages()) {
      this.setState(prevState => ({
          currentPage: prevState.currentPage + 1
      }));
  }
}


goToPreviousPage = () => {
  if (this.state.currentPage > 1) {
      this.setState(prevState => ({
          currentPage: prevState.currentPage - 1
      }));
  }
}
    handleApplyClick = async () => {

      await this.fetchUserNFTs();

      this.toggleApplyModal();
    };

    handleHgmsAmountChange = (event) => {
        this.setState({ hgmsAmount: event.target.value });
      };
      
    handleEthAmountChange = (event) => {
        this.setState({ ethAmount: event.target.value });
      };
       
    handleDeposit = () => {
        this.toggleDepositModal()
    }
    handleBalance = () => {
      this.toggleBalanceModal()
    }
    async confirmTransaction(HGMS, ETH) {
      try {
          const accounts = await this.web3.eth.getAccounts();
          const connectedAccount = accounts[0];
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(hgmsTokenAddress, hgmsTokenAbi.abi, signer);
  
          const depositTx = await contract.depositToShop(HGMS, ETH * 1000000000, { value: ethers.utils.parseEther(ETH.toString()), from: connectedAccount });
          await depositTx.wait(); 
  
      } catch (error) {
          console.error('Error depositing:', error);
      }
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
            isSwitchButton: !isNetwork, 
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
  

      componentDidMount() {
        this.checkNetwork();
        this.fetchBalance();
    
        
        this.checkNetworkInterval = setInterval(this.checkNetwork, 1000); 
        this.fetchBalanceInterval = setInterval(this.fetchBalance, 10000); 
    }
    
    componentWillUnmount() {
        
        clearInterval(this.checkNetworkInterval);
        clearInterval(this.fetchBalanceInterval);
    }
    handleInputChange = (event) => {
      event.target.value = event.target.value.replace(',', '.');
    }
    handleMultipleActions = async () => {
      const hgmsAmount = parseFloat(this.hgmsAmountRef.current.value) || 0;
      const ethAmount = parseFloat(this.ethAmountRef.current.value) || 0;

      this.toggleDepositModal();
      const isConfirmed = window.confirm("DEPOSITS ARE NOT WITHDRAWABLE. Are you sure you want to proceed?");
  
      if (isConfirmed) {
        this.handleConfirm(hgmsAmount, ethAmount);
      }

    };
    

    handleConfirm = async (HGMSAmount, ETHAmount) => {
      await this.confirmTransaction(HGMSAmount, ETHAmount);
    };
    

render() {
    const { isConnected, isSwitchButton } = this.state;
    const { depositAmount, onDeposit, onClose } = this.props;
    const indexOfLastNFT = this.state.currentPage * this.state.nftsPerPage;
    const indexOfFirstNFT = indexOfLastNFT - this.state.nftsPerPage;
    const currentNFTs = this.state.userNFTs.slice(indexOfFirstNFT, indexOfLastNFT);
    console.log(currentNFTs);
    return (
      <div>
        <Overlay>
        <Title>SHOP</Title>
        
        {isConnected && !isSwitchButton ? (<div>
        <BalButtonElement onClick={this.handleBalance} onMouseEnter={this.HoverOverPlay}>Balance</BalButtonElement>
        <DepButtonElement onClick={this.handleDeposit} onMouseEnter={this.HoverOverPlay}>Deposit</DepButtonElement>
        <ApplyButtonElement onClick={() => {this.handleApplyClick();}} onMouseEnter={this.HoverOverPlay}>Apply</ApplyButtonElement>
        </div>
      ) : (<div>
        <DepButtonElement onClick={isConnected ? this.handleNetwork : this.connectAccount}>{isConnected ? "Switch Network" : "Connect"}</DepButtonElement>
        </div>
      )}


          <FirstPotionTitle>SKIP</FirstPotionTitle>
          <FirstPotionElement 
              onMouseDown={this.handleFirstPotionMouseDown}
              onMouseUp={this.handleFirstPotionMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.FirstPotionImage} alt="FirstPotion" />
          </FirstPotionElement>
          <SecondPotionTitle>V</SecondPotionTitle>
          <SecondPotionElement 
              onMouseDown={this.handleSecondPotionMouseDown}
              onMouseUp={this.handleSecondPotionMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.SecondPotionImage} alt="SecondPotion" />
          </SecondPotionElement>
          <ThirdPotionTitle>XTRA</ThirdPotionTitle>
          <ThirdPotionElement 
              onMouseDown={this.handleThirdPotionMouseDown}
              onMouseUp={this.handleThirdPotionMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.ThirdPotionImage} alt="ThirdPotion" />
          </ThirdPotionElement>
          <FourthPotionTitle>BOOST</FourthPotionTitle>
          <FourthPotionElement 
              onMouseDown={this.handleFourthPotionMouseDown}
              onMouseUp={this.handleFourthPotionMouseUp}
              onMouseEnter={this.HoverOverPlay}>
              <img src={this.state.FourthPotionImage} alt="FourthPotion" />
          </FourthPotionElement>



        {this.state.isDepositModalOpen && (
        <ModalOverlay>
            <ModalContent>
            <h2>Deposit</h2>
               <div className="form-group">
                <label htmlFor="hgmsAmount">$HGMS Amount:</label>
                <input
                type="text"
                id="hgmsAmount"
                className="form-control"
                ref={this.hgmsAmountRef}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="ethAmount">$ETH Amount:</label>
                <input
                type="text"
                id="ethAmount"
                className="form-control"
                ref={this.ethAmountRef}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="button-container">
                <button className="cancel-button" onClick={this.toggleDepositModal}>
                X
                </button>
                <button
                className="deposit-button"
                onClick={
                  this.handleMultipleActions
                }
              >
                Confirm
              </button>
            </div>
            </ModalContent>
        </ModalOverlay>
        )}
       {this.state.isBalanceModalOpen && (
  <BalanceModalOverlay>
    <BalanceModalContainer>
      <CloseButton onClick={this.toggleBalanceModal}>X</CloseButton>
    <BalanceModalContent>
      <BalanceTable>
        <BalanceRow>
          <BalanceLabel>$HGMS:</BalanceLabel>
          <BalanceValue>{this.state.balanceHGMS}</BalanceValue>
        </BalanceRow>
        <BalanceRow>
          <BalanceLabel>$ETH:</BalanceLabel>
          <BalanceValue>{this.state.balanceETH}</BalanceValue>
        </BalanceRow>
        <BalanceRow>
          <BalanceLabel>XTRA:</BalanceLabel>
          <BalanceValue>{this.state.balanceXtraPotions}</BalanceValue>
        </BalanceRow>
        <BalanceRow>
          <BalanceLabel>SKIP:</BalanceLabel>
          <BalanceValue>{this.state.balanceSkipPotions}</BalanceValue>
        </BalanceRow>
        <BalanceRow>
          <BalanceLabel>BOOST:</BalanceLabel>
          <BalanceValue>{this.state.balanceBoostPotions}</BalanceValue>
        </BalanceRow>
        <BalanceRow>
          <BalanceLabel>V:</BalanceLabel>
          <BalanceValue>{this.state.balanceVPotions}</BalanceValue>
        </BalanceRow>
      </BalanceTable>
    </BalanceModalContent>
    </BalanceModalContainer>
  </BalanceModalOverlay>
        )}
        {this.state.isApplyModalOpen && (
        <NFTModalOverlay>
        <NFTModalContent>
            <h3>Gnomes</h3>
            <ul>
                  {currentNFTs.map(nftId => (
                      <StyledLi key={nftId}>ID: {nftId}</StyledLi>
                  ))}
              </ul>
              <div className="pagination-controls">
            <button onClick={this.goToPreviousPage} disabled={this.state.currentPage === 1}>
                Previous
            </button>
            <button onClick={this.goToNextPage} disabled={this.state.currentPage === this.totalPages()}>
                Next
            </button>
        </div>

            <button onClick={this.toggleApplyModal}>Close</button>
        </NFTModalContent>
        </NFTModalOverlay>
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
                </Overlay>
                </div>
                
            );
          }
}
  
export default Shop;