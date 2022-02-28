require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  solidity: "0.7.3"
};


//部署到线上网络例如Infura提供的ropsten网络节点
//const INFURA_PROJECT_ID = "YOUR INFURA PROJECT ID";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts

//const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

//module.exports = {
//  networks: {
//    ropsten: {
//      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
//      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
//    }
//  }
//};
