import styled, { keyframes } from "styled-components";
import { useState, useRef } from "react";
import "./App.css";
import Mint from "./Mint";
import Read from './Read'; 
import Shop from './Shop'; 
import LeaderBoard from './LeaderBoard'; 
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
import LoadingAnimation from "./assets/Items/Caldero.gif"

const size = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};
const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
  tv: `(min-width: ${parseInt(size.desktop) + 1}px)`
};
const TwitterLogoContainer = styled.div`
  position: absolute;
  top: 35px; /* Adjust the vertical position as needed */
  left:  calc(1vh + 1vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 200;
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
  top: 35px; /* Adjust the vertical position as needed */
  right:  calc(1vh + 1vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 200;
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
  @media ${device.mobile} {
    img {
      width: calc(6vh + 6vw); /* Adjust the width as needed */
      height: calc(3vh + 3vw); /* Adjust the height as needed */
    }
    right: calc(.4vh + .4vw);
    top: 37px
  }
`;
const TelegramLogoContainer = styled.div`
  position: absolute;
  top: 35px; /* Adjust the vertical position as needed */
  left:  calc(11vh + 11vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 200;
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
  top: 35px; /* Adjust the vertical position as needed */
  left: calc(6vh + 6vw); /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 200;
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
  top: 35px; /* Adjust the vertical position as needed */
  left:  calc(16vh + 16vw);px; /* Adjust the horizontal position as needed */
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition effect */
  z-index: 200;
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
const LoadingGIFContainer = styled.div`
position: fixed;
top: 50vh;
left: 50%;
transform: translate(-50%, -50%);
width: 150px;  // You can adjust as needed
height: 150px; // You can adjust as needed
text-align: center;  // Added for aligning text
z-index: 300;

img {
  width: 100%;
  height: 100%;
  display: block; // Makes the image a block element to push the text to the next line
  margin: 0 auto; // Centers the image
}

p {
  margin-top: 10px; // Space between the image and text
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;  // Assuming you want white text

`;

function App() {
  const [accounts, setAccounts] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("LandingPage");
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowheight, setWindowHeight] = useState(window.innerWidth);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fadeLoading, setFadeLoading] = useState(false);
  const [fadeInContent, setFadeInContent] = useState(false);
  const fadeInStyle = fadeInContent ? { opacity: 1, transition: 'opacity 0.5s' } : { opacity: 0 };
  const [modalContent, setModalContent] = useState(null);



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


const contentStyle = {
  opacity: loading ? 0 : 1,
  transition: 'opacity 0.5s'
};

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };
  const determineLeftValue = (width) => {
    if (width >= 2560) return '47.8%';
    if (width >= 1440) return '47%';
    if (width >= 1024) return '45%';
    if (width >= 844) return '42%';
    if (width >= 768) return '42%';
    if (width >= 500) return '42%';
    if (width >= 425) return '38%';
    if (width >= 390) return '38%';
    if (width >= 375) return '35%';
    if (width >= 320) return '32%';
    return '45%';
}

  const determineTopValue = (height) => {
      if (height >= 844) return '850%';
      if (height >= 425) return '38%';
      if (height >= 390) return '35%';
      if (height >= 337) return '32%';
      if (height >= 320) return '30%';
      return '45%';
  }


  const leftValue = determineLeftValue(windowWidth);
  const topValue = determineTopValue(windowheight);


useEffect(() => {
  setIsPlaying(true);
  document.title = "Hunger Games";

  document.body.style.backgroundColor = '#4a5462';

  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = './assets/background/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);

  window.addEventListener('resize', handleResize);

  setTimeout(() => {
    setLoading(false);
    document.body.style.backgroundColor = ''; 
  }, 2500);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);


  function handlePageChange (pageName) {
    setCurrentComponent(pageName);
  }
  useEffect(() => {
    if (!loading) {
      setFadeInContent(true);
    }
  }, [loading]);


  const loaderElement = !fadeInContent && (
<LoadingGIFContainer>
  <img src={LoadingAnimation} alt="Loading" />
  <p>LOADING..<span className="blinking">.</span></p>

</LoadingGIFContainer>
);
  
  return (
    <>
    {loaderElement}
      <body className="background" style={{...contentStyle, ...fadeInStyle}}>
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
          
          {currentComponent === 'LeaderBoard' && (
         <LeaderBoard
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
        <div className="top-footer">
        <span className="footer-item">| Prizepool: [10.5 ETH] |  </span>
        <span className="footer-item">Total Poured: [25.3 ETH] |  </span>
        <span className="footer-item">Minted: [1333] |  </span>
        <span className="footer-item">Potions: [25312] |  </span>
        <span className="footer-item">Burned: [300M HGMS] |</span>
      </div>

      {modalContent}

    </body>
    
    </>
  ) ;
  
}

export default App;
