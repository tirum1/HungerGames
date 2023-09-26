// SPDX-License-Identifier: MIT

//░██████╗░███╗░░██╗░█████╗░███╗░░░███╗███████╗░██████╗
//██╔════╝░████╗░██║██╔══██╗████╗░████║██╔════╝██╔════╝
//██║░░██╗░██╔██╗██║██║░░██║██╔████╔██║█████╗░░╚█████╗░
//██║░░╚██╗██║╚████║██║░░██║██║╚██╔╝██║██╔══╝░░░╚═══██╗
//╚██████╔╝██║░╚███║╚█████╔╝██║░╚═╝░██║███████╗██████╔╝
//░╚═════╝░╚═╝░░╚══╝░╚════╝░╚═╝░░░░░╚═╝╚══════╝╚═════╝░

//░█████╗░░█████╗░██╗░░░░░██╗░░░░░███████╗░█████╗░████████╗██╗██╗░░░██╗███████╗
//██╔══██╗██╔══██╗██║░░░░░██║░░░░░██╔════╝██╔══██╗╚══██╔══╝██║██║░░░██║██╔════╝
//██║░░╚═╝██║░░██║██║░░░░░██║░░░░░█████╗░░██║░░╚═╝░░░██║░░░██║╚██╗░██╔╝█████╗░░
//██║░░██╗██║░░██║██║░░░░░██║░░░░░██╔══╝░░██║░░██╗░░░██║░░░██║░╚████╔╝░██╔══╝░░
//╚█████╔╝╚█████╔╝███████╗███████╗███████╗╚█████╔╝░░░██║░░░██║░░╚██╔╝░░███████╗
//░╚════╝░░╚════╝░╚══════╝╚══════╝╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░╚═╝░░░╚══════╝

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract GnomesCollective is Ownable, DefaultOperatorFilterer, ERC721Enumerable {
  using Strings for uint256;
  bytes32 root;
  bytes32 emptyBytes32 = keccak256(abi.encodePacked(''));
  uint256 public cost = 0.00888 ether;
  uint256 public publicPrice = 0.00222 ether;
  uint256 public maxSupply = 2888;
  uint256 private mintedWL = 0;
  uint256 private mintedAdditional = 0;
  uint256 public maxMintAmount = 2;
  bool public publicMint = false;
  bool public paused = false;
  bool public revealed = false;
  string public notRevealedUri;
  string public notRevealedUri2;
  string private CID;
  mapping(uint256 => address) private requestToSender;
  // mapping(uint256 => string) private _tokenURIs;
  mapping(address => uint256) private walletMints;
  

  constructor(
    bytes32 _root,
    string memory _notRevealedUri,
    string memory _notRevealedUri2,
    string memory _CID,
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) { 
   bytes32[] memory proof = new bytes32[](2);
   proof[0] = emptyBytes32;
   proof[1] = emptyBytes32;
   mint(9, proof, emptyBytes32); 
    root = _root;
    notRevealedUri = _notRevealedUri;
    notRevealedUri2 = _notRevealedUri2;
    CID = _CID;
  }

  function mint(uint256 _mintAmount, bytes32[] memory proof, bytes32 leaf ) public payable {
    if(msg.sender != owner()){                                                 //@dev Constructor call for Treasure
    require(!paused, 'Minting is paused');
    require(walletMints[msg.sender] < maxMintAmount + 1, 'Exceed max wallet'); //@dev Whitelist can mint again after Free mint and before public
    }
    require(_mintAmount > 0, 'Amount has to be > 0');
    require(totalSupply() + _mintAmount <= maxSupply, 'SOLD OUT');

    if(LuckyGnomes(proof, leaf) != true) {
        if(msg.sender != owner()){
          require(publicMint, '!Public');
          require(_mintAmount <= maxMintAmount, 'Amount is > max');
          require(msg.value >= (cost + publicPrice), 'Not enough ETH');
          walletMints[msg.sender]=2;
          }
          for (uint256 i=0; i<(_mintAmount); i++){
        requestToSender[totalSupply() + 1] = msg.sender;
        _safeMint(msg.sender, totalSupply() + 1);
        if((mintedAdditional*100)/maxSupply >= 30) {
            mintedWL++;
        }else{
          mintedAdditional++;
        }
      }
    }
    
    if (LuckyGnomes(proof, leaf) == true) {
      require(_mintAmount <= (maxMintAmount + 1 - walletMints[msg.sender]), 'Amount is > max');
      if (_mintAmount == 2 || walletMints[msg.sender] == 1) {
        if (publicMint){
        require(msg.value >= cost + publicPrice, 'Not enough ETH');}
        else {
        require(msg.value >= cost, 'Not enough ETH');
        }
        if((mintedAdditional*100)/maxSupply >= 30) {
            revert("Additional minting limit reached");
        }
      }
      for (uint256 i=0; i<(_mintAmount); i++){
        requestToSender[totalSupply() + 1] = msg.sender;
        _safeMint(msg.sender, totalSupply() + 1);
        if (walletMints[msg.sender] == 0 && _mintAmount == 1) {
        mintedWL++;
        } else if (walletMints[msg.sender] == 0 && _mintAmount == 2) {
        mintedWL++;
        mintedAdditional++;
        } else if (walletMints[msg.sender] == 1 && _mintAmount == 1) {
        mintedAdditional++;
        }
        walletMints[msg.sender]++;
       }
      }
  }
  
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }
  
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override(ERC721)
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
      if(tokenId % 2 ==0){
        return notRevealedUri;
      } else{
        return notRevealedUri2;
      }

    }

    return string(abi.encodePacked("ipfs://", CID, "/", (tokenId).toString(), ".json"));
  }

  function _setroot(bytes32 _root)public onlyOwner {
    root = _root;
  }

  function reveal() public onlyOwner {
      revealed = true;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  // function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
  //        require(_exists(tokenId), "URI set of nonexistent token");
  //       _tokenURIs[tokenId-1] = _tokenURI;
  // }
  function getRoot() public view onlyOwner returns(bytes32){
    return root;
  }
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
  
  function _publicMint(bool _state) public onlyOwner {
    publicMint = _state;
  }

  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os,'not os');
  }

  function setWalletMints (address _user, uint256 _state) public onlyOwner {
    walletMints[_user] = _state;
  }

  function getWalletMints(address _user) view public returns (uint256 WalletMints) {
    return walletMints[_user];
  }

  function getmintedWL() view public returns (uint256) {
    return mintedWL;
  }
  function getmintedAdditional() view public returns (uint256) {
    return mintedAdditional;
  }
  function transferFrom(
        address from,
        address to,
        uint256 tokenId
  ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
  }
  
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory data
) public override(ERC721, IERC721) onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId, data);
}

 function LuckyGnomes(bytes32[] memory proof, bytes32 leaf) public view returns(bool) {  
 return MerkleProof.verify(proof, root, leaf);
}
}
//┌┐┌┐██████████┌──┐███████┌─┐
//│└┘├┬┬─┬┬─┬─┬┬┤┌─┼─┐┌──┬─┤─┤
//│┌┐││││││┼│┴┤┌┤└┐│┼└┤│││┴┼─│
//└┘└┴─┴┴─┼┐├─┴┘└──┴──┴┴┴┴─┴─┘
//████████└─┘█████████████████
