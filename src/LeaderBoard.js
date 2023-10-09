import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import battleGnomesAbi from './assets/ABI/BattleContract.json';

const BattleGnomesAddress = "0x067aFf85dB2B8F10e3C459a1091c43692218319B";

const Container = styled.div`
  width: 550px;
  margin: 80px auto;

  @media (max-width: 550px) {
    width: 100%;
  }

  @media (max-width: 540px) {
    padding: 0;
  }
`;

const LeadHeader = styled.div`
  display: flex;           // Flexbox container
  align-items: center;     // Vertical centering
  justify-content: center; // Horizontal centering

  width: 100%;
  height: 70px;
  background: #000; // Use the exact color
  border-radius: 5px 5px 0 0;

  .gameRoundLabel {
    font-size: 18px;  // Adjust as needed
    margin-right: 5px;  // Space between the label and value
  }

  .gameRoundValue {
    font-size: 18px;  // Adjust as needed
  }
`;



const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background: #FEFEFE;  // Use the exact color
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 5px;
  text-align: center;

  &:nth-of-type(odd) {
    background: rgba(254, 254, 254, .9);
  }

  &:nth-of-type(even) {
    background: rgba(240, 240, 240, .9);
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  @media (max-width: 550px) {
    img {
      display: block;
      float: none;
      margin: 0 auto;
      width: 35px;
      height: 35px; 
    }

    .name {
      text-align: center;

      a {
        display: block;
        padding-top: 4px;
      }
    }
  }
`;

const Column = styled.div`
  padding-left: ${props => (props.rank ? "6px" : "0px")};

  h4 {
    font-size: 15px;
    cursor: ${props => (props.recent || props.alltime ? "pointer" : "default")};
    user-select: ${props => (props.recent || props.alltime ? "none" : "default")};
  }
`;

const Image = styled.img`
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #00A8E8; // Use the exact color
  margin-right: 10px;
`;
const Overlay = styled.div`
  position: fixed; // This will cover the whole screen
  top: 0;
  left: 0;
  width: 100vw; // Full width
  height: 100vh; // Full height
  background-color: rgba(0, 0, 0, 0.5); // Black with 50% opacity
  z-index: -1; // Place it behind the content
`;

const NameLink = styled.a`
  padding-top: 15px;
  vertical-align: middle;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(254, 254, 254, .9);
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,.2);
`;


const HeaderColumn = styled.div`
  flex: 1;
  text-align: center;
  cursor: ${props => (props.interactive ? "pointer" : "default")};
  user-select: ${props => (props.interactive ? "none" : "default")};
  font-size: 14px; // Reduced from 15px as an example.
`;


const UserRow = styled(Row)`
  text-align: center;
`;

const UserColumn = styled(Column)`
  &.name {
    text-align: left;
    font-size: 14px; 
    @media (max-width: 540px) {
      text-align: center;

      a {
        display: block;
        padding-top: 4px;
      }
    }
  }

  img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #00A8E8;
    margin-right: 10px;
  }
