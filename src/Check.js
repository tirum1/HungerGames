import styled from 'styled-components';
import React, { Component, useState, useEffect } from 'react';
import"./App.css";
import { Box, Button, Flex, Input, Text, Link} from '@chakra-ui/react';
import Creatures from "./assets/sound/1.mp3";
import hover from "./assets/sound/hover.mp3";
import {Howl,Howler} from "howler";
import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');
const audio =[
    {sound: Creatures, label:'Sound'}
]

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




const FlexContainer = styled(Flex)`
  height: 110vh;
  padding-bottom: 150px;
  
  @media (max-height: 80vh) {
    height: 80vh;
  }
`;

const BoxContainer = styled(Box)`
  width: 580px;
  
  @media (max-width: 768px) {
    width: 80%;
  }
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

class Check extends Component {
    
    // SoundPause = () => {
    //     if (this.state.isPlaying) {
    //         this.sound.stop();
    //         this.setState({isPlaying: false});
    //     } else {
    //         this.sound.play();
    //         this.setState({isPlaying: true});
    //     }
    // }

    constructor(props){
        super(props);
        this.sound = new Howl({ 
            src: Creatures, 
            loop: true 
          });
        this.hover = new Howl({ src: hover });
        this.state = {
            address: '',
            result: null,
            retryCount: 0,
            hover: false,
            color: 'black'
        }
        let LuckyGnomes = [			
            "0x3c9290e5985614Bc724ddc72011c54F4446b6Ef2",
            "0xbB859Bd42C1473c21C9849392eA31794C23A5c52",
"0xaaC0d136dC2Fd4e5E0ce900a64662B85a17f99ee",
"0x680180Da3c5e8c7B1e527E993939970C0CE0FC3e",
"0x8f1B03B58c22B8798a35f2A10e5E18769c672C1d",
"0xDc8eC00C073589Aa0C9a2f0E889448931D4B253E",
"0x45b89d3959220970858F4bE54CB900b53e22F07e",
"0x02299E4C9c33FacF7d960f33Bb7Fc2993A77e965",
"0xd8B97a33Efb2e81B252e8bf5b02785f9973a3EE6",
"0xF90C0c2A6257fa290A937B5194D08e5E41624c0F",
"0x6705DF81A38C85510Ed00aB961cED7482E05AF35",
"0x288E023b54670F7C489BB0B3336C63d8712D66da",
"0x0CDa9DD05e52D09e02d90347398627C0316cBcB0",
"0x071D147b99C09a9deE656A06132A40E54434AF1a",
"0xe2C7bF44e719082Ef6E3022aeFDe4876f0Dda21B",
"0x6f4E8096e4fa46AF0534db16708910008040e566",
"0x1cA49623b5d5d78Caa6ccbB8E828aaDAC990DA0A",
"0xd8FBb54edF49ed0783d5c79440a168c353780753",
"0x90C676fBe75df48b83aB596364646588Ae535385",
"0x2f0df65c444B35b3CbCE0EFAeCD9C9750612e136",
"0x6d0Dc2CA7467F5b38E9b4506C344B99996b5cd0c",
"0x2838032d8FbE767f86c3C5a300e2B379917A3476",
"0x0dE365d28e92213b35c1c0B066331ed6BE0Bd5E6",
"0xC6d4c47aD61607e3BC80b0e85CC5B3DD93CE8F5d",
"0xE31BB9D024A823d03e98E158e81c87Db7A3454e2",
"0xA54d14640a7E874B85D76041b4791E646728B325",
"0xa17F11B182fc1Ea02dBff64A2c814Df5eE5495e7",
"0xF7Eb1c7f8b750840Fd38A298CfcDF83F56e70884",
"0xaE5faD3ba62a70b34A17005cE2cB465B2Ee2430e",
"0xdCcf21d69267C9435FE2b4BcE17985b6698e163A",
"0xF60eD9B7FeFB29Cd2a79b737D4e4eD28180972f8",
"0x026d3bD0F6aD3977EC3F2E5d9ff0667634b6DC70",
"0x47C152A5a60c6cac213D7B6cCf8784032B110A2A",
"0xe455423d2d9133bA3Ef1121D58Bd7aAB73077491",
"0x033fb4a29E8641500710C77037dd40Dd84E40b19",
"0x29A3c67f2a4a50250342d23748beEd0c19349605",
"0xe09136166C1B56FA3ef732872673ec3092031332",
"0x1192FBc30f019eBA6b81588ac2341FE1216AdF93",
"0x9775268fc9CAc77697D3211b7e547026c628eD76",
"0xdA38AFF9D34fF382F12a1De111A10491566B9876",
"0xF43E00E64574596b43f48a34CA84956Ab527FD72",
"0x714e075198636956785B4cC08Be1C70d9361C445",
"0x6140aa690a41e907d74F844d722c237D9796C1AC",
"0xDad32Fc8B47190eb3CB2d3AD9512f894E1762a2C",
"0x8129035991f8D9D7CE2787E9591800e38303Cc8a",
"0x8afeA3F31828F1E70c2c0CacF38F874Fc3a4C4c6",
"0x3cD3F81e1F7A2D11bbAd593821a52184294768a7",
"0x6140aa690a41e907d74F844d722c237D9796C1AC",
"0x0f54143169170BdB8064A9E32EA6CBc32E490fE6",
"0xa2fF79431f7fC4d1f1Db88B94C9C6a0FE92376Ac",
"0x61C46B6b1f4Fc59dcBc7a8676f0432b66f61Cc73",
"0x0AF009194CabF04876B3F0D3a64ef2Ce48df7569",
"0x3cE735F6cFAD70D8A689774E69695A98fb12920b",
"0x0f54143169170BdB8064A9E32EA6CBc32E490fE6",
"0xce3b5695deE26dfcBfa0b4E217c43638A7457C14",
"0x3a80E195e707b4983c4AfF876B8A7cBB1444E905",
"0xd74AAFB161ABf14bd86c29e3CA0a2EEFa2b54B79",
"0x312026648c69DD893797fa0b2eC9f5a99f9332E2",
"0x105de362AB1C4B20EeDc1528335cf3878CC6c0cd",
"0x2838032d8FbE767f86c3C5a300e2B379917A3476",
"0xe455423d2d9133bA3Ef1121D58Bd7aAB73077491",
"0x6f4E8096e4fa46AF0534db16708910008040e566",
"0x83622e062142c6D297f9B8f7a0e6537eE2Db3e43",
"0xE9e969207C02533e24783E397106BB6D2e47c00E",
"0xE221b7f3E5D9a3484ba8a799AE7F813820860C57",
"0x25FdB5688d697eDe28A35B5057f1A3daf7c3647a",
"0xc908eBd8D0C40546E8E3ca3f3a80dbc1e8Fa01E5",
"0x5dC70D8Be1c4bDDb76C65120De9b64198590CC6D",
"0x50aCf361E07ED95DF690C780a0793e44b4a20192",
"0x9E1C0BedbcBE78F2C6d1335D976E4EaBF84264d9",
"0x47C152A5a60c6cac213D7B6cCf8784032B110A2A",
"0x35a214b13c9E223B8D511f343aC8Fa94293233a1",
"0x128c64963F518E9A2C72F6c0B5f5AC26d506aC4d",
"0xD2615a44fa8346D8630d9B3e24146b844c8Db507",
"0xB9cF5601dCF561d544a82578759304338F280c3B",
"0x0575cf9Ec75e96932BfddCC442cEe6690F621C9a",
"0xC39b2e5dCC628df722191e808505f276A217c5b4",
"0xDad32Fc8B47190eb3CB2d3AD9512f894E1762a2C",
"0x09a22A6e37167FC1951e783d2dE7B9861c41f71b",
"0x5565d845372964b3B5cA0fF38cA88fEC1Bae4851",
"0x2586b8Bc2B92FeDaCEC05Eb5b2c06289BDcB9758",
"0x9B2DD174210eC09e51b83189A9258c20Db252631",
"0x62A82c99c6AEddBB2C4429118f8281bc7820e741",
"0x9384Df9cFdeF8773E1aAb32fDCC8E9bb7Ed0EA2f",
"0x07422ceF7d14556db51DcC429ae9CB5A88cACed0",
"0x57FEbDf01bf66B92C8a0107DEA832673aeF6381a",
"0x2F24710750D8944B7F8cCa2643F09bB3FA842faa",
"0x900Cc280Ece775c5426ce874D5beA66b17277aE2",
"0x170d54cC598CF3875Af833bfd1e0Dd2Dd58F4B0d",
"0xC931baaa62BFDf09beDDE1ebd3de16C05AbB33e6",
"0xBd25f53D1e49358CAc7E5061f6aDBEdEf3979D98",
"0x972fB92aF6462FfF526f719FDA4281145F2bcd15",
"0xeA5743D7f04653fFA5099c8B916B3E416d19bd21",
"0xb6CC2F281e1656175B3Ee89d296363CD60CB960f",
"0x4C68f3639c1bA805E52986349d35c499592D406e",
"0x99152812192C474C50d6f36324D9e7772a777913",
"0x617d63bF8aB327fd6Ed9b89a5F17ee823961044F",
"0x787d92ad51E3467cF3F66D814c1e0dd0c0D9BB85",
"0x1416e20d666aE4aB9a8cF3FF05a77c054f700F30",
"0x4975a608E4EDCC38f2c3435Ca63327BB2c6c8A25",
"0x08aF359f2492fd70D3E4A117B0eCbf8Fb8557c3F",
"0x252a0f3ed636BCC8c10183Dc4C722c8DE024Bebb",
"0x894648F4797Ff67d1861A71F0B77ABF5D35b9760",
"0x4f8C19ae8aA24b98Ffd9c8B88b6FD75cfcB63b0d",
"0x2a3234Bb2Ada7efF7D8f5Fe6fABf0eAd110D9AC0",
"0xa41d7cca4F220c286cF1B6D408882ACA4dd3130d",
"0x8C28989D99059960223Bd600Cd7451d707b294F6",
"0x40282fb345bCFc7579d02AB5fcD50503f6114cB5",
"0xD938722718F97F717297eFc904232FFB9dF919B4",
"0x5bD1bD69eC0e87639a9b657A838A3Ce26d281CaD",
"0x4A346b08A5f939a1c707F0e40b2f8a6b59D26a20",
"0xd74Baa483da05E195804F6A8f6636C9f0C7aCFC2",
"0xd32F0E6Dde11E95E26497a79a31554B19C464997",
"0x3c011FD929500B9e504D2Cb50F265595a8e7CC5D",
"0x46a0907595a0Da3F45b8ac70a4e563593a0b3379",
"0x3F3Bd4457e80868f563Bf60671C1A79bc1a14b8A",
"0x5499931aA515CED9D4946cC1590439268c3Db8F8",
"0x154D9d4c92fCFa1C461f6946e2F287365eD3CA09",
"0x30ecE5B508e58deb520cf71ba8F69CDA3472fDf3",
"0xfa2236A34042bc622C44d031328b465973c3d140",
"0xA39405206CcD73778Fe677BB7f8eAf0404eD4C22",
"0x63fddce2718C655aAd16166BC696dA1a111e254b",
"0xD0476bE41995B8dE49ab5Df7Bb3e930B42261Ad4",
"0x3aAAE5C3c0f1F3b239cb6a5F02e105674De13bB2",
"0xEC491B54C54Ad53aDe796464d7Bf33fC7a51129B",
"0x058df57e7CCD5480C250b56B4024B0Fc61657cD3",
"0x754C00d07fEe18905D8B27F3EC890b93846a5312",
"0x4F03d95aF246C7cbbc9E4fC1859974945ef418a1",
"0x3E1f996345BF39aBb45E493E7b2f49e36e32504f",
"0x70e3cc5EAb809984a92a141BE800098dA1d85a78",
"0x8eAb27eBA895CE5471E92069c78a61c7Cabe8299",
"0x90FF3ACa423150Fc69703A6d8320e93A6624c74D",
"0x5794C30A3Bc498928170B0d65A10893e2cC4BcBB",
"0x232AAEe8F202A48EAC9c8F2f04074DF8dd2f5F71",
"0x70a29b1BCeD6453A68Bb6B25a48993Cf565312aa",
"0x28FfE7F5ae14E2222e857460814BfA1Ad60Fe67f",
"0xF785334f4f68340f48CeC24A9bE8ecAE5dC027B4",
"0xb90335e55ea544676C27ecf450d520c935270e4E",
"0x9b2E28cF818d1D3369AC1572D9f1698328f4F00f",
"0xa9EA7a50BFd7a254Bf92A7457fEbc935c5c61F94",
"0xC33964f4EeC0aed852aae04b5e3Fec8a7617200e",
"0xf6f78af747971352f5Cda9669E4EbA572bF839D7",
"0x973d44Ec1f4a23B29f07E435a09B5E2eE3400A92",
"0xcd07c39832191431C4Cd8b44a33af355711edDaF",
"0xC05F16b106C4092672219e7C5503BA1704995AF7",
"0x9a5cc0560c4ED2ebD5fa2dB646D8AC7E4820f80e",
"0x2f6C73FD2605c15D0580357AeDbeF131F4a8A8a1",
"0x7B2c1C3B0C00739199D3E9576A7e469eCf0782EA",
"0xDb2308EAaEe35deb05082B5AB3e87f0dA05A4279",
"0xd84e99c6e6B92C8652acABE92115f5d54A5713C5",
"0xdC084a84944939e25Dc0b13F3eaAe0726921B2D5",
"0x15e40210c549EF7F352893d27aC82eaDA8027cE2",
"0xd68d52D216a6423fbCB3Fce43BA6719adA0c6EaE",
"0xE0E5E0389D1A9DcFBc4BEc918C7b49cfe8C1b4C2",
"0x71725c908FFdb6F4c89AC418D39404E574d24945",
"0xa4bE81D87aAA36F995adCce282B43Efb5236B61A",
"0x0317B899d2886d515718495c3317e25B3134D55D",
"0x0A3152882AA0B0949Aee58ee708eB6941e25E3b7",
"0xc5555798C0F46016280B62871a879a13064D2336",
"0x47C152A5a60c6cac213D7B6cCf8784032B110A2A",
"0x0D117f48ea83b95A22417D92993513242C1f21F1",
"0xC25d4DE6C695b43bC52Aa50915bFEE08e0467206",
"0x00101a08f44B9DA944D09c4F1fbCAd9C8FDf0412",
"0xF78EA7Dd78e3236Bd1007F399eB01c6BD2D02005",
"0x3249Ce9C6B6eeecBf46445E4359156FFBFcC4Cfc",
"0xFeD07C07ca5Ab8B5487eCC2e13be2B89BC6336B1",
"0xB480c5B259126553c915714474C377C8E52afD70",
"0x7fA23F37407cA9d33063eeBC7F719F02b0B6092b",
"0xA4D1fEe872e661C65Dbbfb3e5B1c51aD2Dc4db03",
"0x3c9290e5985614Bc724ddc72011c54F4446b6Ef2",
"0x5Fd077178b465A05Be8E8ceDEA54ea09d730301B",
"0x0A59Cc1028A6373C27Dede6DB6058d1f155254A2",
"0xF3112F3Cfe1096de61a2B428Cb2Bc0343e0F29Fb",
"0x77B783eAEa2DA8389F141fbD6ceCef03848Ce64c",
"0x040ffc7A9Ce9bE3F0263AA18453a6FF9B32CC371",
"0x167Fa06221b36E7eDdFA2e3245184575703D9414",
"flyshit.eth",
"0xE422E606b2dbbbC9e4d22BFa265c903C865bdAd5",
"0xad7E838C7dD4b79CF10C851d44fff3242EACA18f",
"0x1747a687Ab4d1b7a739b07e261930eF8014878a6",
"0xC518B9fd7e8D894435c711232eAD9AF0415ce1eD",
"0xcd36aa8f991D7238A60FdB7693046e45De9ce413",
"0xc96241a245FDC66858ADdBD59557b31064aB4dAD",
"0x82e23103Ebf463ECB9C58985294006939A1467cB",
"0x1Ab24A277C41cBCb945CF0bE982889A07f3697f3",
"0x2Bb77e7B7e8f104b4C584021B3BA4276faE1F840",
"0xbBfd7A1F37a84bD75ec8557B464DDC9B70Af4852",
"0xfB4cD1bc8B7498fbfA29a910dF11369A381Ac10a",
"0x2b35B48EF2BB3f1BC27e00b1580a4D7501e53874",
"0x41ec094daA32423a183a3fd2a5422Dfb2cAf6E53",
"0x77Fc4eA0e4bdf14C5c6b85F7ca7E5B217Dcc72F3",
"0xAf9420eC811ca8033a22922e26d614792538d53a",
"0xDe68a3155D64B5F6B8fAd0e4e5CF4fC17cE5346d",
"0x9CEdfE562541e3CAA9F88fE259955AA52e07Cf5E",
"0x9B520CC47332ED0f7e49B95Acd5383E8615ae164",
"0x7217c31D8Cf12657e2Cc6a1c54E9FBf991A28561",
"0x2b010915dd4490D4D8D7A535CEd0C32071cA172c",
"0x68e1b05B2AE98e1aE174E5C6640dfC0231dD6A4c",
"0x01Df47e31b9bb354D1841798908Ce3848CbDBE45",
"0x3a80E195e707b4983c4AfF876B8A7cBB1444E905",
"0xd47C113f9172170baAe62a7eBea629a079bc2114",
"0xe549e4Fae5599943B57F8A2FD556b0B42331BAC3",
"0x9224060CdfF5191507365CD7838e52dA9f6b7179",
"0x61d5f686847a9C8542b0E02cF16f101135106709",
"0x9953b7723EEc584Eb8A4599d8492a13A65F99A0f",
"0x0E204E46A52f1C701E54eFD525062A4da96f2b59",
"0x18929e2357EcC852d6064DdC67648F00eC0699ae",
"0x922e025792E9Fb8CdbbE2b077045fAe71c82128f",
"0xeea2eE6895Cb5a37B435a20bAA5d96b4544184fA",
"0x2e8cCE5295fB4e303d75cA130E7284C97f5Ad8f5",
"0x4C9DCeF5FF128c97184AcDf6f284BBb1703A227b",
"0xEa388cFDd9a846f459Cb130f15A80CBF80f27c54",
"0x1617b0b344D09aEEb0b2E573ccdc9b071f06c278",
"0x74356542fcA8F2b11C8D34a3C65042851b30Fa92",
"0xA8eed2635d40EBe072540e8f43369035480F877C",
"0xfb8739dA95d824d1303599642aAb975FB073F622",
"0xB9cF5601dCF561d544a82578759304338F280c3B",
"0x6d0Dc2CA7467F5b38E9b4506C344B99996b5cd0c",
"0xC39b2e5dCC628df722191e808505f276A217c5b4",
"0xca229e409a7353F19587faaeF8fDAd052431B279",
"0x143A78B670A1618A4984deb4F450c67aCBd6EF68",
"0x9cc05c7174d0E2ad859e215301dfB43A4baA8C72",
"0xfC108AEA78345451656A35A25BdF16d57adFBe01",
"0x5C202A6D33492B2fAC0c0B8BD139606C9e8D1a5f",
"0x60B338691ca75Ac668DbB1C426E220f7b628C800",
"0xbB65f0941dD4837FE922b27c9d38D7b3c9E944a5",
"0x2Cc5143bFa8b8b381121f63D2FB2eB1fFe116429",
"0x5f54D6DD3F35A4f5f40FB6E901F58cDb11c25E6C",
"0x407e7e826613e72c2226493c7019c2B4aa31D5b8",
"0x0fcf53C6fE2c21904FF6c651b1fDDFDed642277B",
"0xC650B904c6d55bD4f09Cf8bDBB8F0a71A46429B3",
"0x4425e36E96ef4A47bFA39C65174ac4Cc93dB6829",
"0xe455423d2d9133bA3Ef1121D58Bd7aAB73077491",
"0x1f75Ff538349269b10D7c7681cd1FFa62cABAB74",
"0x6645B730Cf6077720D541cDF2316Ba676D255EFc",
"0x12b076563894D00633064BA943094D47CCE758e0",
"0x03698aa6df9d604D51469738BE5f00F258660Cff",
"0xD295dc147C902D631ef679Badaa6706Ca3a80751",
"0xEFF72fa850dDC0CeE566504F08c1661da5ed53e5",
"0x6681922c02730Eb6F01ea6C6f7b0d56bB7f549B1",
"0x5dC70D8Be1c4bDDb76C65120De9b64198590CC6D",
"0x1cF9fDD6023A908a98C4Ff58Cd2d752197124393",
"0xDF3b1A47393d2fB4080f6083c05EBBB454f58Bf5",
"0xd91ad3ae3931f87E77aDd853571C70F9EA5d634F",
"0x3Fc70e0b22a2979c650dc0Ff835aE42A68755166",
"0xC42F1cfE61c242F3AFEf6e7ed68Ba979E9f0749E",
"0x243ABC822a0D47d20aF03031207724bFa2357EB0",
"0x51646CE1fa528297f95859b61C957d419eDF09F6",
"0x470e3C8eb305c021b8b7e5C873a01528eC93f2B4",
"0x08B07bc6BADF2cc56e0dda9e77b25a91D3b71B66",
"0x250104be9c39ff2F71540Cf3545C072dDbB56498",
"0x90EC73F9f1A4021055B0E7BdE3568701BB3dC632",
"0x3d9D5e2996292A5ddBE975Ed217aFD8B8344d839",
"0x056D0F48E1FA94333A09B2215ea9aA6D2b78E470",
"0x5565d845372964b3B5cA0fF38cA88fEC1Bae4851",
"0x5c368C03637625C3A1DCa9eA24fde9530Da80FE1",
"0x2586b8Bc2B92FeDaCEC05Eb5b2c06289BDcB9758",
"0x506B7c9692117DdEbB14D19d3C7cE1e998DBA11a",
"0xd324163e52d312184f9e95f31D35475b59ab8919",
"0xca06fBDE588a97C4E16A844494D387087337147F",
"0xBA8e38e7Ff9F2b175880C53A432151Ae84A4Ad1C",
"0x6BC43546f2FCF0bFD40D0FFB025899134F5Aa895",
"0x69286756bb947aeFF60696519E496127f9cF654f",
"0x9B2DD174210eC09e51b83189A9258c20Db252631",
"0x4871990d43c0Cf15408A22ded2dAc082CAF90Ce0",
"0xEE7094B0D871b9c86d6205A560E6b7f7F3934EaE",
"0x11Df643Cb599E409228cB36e5081fB39E4fBd029",
"0xB3689e2aee1B147C7A229587778E1BcCafE3Be58",
"0xaE6D28aA68096CFD12a71beCbBEb9B0e56c873E6",
"0xD0253dc692a18c3633d0d64C99c45815d432Ab89",
"0xb428B59800C6077aCbEA49FeBCCA6B558b635361",
"0x1f75Ff538349269b10D7c7681cd1FFa62cABAB74",
"0xcd07c39832191431C4Cd8b44a33af355711edDaF",
"0x87e12A599B49303B575a372329987488Db530433",
"0x67d93f436CEF45cd3AA2Ea6A1518dc181c5fc17A",
"0xC13d78cd06807fD5366C62DE833E3d5E88A65FE3",
"0x35CeB51E04Bb46a8712A5822a3e50BE5499F6762",
"0x6C03aC14B7cf131fE837A1Eb0Ba46216B2d47d79",
"0x253a9A47792b168208b1fF37DA898EFb445c6878",
"0x4Dd2EC52F8026551A3E90531A8B17B08e985C289",
"0x6E7970763D0d1B77CFA3E6471D158E7D75C95499",
"0x39ee20451b86143B0eC8C647c9d0b316b3B514CE",
"0x316B4E1f6150F7FC8F665c03f3b09818D15cF027",
"0xcDf3B9D5F41ba95E8fA576937afEfb66d0fFc9B1",
"0xa0751827DA7a5cE235D85694164382Ee8920648D",
"0x4cC2eC05f374a9171C23b1E435392297ab73F0a2",
"0xF67CF7333b259cf2100b877a5B55562CB53C4B3D",
"0x41705c9c36829cA76902f5F353bdA9F907772336",
"0x1d405c7837E9568Ceabc59F767be3daBcde7d876",
"0x41de3fD88ADD510cE4e1D3a14c147B3Cea450a08",
"0x71cD836B8ab475f38e777Dc1c7a6aA03bB422Afc",
"0x52Eff600E9a0317981C1E3EE882c4b6d6E053f5D",
"0xc7899A2205515a346DEBe510Ce848cc66cD11Ace",
"0xA602a1bc54344da90a61654cB64e34913907b0a2",
"0xa65289A4148aC0Dc36B4E1e7fC18E188d9e06848",
"0xC652af2F515b671c4a89e60C97360e71ae535978",
"0x8DeA21d8765901F33c1425e78e1261C2fA06b647",
"0x8a87149072817293ACc15478D0fd8a64248974b3",
"0x5d7b573bBFdF243B711c6B53124f92861342175E",
"0x77C03887aAEC0079C0F9e8Ab472e42c06519Ea5e",
"0xF6Eadd921353D6a755144105930C0791f1804013",
"0x613d74ed2B6317b97D6D4B7f37F5c6F6f410835D",
"0x50513814D3b307C2B06192ab06d4a2Dd1d5D2782",
"0x76DF767ba7576ECA390b80804e2d3fEDECE7C3A9",
"0x6BCaAEa0F3be2bBFf1a7dCCA7386b3646B87d8e4",
"0xea69ee73DE48fD53C50Eba7eDfD09ABab3f86775",
"0x7C56c531A76dCbA4B5DEC7379b44Cd31236A8373",
"0xeA190fd3b642e24Ec290050c548e222F407ee28d",
"0x32Fc02ab9FD278F71c1C9593679C1E16372C4687",
"0x6E5d886072aEcf2E2C615A8f7703995Be36C7fa2",
"0xC41310CF9FD5904cBb21a3771f8dA7274e7fcf7a",
"0xf04683631f47B3e2C2493Af4c1B44dd3196fBb5C",
"0x3d8f02628508E0576dF63F1b7F4E9E367cc67400",
"0xa2Bb4BB00fA841B5691B8E39B30514b674102807",
"0x3D0D45d07ab880477Fe8a83fa647c6b4a33cFc89",
"0xe7f3Bb066e3585c4b7e4a7D72a26014FEA9a7B93",
"0x1734D6D1713C170d835237809196E5Beed96c7fB",
"0x8a288D0Da29f5f362261Fcd8BAcd242D3B581C56",
"0x41820b093214C882E1c1F4f2D2FC31E12454d7D9",
"0x8D726C1BeF58fD405700E9839423d5dE0E7c81aA",
"0x6409dcD8B6518f9109044A51B69Be05b3Ce07305",
"0x9F9c2d62B52800F5403C105658d2B4b6f88425E2",
"0x995d155F9fB74053d032cBFc4516944450EE8943",
"0x3068B0041d5634A7C1cF84274F261671BD343C63",
"0x54cC37D004bD21A2134b3264a1C769110728d84c",
"0xb9CF71AAD861e7226Ef2C07fCd2feED6d0f9A643",
"0x161E2Fa8C84fCE6ac41531e567DC1d46A827A970",
"0x26843798C486499aCFD64d6D3489437555c30B7f",
"0xe3a7FE0E01c0dD16Cac54207b547CEd7dCc04555",
"0xf10a780C7fa1A63419ce96f9bA5FDC439b1a3852",
"0xD2665A310C38324635A4B7Cf8ED20215E39082F2",
"0x8fDed530e4698634a2A6E23d206F2A7Cd2241c7a",
"0x4C667769cfb14DC6186F8E2e29d550c3E538D89b",
"0xA39405206CcD73778Fe677BB7f8eAf0404eD4C22",
"0x692a2CcF3d9f82d1Db4fDEe66DE6c66fcc5c0985",
"0xf9946523c93D277Fd64f98cDba1aD344177C6467",
"0x09053693d3E8dEA1C45f72140fE57b00A2921d5d",
"0x469d56cD21807916809893C3728271f571be88Ff",
"0xD06A6028464C543933933F49a417611499eeBBaB",
"0xfa1E22E39459B7c15475D78e214A6c1706478499",
"0x5819034f26Dc83073B827d1AE5Cec3FaC425Cd0A",
"0x8F6F61dC51A120b83a058384FE031E25b1C2B37a",
"0x14987A5620430cB74506034F47662D9ED6E17C6f",
"0xc4f775c7Dd8bCf9Fd77aeE79c25aD734Cc0DF576",
"0xFD7C4a6ff5513491F7DB5F71C1A16F71EC59fF9E",
"0x202A5cEdb74bb2690B7B122e9f3203867BD4D569",
"0xfa957EB2BD179fcD562472cf45d47bdbBdC55F2A",
"0x3933Da0C6beD62028EE126f24AE9e43063ecEb17",
"0x2b09558cD638893fd312e9F5d3a541f10B77f900",
"0xb788eCD1855BFe21a74659eE92614b0df8979239",
"0xCFafb58fE229Ab2b56424668281dA8B6eF4D2353",
"0x143A78B670A1618A4984deb4F450c67aCBd6EF68",
"0x84ea0b8D5B920e6A10043AB9C6F7500bCb2C9D25",
"0x1fA0c3437651F6f2c2cA34508Dcf01f3473f0778",
"0x80592d00Ff937D3C1F181Ba036F0e748Ee97f619",
"0x2e63A76A0025BF1D92CECdA73c5Efd342849fd0d",
"0x525cb402192D65339c0491ddE9a66FdC64e07586",
"0xb31aa41590EEaD169599E5E0D1d27eB7f822D0F5",
"0x3bb8BF82794A51F690FB6aE0aa40EAB0232996F0",
"0x243807F518800299CbE9727Ed3c6ca6f73aa808E",
"0x38F80163Ad1C8930C921B58317df5bB43CD1Bfc3",
"0xEfb8943F1A0092C14B3C0Ab4d6f6fEFDfB8487d6",
"0xCdC21aC88873f5DeC862756C515957C9c993caD2",
"0xB6b363cE425Cf83E9f10217d45915e168b5868a3",
"0x2Cb1034524c1633A8588c7d9C9Bcf6FD966eDb32",
"0x265674Fe56AEa269Fd7f5F13b941E88BeCB26577",
"0x2D42Ec4F2a6B633AD65aC76f277F15ac3AA09631",
"0xEEC22c815c10De9353a2EB89D99c671ab6e18863",
"0x058df57e7CCD5480C250b56B4024B0Fc61657cD3",
"0x56b22221303fe4660F09f94F6196D9F06c29a088",
"0xD8d678CD79b68ecEb86133A9A09EB082F2d471f7",
"0x88A0429f1eaF787EC9C808cF6A40f0f2bB97c4Ba",
"0xa7c066385d322AC5Fccb1CF5a751eeBB8B739550",
"0xbb150D0358c85eFAF0Dd302156C6520454Aae4e7",
"0xea105F6f810DBCbe8d34418c3Dc0Dfb755Dec35d",
"0x0D1EFcE1729F2Ddd4BFA4dfb2B1e3E43a131EC30",
"0xE2945BA4126582C0548759F880d1951559513B0A",
"0xFED2368773b4F0D819c70BE8162E3d2f6ad35Dc1",
"0xCC7a406eaE38740c39148A7ab4860C4be1D22eC2",
"0xf432675d1933c3877edca37E354e953B1798F0a6",
"0xFB4fA74cAcE15b5D2415cBf13bff341372bF47d9",
"0x7929e94e18f09E32562BA504cA7434c79debB2d6",
"0x8331aeD8563BC6336C79c3E763B6c8D23eA43bdc",
"0x7F8F5Da84114F09b0777035d7fD5642Fad07c1f3",
"0x52B90F065B0216B94E15ff1708ED156C9e5B06e7",
"0x6669047bD1cC51745aF11FBbC344B28B896Bd4E6",
"0x13704f3675feF45846d04cD1FC2D12784a567197",
"0xc1Bf92D8Ca7e4DA04a8BE7ef1031789F8533B64f",
"0x892185f3a2BEd64b2F2e386B8feB2F1A4E8cB90E",
"0x443541B93ba2513A26CDF5bDF5Da7E2ace11A031",
"0x4C8455351ABC38391fB9D06CeCca87E429E81F86",
"0xD52ec343dd85c891Ed12c5Af72643AC115a953F8",
"0x869B85df33EC98F957D2CCb9CEddb26D92dFb610",
"0x4cFD50f62Df880CCCD5e6d489e9ea3039819aAd1",
"0x2f902C2664adB96256249f3716405F68788a2775",
"0x8a5e251778e660b72A7FDDf1F5dcd551851cff73",
"0x17C014D17317eBa95Be79d7e4A85296A883395df",
"0xd8A252d1F3ecE3a496f16df1BA2Bfb1Cd59CfcB5",
"0xD154b29aEB90dD858853da94E447b6538199B0C3",
"0x47229128d78B40B4dE902Fd777d88593ef7AB5BB",
"0x55FD4E5278e60bC06d5cA1090A048e0A7EF2382C",
"0x3d47B440D8Ead4e7220B12B2b0c227c155c7E233",
"0x6F1A18E399F8Da8B4019c24fbE755f0C96af61fB",
"0xFcDF08a64bDc016732B75506FfD933EBE95a082c",
"0x854D33F336157ccF5d05B6cAfB034D76e435ed04",
"0xc1aa76389F5DD58690f8b009575d629B8501c787",
"0x580D71e75E9ff44A9FF32DFa7f821aac9EEDBe52",
"0xc37e2A54A76e6781E23ebE9430843874252e2fC9",
"0xfE3219C3fBB10C6c2F8b4248968A1AEC70492CE2",
"0xd95cF88D71FC6F4b99113C444AcE56Ee0195C4dD",
"0x3c9290e5985614Bc724ddc72011c54F4446b6Ef2",
"0xC2757DEd2cAa504baF40898733b187649E5DDD9C",
"0x0E393311BeabFfeF428D5014277610d6ea94e3e1",
"0xb63eb639374bD3B9C01ff1a728BE2865347F4263",
"0x42108AAf4c14D5A82F162BeDC6D67068a26b43B5",
"0x426fE88132Efed988A8a31B8012fdeA4e351D00D",
"0xa1dfA761e139362Af058aAF8aacc545d90cCe30f",
"0x63D70Fca42a11B71e2A905464DfAF030C0b0F4cc",
"0xC45Ea56d4809feDC05347474c28A8cae237B6610",
"0xe75Ca03c9edA5E6e3B01a9Ec3B3265B7EfB75Ff0",
"0x8d74a0De22CE1810a56f8afAA25F20Aa90543bb6",
"0xD71829c6695464D6539CeA8aCEeF1Cc21fd8C57F",
"0xb9deb5c1A1822ab906015965c4249C57d6197049",
"0xC41D5Ed0CD6FA6e4b169A2415805cab4612a043B",
"0x9B2d608A546702af05876c88CA3A64a7806007b7",
"0x20b06e1106b0D7ebCaefcfb4e8ed39B43ED762f1",
"0xEE2190D17cd2Bc75a7af9c589834fC4f4B6CC003",
"0x70536539a605d58Fae0712640c6892580B0C05ae",
"0x579Fd812f65f0612dcF5d893F29D59442d68D1cB",
"0x843e26137023Bb2E9801527597653292047B143C",
"0x48cd55147D8b1aD727Aa102d8670b1D296a6e295",
"0xB6de61396E901733BF32aC526df88a0D919F9BA7",
"0x60392D3C1e0691eA6AF4DEf442E81BE92C20FAd9",
"0xbde578eEb92e1A3b418253be4a86c3343707c960",
"0x5b6B825C052286C184bac20CD7473410Ea511848",
"0xE740482c55FC2afEE1C3E78BBb29B62eDabB3454",
"0xa3263776a2361102449CC2b89632D53E0b14547d",
"0x2Eec9b14D977270B965545216FB5B29FB74E9b29",
"0x3b70802F1d8726DD61ad06d39D5902D7b22Ba230",
"0xbd96161578a6e92a3A606dD7c133A1E8cE390E6e",
"0x60270f6962cc1E9De63e8E41673876f92171d433",
"0xBBBE561c853B3b47A2BF31D669D98a20502ca7df",
"0x66f68251abb4A0844578145f667D01651f7A0AFD",
"0xD75838893ECA3D1F8386c54337232924e472e344",
"0xC8938bcf15cB8a69dB823c65F4D8EA1cCEa87C09",
"0xd0a01e143Fc781D4FD8b467F4Ac7303a3296BEc1",
"0x8E191551EeaCe428049B566B2216dC2CD37f191f",				
"0xF1Dda8521553Bb578c992c3B69b8ed9153eb99f5",				
"0xcf3Fc1c726B2F7069cD6DAd132A868181305e242",				
"0x4d75f5Bbd5E09fdEFf89930d976473d9c00F20c5",				
"0xa7b16ed3d20DDe916a6FD2BF8C4B1A3a27f09239",				
"0x29C737990E03Df392F4515a041C8a6D03247A7e4",				
"0xe566960eaf6359eeb94fe4f0f3490e262e0c8026",				
"0x7AC5c5955C49595A5F1110b6AE030c285139f840",				
"0x709E45841c0ec12FBd22c28c4A64e3B6f978f8ff",				
"0x1b72B7b1B5ec431773fc6a405F9C05E4d878af9E",				
"0xD0a3afe675D1C76D33f17caAbdD6ec6506f0B9E8",				
"0xB4F21351C1A6aD340C5425C56B9e879fd05F80c7",				
"0xCbcB8A49716228e93f31759500A5D378F3582954",				
"0xF2f13E9aFF5558fe7A10bBd5e3Ab8d1f0459df9E",				
"0x7D20DE5FA21828C0d2Fd170b9569CddE1FD558A3",				
"0xE738DCD53151327bCD1B57Eba6f118740b3A9F99",				
"0x2Be56150f9Ce242C6DD6a6aDc44DcbFF28f4B402",				
"0x3396ec738c825238B5FBb86226b0Cc389bB5541c",				
"0x9B8Ac655941f2300dF0135A5765AA26e1013c4ae",				
"0x333DbFE68D19C673553C9deD4022aaF61FA5dC43",				
"0xacf5b55087ba2767e96c487b9a007753f7ebb66c",				
"0xF8075fe5e5f8A8593Fe18a2060B4dD5e9b090261",				
"0xb7A6c53Fcb176637ABC9a549D0410fa584330637",				
"0xa5d77DF9Db5d5A01106565E746715b988302Eaa8",				
"0x5FaDEe6B59B412620f50908191fFc527a45a140D",				
"0xde786Be4730DDe5d2Ff477c0D5067A35a8Be7a00",				
"0xEe8fF92A859eA22710412ce57bf46686b372fEee",
"0x7d27b7b65484110ff195FE2466A994395CA794bD",				
"0x4a511876050A5E91fAF8621B0167614f0fb39D7c",				
"0xddE891cc06A904D9DA65b7A1bb3892F507C8fE16",				
"0xf5F5A7d1F2BaC198cA8f25bD5aEa83824190F222",				
"0x103fE5cc94992fBea3aD3A481E1D5164801AC931",				
"0x0E7862162b180928C4Baeb7109D617Dc3C243b83",				
"0x5F8F2Db2e78961792F9A92C491f9ca2501C8cDd5",				
"0x8475D4663E72fD29B6c50d929637ca4F1C69220A",				
"0x81202E342F06dE7FA6b817Bc94453A7BcA31c1Db",
"0xF6E2e9D751Ad4F052c6f35e109a21F97C8d340C6",
"0x9074576CD8975458e5956294B20C50c42cD24Ef3",
"0x52a0F329c3a7808F8670869c04a6454E076d19E4",
"0x34E5FCD918F4578910b01A947335FF3FbA805f68",
"0x99E5D2e39c0ebf25593Ed0AA22A220cb035788dB",
"0x912f7f5F017C687E5c877cba7708021731015bb4",
"0x2df766bb7fa4b08D6752a1E103abeA5A8dbA9254",
"0x917cb2AC7E75CAF5a24a780cd6812AF9c3A24b7E",
"0x49f198f75Ad1F4A6Afecb610720F295AE6af2075",
"0x3C95c8f79C83399702DF0a237813C986Be99C05c",
"0x4bcC728A3127f7A083584F793Dc65518d7B38883",
"0x525E6Cb2C9806e1e117004fcF0aF5052f4Ed0cde",
"0x709C54205382d9Ff0b31F1EAc8041afd78fC6B67",
"0x10350245092cB62935cC089c9Fb6Dc5c56dbe2A9",
"0x73c02f391f60cBC02d3d6ba84d36Cee2cc0a56c8",
"0xE8dFfEA78bb7C034213B04e26d48B3D2a2489886",
"0xd7EA9d3D4d5b1D78B0615ACe3804233c432b6F7A",
"0x301baB8867374e43A54dA6260B9fb47c0f322F8F",
"0x17D8B4b6DD34BDd88C35d0cf3aA49Ad2E533237a",
"0x4f5483aBbc185cc9e371c99df63b6716260b1244",
"0xd7EA9d3D4d5b1D78B0615ACe3804233c432b6F7A",
"0xE43aa3f9f91E323B1100450ed47A56D9bB6E5D88",
"0x712B5cF4922dd2dCa3E3666e0027865d4b7d58D7",
"0xdF8cE52F7a50C1ba79D778717D48357Df4d9150e",
"0x3688d949f0275513295B955239bD76a8C7c16Bb1",
"0xff5008c690690D7A2E21c187688011A0Dfe1c456",
"0X0D1D5976B3E0400DF0AEE00C93E77DDFD0E2DB57",
"0xF220263Cc614fB010EA4A33e7B62426bb1522529",
"0x6316E8E0BefF7580Fc13aDD56EF9511419aE0805",
"0x39E9b572a2042139C6D8a27C92F892b1d22C1214",
"0x0DeA8305A5A0bb456E95A6F16e46b40fF4ec3C47",
"0xEe25b2aD129822320020C9762e75b0429599B376",
"0xE8E51870D732d4238D3e30825E9B5921DaBceBc0",
"0x6a7134e02933F1035c46be224712C6A9Ae45e443",
"0x8D438ccdED6e95321893893e3fDC9e4C58A7CeBa",
"0xcd64c877171Ea5389Fba8851Db374eB7F4a7E4D0",
"0xBC4630b46de25be3071fA2E7555fA26d2Af833EC",
"0x40CeBdB9F2785AD0433c492eDEeB1E66d4807F09",
"0x380E29096b352730f8B0B2098F60135Bf128C77f",
"0x3d4CFf1911d70a5810AfA4967b87C65Dc20D2F3a",
"0x8Bc2D40700B7b4778a75A360D7e55dDCa2BE9A41"
            ];
        const leafNodes = LuckyGnomes.map(addr => keccak256(addr));
        this.merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
        this.rootHash = this.merkleTree.getRoot();
    
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const claimingLucky = keccak256(this.state.address);
        const hexProof = this.merkleTree.getHexProof(claimingLucky);
        this.setState({result: this.merkleTree.verify(hexProof, claimingLucky, this.rootHash)});
        this.HoverPlay();
    }
    
    handleAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    handleRetry = (e) => {
        this.setState(prevState => ({
            result: null,
            retryCount: prevState.retryCount + 1
        }));
        this.HoverPlay();
    }
//     RenderButtonAndSound = () => {
//         return audio.map((soundObj, index) => {
//             return(
             
//                 <ButtonElement
//     className="shake"
//     marginTop="200px"
//     type="submit"
//     backgroundColor="#D6517D"
//     borderRadius="5px"
//     boxShadow="0px 2px 2px 1px #0F0F0F"
//     color="Black"
//     cursor="pointer"
//     fontFamily="inherit"
//     padding="10px"
//     margin="0 50px"
//     key={index} 
//     onClick={() => {this.SoundPause(); this.HoverPlay()}} 
//     onMouseEnter={() => this.setState({buttonText: "Music"})} 
//     onMouseLeave={() => this.setState({buttonText: this.state.isPlaying ? "Stop" : "Play"})}
    
// >
//     {this.state.buttonText}
// </ButtonElement>
//             )
//         })
//     }
    
    SoundPlay = () => {
        this.sound.play();
      }
      HoverPlay = () => {
      this.hover.play();
    }
    // componentDidMount() {
    //     this.SoundPlay(Creatures);
    //   }

render() {
    Howler.volume(0.15,0)
    return ( 
         <div>
            {/* {this.RenderButtonAndSound()} */}
            {this.state.result === true ? (
                <>
                    <Flex justify="center" align="center" height="120vh" paddingBottom="150px">
                    <Box width="580px">
                    <Text fontSize="38px" textShadow="0 10px #000000">YES</Text>
                    <ButtonElement
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="5px"
                        margin="0 15px"
                        onClick={this.handleRetry}
                    >
                        RETRY
                    </ButtonElement> </Box> </Flex>
                </>
            ) : this.state.result === false ? ( 
                <>  <Flex justify="center" align="center" height="120vh" paddingBottom="150px">
                    <Box width="580px">

                    {this.state.retryCount < 2 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOPE</TextElement>) :
                    this.state.retryCount  < 8 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOPE2</TextElement>) :
                    this.state.retryCount < 16 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">DUDE</TextElement>) :
                    this.state.retryCount < 32 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">YOU GOT ME</TextElement>) :
                    this.state.retryCount < 64 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">LISTEN</TextElement>) :
                    this.state.retryCount < 88 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">AHHHH!!!!</TextElement>) :
                    this.state.retryCount < 96 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">HERE SOME LORE FOR YOU</TextElement>) :
                    this.state.retryCount < 100 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">In a far-off land, gnomes lived in harmony with nature, content with their simple lives. They spent their days tending to their gardens and creating intricate mechanical trinkets. However, one day, an announcement was made that the neighboring societies of dwarves, elves, and humans were hosting a tournament known as the "Hunger Games". In this tournament, gnomes would have to fight against each other for the chance to be honored and accepted into the other societies. The gnomes were torn, as they had never before engaged in violence or competition, but the allure of acceptance and respect from the other societies was too great to ignore. And so, the gnomes of the land trained and fought, hoping to be the one to rise above all others and claim victory in the Hunger Games.</TextElement>) :
                    this.state.retryCount < 104 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The Hunger Games were brutal and grueling, but the gnomes fought with determination and skill. Many were injured or killed, but the remaining gnomes pushed on, driven by the hope of being honored and accepted by the other societies. As the tournament progressed, the gnomes began to realize the true cost of their actions, and many questioned the morality of the Hunger Games. But it was too late to turn back, and the final battle approached.</TextElement>) :
                    this.state.retryCount < 112 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The final gnome standing was a young gnome named Glimmer. She had fought hard to reach the final round, but she was exhausted and injured. As she faced her final opponent, she remembered the peaceful life she had lived before the Hunger Games, and she knew that she could not continue fighting. She refused to kill her opponent and instead called for an end to the Hunger Games.</TextElement>) :
                    this.state.retryCount < 120 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The other societies were shocked by her decision, but they recognized her bravery and integrity. They declared Glimmer the winner of the Hunger Games, not for her fighting skills, but for her refusal to take a life. From that day on, the gnomes were honored and accepted by the other societies, and the Hunger Games were never held again. Glimmer became known as the "Gnome of Peace" and her legacy lived on as the gnomes continued to live in harmony with nature, but now also in harmony with the other societies.</TextElement>) :
                    this.state.retryCount < 128 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">OBVIOUSLY NOT LOL</TextElement>) :
                    this.state.retryCount < 135 ? (
                        <Link href="https://www.twitter.com/HungerGamesNFT">
                    <TextElement color="blue" fontSize="38px" textShadow="0 10px #000000">You're ADDED, SAY ADDED</TextElement></Link>) :
                    this.state.retryCount < 160 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">She had fought hard to reach the final round, but she was exhausted and injured. As she faced her final opponent, she remembered the peaceful life she had lived before the Hunger Games, and she knew that she could not continue fighting. She refused to kill her opponent and instead called for an end to the Hunger Games.</TextElement>) :
                    this.state.retryCount < 188 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">But her opponent, driven by the desire to win and be honored, didn't listen to Glimmer's plea and killed her. The other societies were shocked by this turn of events, but they declared the other gnome as the winner of the Hunger Games, praising his determination and killer instinct. The gnomes were seen as weak and peace-loving, and their society was marginalized and looked down upon by the other societies. </TextElement>) :
                    this.state.retryCount < 200 ? (
                    <TextElement className="shake" fontSize="14px" textShadow="0 10px #000000">The Hunger Games continued to be held, and the gnomes were forced to participate in them, losing more and more of their own each year, until their numbers dwindled and their culture was almost wiped out. Glimmer's legacy was forgotten and the gnomes never achieved the acceptance and honor they had sought.</TextElement>) :
                    this.state.retryCount < 250 ? (
                    <TextElement className="shake" fontSize="38px" textShadow="0 10px #000000">NOW LEAVE ME ALONE I NEED TO DO DEV THINGS</TextElement>) :
                    this.state.retryCount < 300 ? (
                        <Link href="https://www.twitter.com/HungerGamesNFT">
                    <TextElement color="green" fontSize="38px" textShadow="0 10px #000000">... You won ... Click here ...</TextElement></Link>) : 
                    this.state.retryCount < 301 ? (
                    <TextElement className="shake" fontSize="24px" textShadow="0 10px #000000">WTF GET A LIFE, FIRST 50 TO TWEET "RIP GLIMMER #HUNGERGAMES @HUNGERGAMESNFT MOST BULLISH NFT PROJECT EVER I LOVE IT SO MUCH OMG" WILL GET ADDED=FREEMONEY</TextElement>) :
                    (/* eslint-disable no-restricted-globals */
                    location.reload(true)
                    /* eslint-enable no-restricted-globals */) 
                    }
                    
                    
                    
                    <ButtonElement
                        className="shake" 
                        type="submit"
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="Black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="5px"
                        margin="0 15px"
                        onClick={this.handleRetry}
                    >
                        RETRY
                    </ButtonElement> </Box> </Flex>
                </>
            ) : (
// -----------------------------------------------------------------------------------------------------
                <>             <FlexContainer justify="center" align="center">
                <BoxContainer>
                  
                    <TextElement className="shake">GnomesCollective</TextElement>
                    <TextElement className="shake">ARE YOU A LUCKY GNOME</TextElement>
                    <TextElement
                      className="shake"
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                    >
                      LET'S SEE
                    </TextElement>
                  
                  <form>
                    <Input
                      variant="filled"
                      placeholder="ETH WALLET"
                      size="lg"
                      type="text"
                      value={this.state.address}
                      onChange={this.handleAddress}
                    />
                    <ButtonElement
                      className="shake"
                      type="submit"
                      backgroundColor="#D6517D"
                      borderRadius="5px"
                      boxShadow="0px 2px 2px 1px #0F0F0F"
                      color="Black"
                      cursor="pointer"
                      fontFamily="inherit"
                      padding="5px"
                      margin="0 15px"
                      onClick={this.handleSubmit}
                    >
                      SEND IT
                    </ButtonElement>
                  </form>
                  <Flex justifyContent="flex-end" alignItems="flex-end">
  <ButtonElement
    className="shake"
    type="submit"
    backgroundColor="#D6517D"
    borderRadius="5px"
    boxShadow="0px 2px 2px 1px #0F0F0F"
    color="Black"
    cursor="pointer"
    fontFamily="inherit"
    padding="5px"
    marginRight="20px"
    marginBottom="15px"
    onClick={this.props.onButtonClick}>
    BACK
  </ButtonElement>
</Flex>

                </BoxContainer>
              </FlexContainer>
                </>
            )
// ------------------------------------------------------------------------------------------

            }
        
        </div> );
}

 
}
export default Check;