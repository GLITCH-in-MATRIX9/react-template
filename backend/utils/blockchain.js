// const { ethers } = require('ethers');
// const SafewebDAO = require('../abis/SafewebDAO.json');

// const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// exports.createDAOProposal = async (ipfsHash) => {
//   const dao = new ethers.Contract(
//     process.env.DAO_ADDRESS,
//     SafewebDAO.abi,
//     wallet
//   );
//   const tx = await dao.createProposal(ipfsHash);
//   return tx.hash;
// };