import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl, Howler } from 'howler';
import HoverSound from './assets/sound/click-21156.mp3';
import backgroundImage from './assets/background/Unbenannt-3.png';
import XTRAIMAGE from './assets/Items/1.png';
import SKIPIMAGE from './assets/Items/2.png';
import BOOSTIMAGE from './assets/Items/3.png';
import VIMAGE from './assets/Items/4.png';
import clickSound from './assets/sound/hover.mp3';
import "./App.css";
import Web3 from 'web3';
import hgmsTokenAbi from './assets/ABI/HungerGames.json';
import GCAbi from "./assets/ABI/GnomesCollective.json";
import {ethers, BigNumber} from 'ethers';

const hgmsTokenAddress = '0x73229e7c7d8f9276e7a69cb0cc22ec503cf9c7c6'; 
const GnomesCollectiveAddress = "0x3acAcDfbF7fe223d42031a2cd185e232D911405F";

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
const Text = styled.p`
font-size: calc(.6vh + .6vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 25%;
  left: 17%;
  &:hover {
    color: red;
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
const TextHGMS = styled.p`
  font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextETH = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 35%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextPOTIONS = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 40%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextSKIP = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 45%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextBOOST = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 17%;
  &:hover {
    color: red;
  }
`;
const TextV = styled.p`
font-size: calc(.5vh + .5vw);
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 55%;
  left: 17%;
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
const ImageContainer = styled.div`
  position: relative;
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

const NFTModalContent = styled.div`
  width: 15vw;  
  height: 50vh;
  background-color: #fff;
  padding: 2rem; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); 
  border-radius: 15px; 
  overflow-y: hidden;


  @media (max-width: 1920px)  {
    width: 20%
  }
  
  @media (max-width: 1350px)  {
    width: 22%
  }
 
  @media (max-width: 1200px) {
    width: 27%; 
  }

  @media (max-width: 1155px) {
    width: 32%;
  }
  @media (max-width: 800px) {
    width: 37%;
  }
  @media (max-width: 620px) {
    width: 42%;
  }
  @media (max-width: 520px) {
    width: 55%;
  }
  @media (max-width: 520px) {
    width: 80%;
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
        supportedNetworkId: 5,
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
        nftsPerPage: 10 
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
        this.fetchingBalance = false; // Set to false once fetching is done
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
      console.log("HERE");
      await this.fetchUserNFTs();
      console.log("HERE");
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
  
          
          const NEWHGMSbalanceBigNumber = await contract.hgmsShopBalances(connectedAccount);
          const NEWETHbalanceBigNumber = await contract.ethShopBalances(connectedAccount);
  
          const NEWHGMSbalanceInFullUnits = parseFloat(ethers.utils.formatUnits(NEWHGMSbalanceBigNumber, 9));
          const NEWETHbalanceInFullUnits = parseFloat(ethers.utils.formatUnits(NEWETHbalanceBigNumber, 0));
          const NEWHGMSbalanceInMillions = (NEWHGMSbalanceInFullUnits / 1000000).toFixed(2);
          console.log(typeof NEWHGMSbalanceBigNumber, NEWHGMSbalanceBigNumber);


  
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

      componentDidMount() {
        this.checkNetwork();
        this.fetchBalance();
    
        // Save the intervals to the component's state so you can clear them later
        this.checkNetworkInterval = setInterval(this.checkNetwork, 10000); // every 10 seconds
        this.fetchBalanceInterval = setInterval(this.fetchBalance, 10000); // every 10 seconds
    }
    
    componentWillUnmount() {
        // Clear intervals when the component is unmounted
        clearInterval(this.checkNetworkInterval);
        clearInterval(this.fetchBalanceInterval);
    }

   handleMultipleActions = async () => {
      this.toggleDepositModal();
      this.handleConfirm();
    }

    handleConfirm = async () => {
      const HGMSAmount = this.hgmsAmountRef.current.value;
      const ETHAmount = this.ethAmountRef.current.value;
      
      await this.confirmTransaction(HGMSAmount, ETHAmount);
  }

render() {
    const { isConnected, isSwitchButton } = this.state;
    const { depositAmount, onDeposit, onClose } = this.props;
    const indexOfLastNFT = this.state.currentPage * this.state.nftsPerPage;
    const indexOfFirstNFT = indexOfLastNFT - this.state.nftsPerPage;
    const currentNFTs = this.state.userNFTs.slice(indexOfFirstNFT, indexOfLastNFT);

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
                />
            </div>
            <div className="form-group">
                <label htmlFor="ethAmount">$ETH Amount:</label>
                <input
                type="text"
                id="ethAmount"
                className="form-control"
                ref={this.ethAmountRef}
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
            <h2>Gnomes</h2>
            <ul>
                  {currentNFTs.map(nftId => (
                      <li key={nftId}>ID: {nftId}</li>
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
                </div>
            );
          }
}
  
export default Shop;