`;
const AliveEntitiesList = ({ entities }) => {
    if (!entities || entities.length === 0) {
      return <div>No alive entities found.</div>;
    }
  
    return (
      <div>
        {entities.map((entity, index) => (
          <div key={index}>
            <span>ID: {entity.id}</span>
            <span>Name: {entity.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  AliveEntitiesList.propTypes = {
    entities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  };
  
class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
          contract: null,  // Make sure to initialize contract in state
          contractValues: [], 
          list: [],
          currentPage: 1,
          itemsPerPage: 10, 
        }
        this._clickAllTime = this._clickAllTime.bind(this);
        this._clickRecent = this._clickRecent.bind(this);
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
        console.log("DEBUG1");
        try {
            console.log("DEBUG2");
            const { contract } = this.state;
    
            // if (!contract) {
            //     console.log("DEBUG3");
            //     console.error("Contract is not initialized yet");
            //     return;
            // }
            console.log("DEBUG4");
            const queueCount = await contract.queuecounter();
            let aliveEntities = [];
    
            for (let i = 0; i < queueCount; i++) {
                const isDead = await contract.dead(i);
                if (!isDead) {
                    aliveEntities.push(i); // or any other data you want to save for this entity
                }
            }
    
            const roundsCount = await contract.roundsCount();
            console.log("DEBUG4");
            this.setState({
                contractValues: {
                    queueCount: queueCount.toString(),
                    aliveEntities: aliveEntities,
                    roundsCount: roundsCount.toString()
                }
            }, () => {
                console.log("Contract values fetched:", this.state.contractValues);
            });
    
        } catch (error) {
            console.error("Error fetching contract values:", error);
        }
    }
    
      async componentDidMount() {
        await this.initializeEthereum();
            await this.fetchContractValues();
            this.fetchContractValuesInterval = setInterval(this.fetchContractValues, 5000);
      const fetchInit = {
        method: 'GET',
        mode: 'cors'
      };
  
    fetch(`${ this.props.apiURL }`, fetchInit)
        .then(response => response.json())
        .then(data => {
          this.setState({
            list: data
          });
        })
        .catch(err => console.log('fetch error : ', err))
    }
    handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({
            currentPage: currentPage + 1
        });
    }
    
    handlePreviousPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });
        }
    }
    
    componentWillUnmount() {

        if (this.fetchContractValuesInterval) {
          clearInterval(this.fetchContractValuesInterval);
        }
      }
      
      _clickAllTime(e) {
        const sorted = [...this.state.list].sort((a, b) => b.alltime - a.alltime); // Create a new sorted array
        this.setState({ list: sorted });
      }
  
      _clickRecent(e) {
        const sorted = [...this.state.list].sort((a, b) => b.recent - a.recent);  // Create a new sorted array
        this.setState({ list: sorted });
      }
      render() {
        const { currentPage, itemsPerPage, contractValues } = this.state;
        const aliveEntities = contractValues?.aliveEntities || [];
    
        const mappedAliveEntities = aliveEntities
            .filter(entityId => entityId !== 0)  // Skip entity with ID=0
            .map((entityId, index) => ({
                rank: index + 1,
                entityId: entityId,  // Pass entityId down
                username: `NFT ${entityId}`, 
                recent: 0, 
                alltime: 0, 
            }));
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = mappedAliveEntities.slice(startIndex, endIndex);
    
        // Now render the component...
        return (
            <Overlay>
                <Container>
                    <LeaderboardHeader contractValues={this.state.contractValues} />
                    <ColumnHeader onClickAll={this._clickAllTime} onClick={this._clickRecent}/>
                    {currentItems.map(entity => (
                        <User 
                            key={entity.entityId}
                            rank={entity.rank}
                            entityId={entity.entityId} // Make sure to pass entityId here
                            username={entity.username}
                            recent={entity.recent}
                            alltime={entity.alltime}
                        />
                    ))}
                    <div>
                        {this.state.currentPage > 1 && 
                            <button onClick={this.handlePreviousPage}>Previous</button>}
                        {currentItems.length === this.state.itemsPerPage && 
                            <button onClick={this.handleNextPage}>Next</button>}
                    </div>
                </Container>
            </Overlay>
        );      
    }
    
    
    
      
  
  }
  
  const LeaderboardHeader = ({ contractValues }) => {
    // Extract roundsCount directly from contractValues
    const roundsCount = contractValues?.roundsCount;

    // If roundsCount exists, render it, otherwise, return null or some default value
    return roundsCount ? (
      <LeadHeader>
        <span className="gameRoundLabel">{"Game Round"}</span>
        <span className="gameRoundValue">: {roundsCount}</span>
      </LeadHeader>
    ) : null;
};

  
  
  // Proptypes if you want to validate
  LeaderboardHeader.propTypes = {
    contractValues: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  
const ColumnHeader = ({ onClick, onClickAll }) => (
    <HeaderRow>
      <HeaderColumn><h4>#</h4></HeaderColumn>
      <HeaderColumn interactive onClick={onClick}><h4>Potions Used</h4></HeaderColumn>
      <HeaderColumn interactive onClick={onClickAll}><h4>Round Wins</h4></HeaderColumn>
    </HeaderRow>
  );
  
  
ColumnHeader.propTypes = {
    onClick: PropTypes.func,
    onClickAll: PropTypes.func
}

  
const User = ({ rank, entityId, username, recent, alltime }) => {
    return (
        <UserRow>
            <UserColumn className="name">
                <NameLink href={`https://testnets.opensea.io/de-DE/assets/goerli/0x3acacdfbf7fe223d42031a2cd185e232d911405f/${entityId}`} target="_blank">
                    {username}
                </NameLink>
            </UserColumn>
        </UserRow>
    );
}


  
User.propTypes = {
    rank: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    recent: PropTypes.number.isRequired,
    alltime: PropTypes.number.isRequired
}
  
 // ReactDOM.render(<LeaderBoard apiURL='https://fcctop100.herokuapp.com/api/fccusers/top/recent' />, document.getElementById('app'));

  export default LeaderBoard;