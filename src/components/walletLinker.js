// // components/WalletLinker.js
// const linkWallet = async () => {
//     try {
//       const message = `Link wallet to ${user.email}`;
//       const signature = await web3.eth.personal.sign(message, account);
      
//       await axios.post('/api/link-wallet', { 
//         signedMessage: signature, 
//         address: account 
//       }, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
      
//       alert('Wallet linked!');
//     } catch (err) {
//       console.error(err);
//     }
//   };