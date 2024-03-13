require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.16",
  networks: {
    mumbai: {
      url: `YOUR_RPC_URL_KEY`,
      accounts: [`ENTER_PRIVATE_KEY_`],
    }
  }
};
