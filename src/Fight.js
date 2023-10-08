import React, { Component } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';
import clickSound from "./assets/sound/hover.mp3";
import HoverSound from "./assets/sound/click-21156.mp3";
import hgmsTokenAbi from './assets/ABI/HungerGames.json';
import battleGnomesAbi from './assets/ABI/BattleContract.json';
import GCAbi from "./assets/ABI/GnomesCollective.json";
import Web3 from 'web3';
import {ethers} from 'ethers';

// Check if MetaMask is installed and injects the provider

const hgmsTokenAddress = '0x6E62C622c7035d4CE1f36Bd977478A85C614d0E6'; 
const GnomesCollectiveAddress = "0x086A19cEB20911FE4f5DeB1Fd5368C5dbd749a4D";
const BattleGnomesAddress = "0x067aFf85dB2B8F10e3C459a1091c43692218319B";


// Overlay for darkening the background
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal content container
export const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

// Close button style
export const CloseButton = styled.button`
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

// Table style
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// Table header style
export const TableHeader = styled.th`
  background-color: #f2f2f2;
  text-align: left;
  padding: 10px;
`;

// Table row style
export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

// Table cell style
export const TableCell = styled.td`
  padding: 10px;
`;

const BackButtonContainer = styled.div`
position: absolute;
top: 80vh;
left: 80vw;
transform: translate(-50%, -50%);
`;
const QueueButtonElement = styled.button`
background-color: #833929;
border-radius: 5px;
position: absolute;
top: 53vh;
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
const LeaderboardButtonElement = styled.button`
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
const StyledLi = styled.li`
  font-size: 14px; /* Adjust the font size as needed */
  top: 150px;
`;
const StyledUl = styled.ul`
  margin-top: 20px; /* Adjust the margin-top as needed */
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
const DEVModalContent = styled.div`
  width: 15vw;  
  background-color: #fff;
  padding: 2rem; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); 
  border-radius: 15px; 
  overflow-y: auto; /* Use auto for scrolling if content exceeds available space */

  @media (max-width: 1920px) {
    width: 50%;
  }
`;

const DEVModalOverlay = styled.div`
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

const ConnectButtonElement = styled.button`
background-color: #833929;
border-radius: 5px;
position: absolute;
top: 43vh;
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
const DevButtonElement = styled.button`
background-color: #833929;
border-radius: 5px;
position: absolute;
top: 43vh;
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
const AccountText = styled.p`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px; /* Adjust the font size as needed */
  color: #333; /* Adjust the color as needed */
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

class Fight extends Component {
  constructor(props) {
    super(props);
    this.hoverover = new Howl({
      src: HoverSound,
      volume: 0.5,
    });
    this.click = new Howl({
      src: clickSound,
      volume: 0.3,
    });
    this.toggleDevModal = this.toggleDevModal.bind(this); 
    this.handleDev = this.handleDev.bind(this); 
    this.fetchContractValues = this.fetchContractValues.bind(this);

    this.state = {
      isConnected: Boolean(this.props.accounts[0]),
      isSwitchButton: false,
      networkId: null,
      supportedNetworkId: 5,
      selectedAccount: null,
      isQueueModalOpen: false,
      userNFTs: [],
      currentPage: 1, 
      itemsPerPage: 10,
      isDevModalOn: false,
      contractValues: [], 
    };
  }

