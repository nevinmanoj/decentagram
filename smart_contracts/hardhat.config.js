/** @type import('hardhat/config').HardhatUserConfig */

 require("@nomiclabs/hardhat-waffle");

module.exports = {
 
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/VQ91Vi5eQ0pShfHiB1x_pd2B9-pER29R',
      accounts:['c3666975ea618415b3386f23d65c20999067fc2b5ccbf69547b3525c366b6ae5']
    },
   
  }
};