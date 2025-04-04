// import { createContext, useContext, useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';

// const Web3Context = createContext();

// export const Web3Provider = ({ children }) => {
//     const [account, setAccount] = useState(null);
//     const [contracts, setContracts] = useState({});
//     const [provider, setProvider] = useState(null);

//     // Initialize Web3
//     const initWeb3 = async () => {
//         if (window.ethereum) {
//             try {
//                 const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 setAccount(accounts[0]);

//                 const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//                 setProvider(web3Provider);

//                 // Initialize your contracts here
//                 const signer = await web3Provider.getSigner();
//                 const daoContract = new Contract(
//                     process.env.REACT_APP_DAO_ADDRESS,
//                     ['function vote(uint256,bool)'],
//                     signer
//                 );

//                 setContracts({ dao: daoContract });
//             } catch (err) {
//                 console.error("Web3 init error:", err);
//             }
//         }
//     };

//     useEffect(() => {
//         if (window.ethereum) {
//             window.ethereum.on('accountsChanged', (accounts) => {
//                 setAccount(accounts[0] || null);
//             });
//         }
//     }, []);

//     return (
//         <Web3Context.Provider value={{ account, contracts, provider, initWeb3 }}>
//             {children}
//         </Web3Context.Provider>
//     );
// };

// export const useWeb3 = () => useContext(Web3Context);