  async initializeEthereum() {
    const { ethereum } = window;
    if (!ethereum) {
      console.error("MetaMask is not installed or not connected");
      return;
    }
  
    try {
      await ethereum.enable();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        BattleGnomesAddress,
        battleGnomesAbi.abi,
        signer
      );
  
      this.setState({ contract });
    } catch (error) {
      console.error("Error initializing Ethereum:", error);
    }
  }
  async fetchContractValues() {
    try {
      const contractData = [
        { name: "_startTimer()" },
        { name: "maxAmountOfWinners()" },
        { name: "battlesCount()" },
        { name: "getMintAmount()" },
        { name: "hasTimerPassed()" },
        { name: "queuecounter()" },
        { name: "roundDuration()" },
        { name: "dead(uint256)" },
        { name: "getRoundWinnersLength()" },
        { name: "uniqueOwnersCounter"},
        { name: "roundsCount()"},
      ];
  
      const { contract } = this.state;
      let deadcounter = 0;
      let roundWinnersCount = 0; 
      
      const values = await Promise.all(
        contractData.map(async (item) => {
          if (item.name === "dead(uint256)") {
            try {
              const mintAmount = await contract.getMintAmount();
              let deadcounter = 0;
              for (let i = 0; i < mintAmount; i++) {
                const isDead = await contract.dead(i);
                if (isDead) {
                  deadcounter++;
                }
              }
              return {
                name: item.name,
                value: deadcounter.toString(),
              };
            } catch (error) {
              return {
                name: item.name,
                value: "N/A",
              };
            }
          } else if (item.name === "roundWinners(uint256)") {
            try {
              let roundWinnersCount = 0;
              for (let i = 0; i < contract.getMintAmount(); i++) {
                if (contract[item.name](i) !== "0x0000000000000000000000000000000000000000") {
                  roundWinnersCount++;
                } else {
                  break;
                }
              }
              return {
                name: item.name,
                value: roundWinnersCount.toString(),
              };
            } catch (error) {
              return {
                name: item.name,
                value: "N/A",
              };
            }
          } else if (item.name === "uniqueOwners(address)") {
            try {
              const mintAmount = await contract.getMintAmount();
              let uniqueOwnersCount = 0;
              for (let i = 1; i <= mintAmount; i++) {
                const owner = await contract.ownerOf(i);
                const isUnique = await contract[item.name](owner);
                if (isUnique) {
                  uniqueOwnersCount++;
                }
              }
              return {
                name: item.name,
                value: uniqueOwnersCount.toString(),
              };
            } catch (error) {
              return {
                name: item.name,
                value: "N/A",
              };
            }
          } else {
            const value = await contract[item.name]();
            if (item.name === "_startTimer()") {
              const startTimerValue = await contract[item.name]();
            
              if (startTimerValue.isZero()) {
                return {
                  name: item.name,
                  value: "0:00",
                };
              }
              const currentTimestamp = Math.floor(Date.now() / 1000);
              const elapsedSeconds = currentTimestamp - startTimerValue;
              const minutes = Math.floor(elapsedSeconds / 60);
              const seconds = elapsedSeconds % 60;
              return {
                name: item.name,
                value: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
              };
            } else {
              return { name: item.name, value: value.toString() };
            }
          }
        })
      );
      
      
      this.setState({ contractValues: values }, () => {
        console.log("Contract values fetched:", this.state.contractValues);
      });
    } catch (error) {
      console.error("Error fetching contract values:", error);
    }
  }
  renderContractData() {
    return this.state.contractValues.map((item, index) => (
      <p key={index}>
        {item.name}: {item.value}
      </p>
    ));
  }

  async fetchUserNFTs() {
    const { isConnected, networkId, supportedNetworkId } = this.state;

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
    return Math.ceil(this.state.userNFTs.length / this.state.itemsPerPage);
  }
  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  handleNextPage = () => {
    const { currentPage, itemsPerPage, nftIds } = this.state;
    const totalPages = Math.ceil(nftIds.length / itemsPerPage);

    if (currentPage < totalPages) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
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
  
  handleQueueClick = async () => {

    await this.fetchUserNFTs();

    this.toggleQueueModal();
  };

  toggleQueueModal = async () => {
    await this.fetchUserNFTs();
    this.setState(prevState => ({ isQueueModalOpen: !prevState.isQueueModalOpen }));
  }

toggleLeaderboardModal = () => {
  //
}
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
      
      this.setState({ selectedAccount: accounts[0] }, () => {
        this.props.setAccounts(accounts);
        console.log(this.state.selectedAccount);
      });
      
      const isConnected = Boolean(accounts[0]);
      this.setState({ isConnected: isConnected });
      console.log("CONNECTED: " + isConnected);
      
      } catch (error) {
      console.error(error);
      }
    
  }
  goToNextPage = () => {
    const { currentPage, itemsPerPage, userNFTs } = this.state;
    const totalPages = Math.ceil(userNFTs.length / itemsPerPage);

    if (currentPage < totalPages) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };
  goToPreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

