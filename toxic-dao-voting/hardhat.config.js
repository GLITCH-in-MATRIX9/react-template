require("@nomicfoundation/hardhat-toolbox");

// Skip Node.js version check
process.env.HARDHAT_ALLOW_UNSUPPORTED_NODE = "true";

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    }
  }
};