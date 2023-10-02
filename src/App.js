import styled from "styled-components";
import { useState, useRef } from "react";
import "./App.css";
import Mint from "./Mint";
import Read from './Read'; 
import Shop from './Shop'; 
import Stake from './Stake'; 
import Fight from './Fight'; 
import { Flex } from "@chakra-ui/react";
import { Howl } from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { useEffect } from "react";
import clickSound from "./assets/sound/hover.mp3";
import LandingPage from "./LandingPage";
import TwitterLogo from './assets/social-media-icons/twitter.png';
import TelegramLogo from './assets/social-media-icons/tg.png';
import OpenSeaLogo from './assets/social-media-icons/opensea.png';
import EtherScan from './assets/social-media-icons/etherscan.png';
import HGLogo from './assets/social-media-icons/HG.png';
import PatternImage from './assets/background/Pattern.png'; 


const TwitterLogoContainer = styled.div`
  position: absolute;
  top: 30px; /* Adjust the vertical position as needed */
  left:  calc(1vh + 1vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 1;
  img {
    width: calc(3vh + 3vw); /* Adjust the width as needed */
    height: calc(3vh + 3vw); /* Adjust the height as needed */
  }

  img:hover {
    filter: brightness(1.2); /* Increase brightness on hover */
  }

  img:active {
    transform: scale(0.9); /* Scale down on click */
  }

  &:hover {
    transform: translateX(-10px); /* Move the logo to the left on hover */
  }
`;
const HGLogoContainer = styled.div`
  position: absolute;
  top: 30px; /* Adjust the vertical position as needed */
  right:  calc(1vh + 1vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 1;
  img {
    width: calc(7vh + 7vw); /* Adjust the width as needed */
    height: calc(4vh + 4vw); /* Adjust the height as needed */
  }

  img:hover {
    filter: brightness(1.2); /* Increase brightness on hover */
  }

  img:active {
    transform: scale(0.9); /* Scale down on click */
  }

  &:hover {
    transform: translateX(-10px); /* Move the logo to the left on hover */
  }
`;
const TelegramLogoContainer = styled.div`
  position: absolute;
  top: 30px; /* Adjust the vertical position as needed */
  left:  calc(11vh + 11vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 1;
  img {
    width: calc(3vh + 3vw); /* Adjust the width as needed */
    height: calc(3vh + 3vw); /* Adjust the height as needed */
  }

  img:hover {
    filter: brightness(1.2); /* Increase brightness on hover */
  }

  img:active {
    transform: scale(0.9); /* Scale down on click */
  }

  &:hover {
    transform: translateX(-10px); /* Move the logo to the left on hover */
  }
}`;
const OpenSeaLogoContainer = styled.div`
  position: absolute;
  top: 30px; /* Adjust the vertical position as needed */
  left: calc(6vh + 6vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 1;
  img {
    width: calc(3vh + 3vw); /* Adjust the width as needed */
    height: calc(3vh + 3vw); /* Adjust the height as needed */
  }

  img:hover {
    filter: brightness(1.2); /* Increase brightness on hover */
  }

  img:active {
    transform: scale(0.9); /* Scale down on click */
  }

  &:hover {
    transform: translateX(-10px); /* Move the logo to the left on hover */
  }
}`;
const EtherScanLogoContainer = styled.div`
  position: absolute;
  top: 30px; /* Adjust the vertical position as needed */
  left:  calc(16vh + 16vw);px; /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 1;
  img {
    width: calc(3vh + 3vw); /* Adjust the width as needed */
    height: calc(3vh + 3vw); /* Adjust the height as needed */
  }

  img:hover {
    filter: brightness(1.2); /* Increase brightness on hover */
  }

  img:active {
    transform: scale(0.9); /* Scale down on click */
  }

  &:hover {
    transform: translateX(-10px); /* Move the logo to the left on hover */
  }
}`;
const OverlayPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${PatternImage}); 
  opacity: 0.5; 
  pointer-events: none; 
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
const ButtonElement = styled.button`
background-color: #D6517D;
border-radius: 5px;
box-shadow: 0px 2px 2px 1px #0F0F0F;
color: black;
cursor: pointer;
font-family: inherit;
padding: 10px;
margin: 0 15px;
transition: background-color 0.2s ease;
&:hover {
  background-color: #ff5252;
  box-shadow: 0px 2px 2px 1px #FFFF00;
  color: white;
}
`;

