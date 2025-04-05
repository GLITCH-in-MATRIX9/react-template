const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DaoVoting = await hre.ethers.getContractFactory("DaoVoting");
  const daoVoting = await DaoVoting.deploy();
  
  console.log("DAO Voting address:", await daoVoting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });