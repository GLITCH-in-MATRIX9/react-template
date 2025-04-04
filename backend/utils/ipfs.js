// const { create } = require('ipfs-http-client');

// const ipfs = create({ 
//   host: 'ipfs.infura.io', 
//   port: 5001, 
//   protocol: 'https',
//   headers: {
//     authorization: `Basic ${Buffer.from(
//       `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_API_SECRET}`
//     ).toString('base64')}`
//   }
// });

// exports.uploadToIPFS = async (data) => {
//   const { cid } = await ipfs.add(JSON.stringify(data));
//   return cid.toString();
// };