function App() {
  const [accounts, setAccounts] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("LandingPage");
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowheight, setWindowHeight] = useState(window.innerWidth);

  const [isPlaying, setIsPlaying] = useState(false);

  const clickSoundRef = useRef(new Howl({
    src: clickSound,
    loop: false,
    volume: 0.3
  }));
  const hoverSoundRef = useRef(new Howl({
    src: HoverSound,
    loop: false,
    volume: 0.5
  }));

  
  const loadingCircleStyle = {
    border: '16px solid #f3f3f3', // Light gray color
    borderTop: '16px solid #ff4500', // The color of the spinning section
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
    position: 'fixed',
    top: windowWidth >= 390 ? '40%' : '50%',
    left: windowWidth >= 390 ? '35%' : '45%',  // Adjust the left position based on screen width
    transform: 'translate(-50%, -50%)',
    zIndex: 300,
  };
  
    const contentStyle = {
      opacity: loading ? 0 : 1,
      transition: 'opacity 0.5s'
    };

useEffect(() => {
  setIsPlaying(true);
  document.title = "Hunger Games";
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = './assets/background/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);

  setTimeout(() => {
      setLoading(false);
  }, 1000); // This will delay for 5 seconds

  const handleWidthResize = () => setWindowWidth(window.innerWidth);
  const handleHeightResize = () => setWindowHeight(window.innerHeight);
  window.addEventListener('resize', handleHeightResize);
  return () => {
    window.removeEventListener("resize", handleWidthResize);
    window.removeEventListener('resize', handleHeightResize);
  };
}, []);

  function handlePageChange (pageName) {
    setCurrentComponent(pageName);
  }

  return (
    <>
    {loading && <div style={loadingCircleStyle}></div>}
    <body className="background" style={contentStyle}>
     
        <div className="App">
          <HGLogoContainer>
            <a href="https://gnomescollective.xyz">
              <img src={HGLogo} alt="HG Logo" />
            </a>
          </HGLogoContainer>
  
          <TwitterLogoContainer>
            <a href="https://twitter.com/YourTwitterHandle">
              <img src={TwitterLogo} alt="Twitter Logo" />
            </a>
          </TwitterLogoContainer>
  
          <TelegramLogoContainer>
            <a href="https://t.me/HungerGameserc20">
              <img src={TelegramLogo} alt="Twitter Logo" />
            </a>
          </TelegramLogoContainer>
          <OpenSeaLogoContainer>
            <a href="https://testnets.opensea.io/collection/gnomescollective-1">
              <img src={OpenSeaLogo} alt="Twitter Logo" />
            </a>
          </OpenSeaLogoContainer>
          <EtherScanLogoContainer>
            <a href="https://goerli.etherscan.io/address/0xeE594e309a4f49932e0421dA11AFd0a580EcB084">
              <img src={EtherScan} alt="Twitter Logo" />
            </a>
          </EtherScanLogoContainer>
          <Flex justify="flex-end" align="center" width="18%" padding="1%">
            <div className="button-container"></div>
          </Flex>
          {currentComponent === "Mint" && (
            <Mint
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
          )}
          {currentComponent === "Shop" && (
            <Shop
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
          )}
          {currentComponent === 'LandingPage' && (
            <LandingPage
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
          )}
          {currentComponent === 'Read' && (
            <Read
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
            
          )}
          
          {currentComponent === 'Fight' && (
            <Fight
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
            
          )}
                    {currentComponent === 'Stake' && (
            <Stake
              accounts={accounts}
              setAccounts={setAccounts}
              onButtonClick={(pageName) => {
                handlePageChange(pageName);
              }}
            />
            
          )}
          
        </div>
        <div className="footer">
          ©2023 HungerGames. Devved by Dev.
        </div>

    </body>
    
    </>
  );
  
}

export default App;
