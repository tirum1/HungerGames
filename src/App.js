import styled from "styled-components";
import { useState, useRef } from "react";
import "./App.css";
import Mint from "./Mint";
import { Flex } from "@chakra-ui/react";
import { Howl } from "howler";
import HoverSound from "./assets/sound/click-21156.mp3";
import { useEffect } from "react";
import clickSound from "./assets/sound/hover.mp3";
import LandingPage from "./LandingPage";


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

  const [isPlaying, setIsPlaying] = useState(false);

  const clickSoundRef = useRef(new Howl({
    src: clickSound,
    loop: false
  }));
  const hoverSoundRef = useRef(new Howl({
    src: HoverSound,
    loop: false
  }));

  useEffect(() => {
   
    setIsPlaying(true);
    document.title = "LuckyGnomes";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = './assets/background/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);


  function handlePageChange (pageName) {
    setCurrentComponent(pageName);
  }


  return (
    
    <div>

      <div className="App">
      <Flex justify="flex-end" align="center" width="18%" padding="1%">
    
<div className="button-container">

 </div>
        </Flex>
    {currentComponent === "Mint" && <Mint accounts={accounts} setAccounts={setAccounts}
             onButtonClick={() => {
              clickSoundRef.current.play();
              handlePageChange("LandingPage");
                             }}
                           />}
                           {currentComponent === 'LandingPage' && (
          <LandingPage accounts={accounts} setAccounts={setAccounts} onButtonClick={() => handlePageChange('Mint')} />
        )}
      </div>
      
      <div className="moving-background">
      
      </div>
      
    </div>
  );

}

export default App;
