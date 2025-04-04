// // utils/nftHandler.js
// const grantNFTBadge = async (userId, ipfsCID) => {
//     const user = await User.findById(userId);
//     user.addBadge(ipfsCID);
//     user.reputationScore += 100; // Example boost
//     await user.save();
    
//     // Optional: Trigger blockchain mint
//     await nftContract.methods.mint(user.walletAddress, ipfsCID)
//       .send({ from: adminWallet });
//   };