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

import hgmsTokenAbi from './assets/ABI/HungerGames.json';
import GCAbi from "./assets/ABI/GnomesCollective.json";
import {ethers, BigNumber} from 'ethers';

const hgmsTokenAddress = '0x73229e7c7d8f9276e7a69cb0cc22ec503cf9c7c6'; 
const GnomesCollectiveAddress = "0x3acAcDfbF7fe223d42031a2cd185e232D911405F";




class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    
    }

render() {
    
    return (<div></div>
            );
          }
}
  
export default Shop;