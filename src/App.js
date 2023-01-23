import styled from "styled-components";
import { useState, useRef } from "react";
import "./App.css";
import Check from "./Check";
import LandingPage from "./LandingPage";
import { Flex } from "@chakra-ui/react";
import { Howl } from "howler";
import Creatures from "./assets/sound/1.mp3";
import { useEffect } from "react";
import clickSound from "./assets/sound/hover.mp3";
const ButtonElement = styled.button`
background-color: #D6517D;
border-radius: 5px;
box-shadow: 0px 2px 2px 1px #0F0F0F;
color: black;
cursor: pointer;
font-family: inherit;
padding: 5px;
margin: 0 15px;
transition: background-color 0.2s ease;
&:hover {
  background-color: #ff5252;
  box-shadow: 0px 2px 2px 1px #FFFF00;
  color: white;
}
`;

function App() {
  const [buttonText, setButtonText] = useState("Music");
  const [showCheck, setShowCheck] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Check");
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(new Howl({
    src: Creatures,
    loop: true
  }));
  const clickSoundRef = useRef(new Howl({
    src: clickSound,
    loop: false
  }));
  useEffect(() => {
    soundRef.current.play();
    setIsPlaying(true);
  }, []);


  const SoundPause = () => {
    clickSoundRef.current.play();
    console.log("clicked");
    if (isPlaying) {
      soundRef.current.stop();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <div className="App">
      <Flex justify="flex-end" align="center" width="18%" padding="1%">
      <div className="button-container">
  <ButtonElement
    className="shake"
    type="submit"
    onClick={SoundPause}
    onMouseEnter={() => setButtonText("Music")}
    onMouseLeave={() => setButtonText(isPlaying ? "Stop" : "Play")}
  >
    {buttonText}
  </ButtonElement>
</div>
        </Flex>
        {!showCheck ? (
          <LandingPage
            onButtonClick={() => {
              clickSoundRef.current.play();
              setShowCheck(true);
            }}
          />
        ) : (
          <Check
            onButtonClick={() => {
              clickSoundRef.current.play();
              setShowCheck(false);
            }}
          />
        )}
      </div>
      <div className="moving-background">
      
      </div>
    </div>
  );

}

export default App;