async componentDidMount() {
  await this.initializeEthereum();
  this.checkNetwork();
  this.checkNetworkInterval = setInterval(this.checkNetwork, 10000); 
  await this.fetchContractValues();
  this.fetchContractValuesInterval = setInterval(this.fetchContractValues, 5000); 
}

componentWillUnmount() {
  clearInterval(this.checkNetworkInterval);
}
sendToBattle(){

}

toggleDevModal() {
  this.setState((prevState) => ({ isDevModalOn: !prevState.isDevModalOn }), () => {
    console.log(this.state.isDevModalOn);
  });
}


handleDev(){
  this.toggleDevModal();
}

  HoverOverPlay = () => {
    this.hoverover.play();
  }

  clickPlay = () => {
    this.click.play();
  }

  handleQueue = () => {
    // Handle the queue logic...
  }




  render() {
    const { currentPage, itemsPerPage, nftIds } = this.state;
    const { selectedAccount } = this.state;
    const shortenedAccount = selectedAccount ? `${selectedAccount.slice(0, 4)}...${selectedAccount.slice(-4)}` : '';
    const indexOfLastNFT = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstNFT = indexOfLastNFT - this.state.itemsPerPage;
    const currentNFTs = this.state.userNFTs.slice(indexOfFirstNFT, indexOfLastNFT);

    return (
      <div>
        {this.state.selectedAccount && !this.state.isSwitchButton ? (<div>
        <QueueButtonElement onClick={this.handleQueueClick} onMouseEnter={this.HoverOverPlay}>Queue</QueueButtonElement>
        <LeaderboardButtonElement onClick={this.handleLeaderboard} onMouseEnter={this.HoverOverPlay}>Leaderboard</LeaderboardButtonElement>
        <DevButtonElement onClick={this.handleDev} onMouseEnter={this.HoverOverPlay}>DEV</DevButtonElement>
        </div>
      ) : (<div>
        <ConnectButtonElement onClick={this.state.selectedAccount ? this.handleNetwork : this.connectAccount}>{this.state.selectedAccount ? "Switch Network" : "Connect"}</ConnectButtonElement>
        </div>
      )}
        {this.state.isQueueModalOpen && (
          <NFTModalOverlay>
          <NFTModalContent>
              <h2>Gnomes</h2>
              
                            <StyledUl>                   
                            {currentNFTs.map(nftId => (
                            // Incorrect location for console.log
                            <StyledLi key={nftId}>ID: {nftId}</StyledLi>
                          ))}
              </StyledUl>
                <div className="pagination-controls">
              <button onClick={this.goToPreviousPage} disabled={this.state.currentPage === 1}>
                  Previous
              </button>
              <button onClick={this.goToNextPage} disabled={this.state.currentPage === this.totalPages()}>
                  Next
              </button>
          </div>

              <button onClick={this.toggleQueueModal}>Close</button>
              <button onClick={this.sendToBattle}>Send to Battle</button>
          </NFTModalContent>
          </NFTModalOverlay>
                )}
                 {this.state.isDevModalOn && (
            <DEVModalOverlay>
            <DEVModalContent>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Smart Contract Values</h2>
              <div style={{ fontSize: '16px', lineHeight: '1.4', marginBottom: '20px' }}>
                {this.renderContractData().map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={this.toggleDevModal} style={{ fontSize: '16px' }}>Close</button>
            </DEVModalContent>
          </DEVModalOverlay>
          
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

export default Fight;





  
  