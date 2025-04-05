import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { Card, Button, Input, Table, Tag, message, Alert } from 'antd';
import { CheckOutlined, CloseOutlined, WalletOutlined, CopyOutlined, SyncOutlined } from '@ant-design/icons';

// Contract configuration
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Contract ABI
const contractABI = [
  "function submitReport(string memory _description, string memory _harasserName, string memory _evidenceCID) public",
  "function voteOnReport(uint _id, bool _voteYes) public",
  "function getReport(uint _id) public view returns (string memory, string memory, string memory, uint, uint, address, bool, bool, bool)",
  "function reportId() public view returns (uint)",
  "function stakeTokens() public payable",
  "function unstakeTokens(uint amount) public",
  "function delegateVote(address to) public",
  "function votingPower(address user) public view returns (uint)",
  "function minimumStake() public view returns (uint)",
  "event ReportSubmitted(uint indexed id, string description, address submitter)",
  "event Voted(uint indexed id, address voter, bool voteYes, uint weight)"
];

// Debounce helper function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Reports = () => {
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false); // Added separate voting loading state
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [lastBlock, setLastBlock] = useState(0);
  const listenersAdded = useRef(false);
  const [harasserName, setHarasserName] = useState('');
  const [evidenceCID, setEvidenceCID] = useState('');
  const [stakeAmount, setStakeAmount] = useState(0.1);
  const [networkError, setNetworkError] = useState(false);

  // Initialize provider
  const getProvider = () => {
    if (window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }
    return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  };

  // Check if user has enough stake
  const checkStake = async () => {
    if (!contract || !account) return false;
    try {
      const stake = await contract.votingPower(account);
      const minStake = await contract.minimumStake();
      return stake >= minStake;
    } catch (error) {
      console.error("Stake check error:", error);
      return false;
    }
  };

  // Stake ETH to gain voting power
  const stakeETH = async () => {
    try {
      setLoading(true);
      const tx = await contract.stakeTokens({
        value: ethers.parseEther(stakeAmount.toString())
      });
      await tx.wait();
      message.success(`Staked ${stakeAmount} ETH successfully!`);
    } catch (error) {
      console.error("Staking error:", error);
      message.error(error.reason || "Failed to stake ETH");
    } finally {
      setLoading(false);
    }
  };

  // Check and switch network if needed
  const checkNetwork = async () => {
    if (!window.ethereum) return false;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x7A69') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }],
          });
          return true;
        } catch (error) {
          setNetworkError(true);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Network check error:", error);
      return false;
    }
  };

  // Fetch reports with caching and throttling
  const fetchReports = useCallback(async () => {
    if (!contract) return;

    try {
      const currentBlock = await getProvider().getBlockNumber();
      if (currentBlock <= lastBlock) return;

      setLoading(true);
      const totalReports = await contract.reportId();
      const reportsData = [];

      for (let i = 0; i < totalReports; i++) {
        const report = await contract.getReport(i);
        reportsData.push({
          id: i,
          description: report[0],
          harasserName: report[1],
          evidenceCID: report[2],
          yesVotes: report[3].toString(),
          noVotes: report[4].toString(),
          submitter: report[5],
          resolved: report[6],
          canVote: report[7],
          isVotingOpen: report[8]
        });
      }

      setReports(reportsData.reverse());
      setLastBlock(currentBlock);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, [contract, lastBlock]);

  // Debounced version of fetchReports
  const debouncedFetchReports = useCallback(
    debounce(fetchReports, 1000),
    [fetchReports]
  );

  // Initialize Web3 connection
  const initializeWeb3 = useCallback(async () => {
    if (!window.ethereum) {
      message.error("Please install MetaMask!");
      return;
    }

    try {
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        setNetworkError(true);
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const provider = getProvider();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const daoContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Verify contract exists
      const code = await provider.getCode(contractAddress);
      if (code === '0x') {
        throw new Error("Contract not deployed at this address!");
      }

      setContract(daoContract);
      setAccount(address);
      await fetchReports();

      // Add event listeners only once
      if (!listenersAdded.current) {
        daoContract.on(daoContract.filters.ReportSubmitted(), debouncedFetchReports);
        daoContract.on(daoContract.filters.Voted(), debouncedFetchReports);
        listenersAdded.current = true;
      }

    } catch (error) {
      console.error("Connection error:", error);
      message.error(error.message.includes("user rejected") ? 
        "Connection rejected by user" : 
        "Failed to connect wallet");
    }
  }, [fetchReports, debouncedFetchReports]);

  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchReports();
        } else {
          setAccount('');
        }
      };

      // Handle chain changes
      const handleChainChanged = () => {
        window.location.reload();
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [fetchReports]);

  useEffect(() => {
    initializeWeb3();
    return () => {
      if (contract && listenersAdded.current) {
        contract.removeAllListeners();
      }
    };
  }, [initializeWeb3, contract]);

  // Submit a new report
  const submitReport = async () => {
    if (!description.trim() || !harasserName.trim() || !evidenceCID.trim()) {
      message.warning("Please fill all fields (Description, Harasser Name, Evidence CID)");
      return;
    }

    try {
      setLoading(true);

      const hasStake = await checkStake();
      if (!hasStake) {
        message.warning("You must stake at least 0.1 ETH first!");
        return;
      }

      const tx = await contract.submitReport(
        description,
        harasserName,
        evidenceCID
      );
      await tx.wait();

      message.success("Report submitted successfully!");
      setDescription('');
      setHarasserName('');
      setEvidenceCID('');

      await fetchReports();

    } catch (error) {
      console.error("Submission error:", error);
      message.error(error.reason?.replace('execution reverted: ', '') || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  // Vote on a report
  const voteOnReport = async (id, voteYes) => {
    try {
      setVotingLoading(true);
      
      // Check voting power
      const hasStake = await checkStake();
      if (!hasStake) {
        message.warning("You must stake ETH to vote!");
        return;
      }

      message.info(`Processing your ${voteYes ? 'YES' : 'NO'} vote...`);

      const tx = await contract.voteOnReport(id, voteYes, {
        gasLimit: 300000
      });

      const receipt = await tx.wait(1);

      if (receipt.status === 1) {
        message.success(`Vote ${voteYes ? 'YES' : 'NO'} recorded!`);
        await fetchReports();
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Voting error:", error);
      let errorMsg = "Vote failed";
      if (error.reason) {
        errorMsg = error.reason.replace('execution reverted: ', '');
      } else if (error.data?.message) {
        errorMsg = error.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      message.error(errorMsg);
    } finally {
      setVotingLoading(false);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span style={{ maxWidth: 200 }}>{text}</span>,
    },
    {
      title: 'Harasser',
      dataIndex: 'harasserName',
      key: 'harasserName',
    },
    {
      title: 'Evidence',
      dataIndex: 'evidenceCID',
      key: 'evidenceCID',
      render: (cid) => cid ? (
        <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
          View Evidence
        </a>
      ) : 'N/A',
    },
    {
      title: 'Status',
      key: 'status',
      width: 150,
      render: (_, record) => (
        <Tag color={record.resolved ? 'blue' : record.isVotingOpen ? 'green' : 'orange'}>
          {record.resolved ? 'Resolved' : record.isVotingOpen ? 'Voting Open' : 'Voting Closed'}
        </Tag>
      ),
    },
    {
      title: 'Votes',
      key: 'votes',
      width: 200,
      render: (_, record) => (
        <span>
          <Tag color="green">{record.yesVotes} YES</Tag>
          <Tag color="red">{record.noVotes} NO</Tag>
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => {
        console.log('Record voting conditions:', {
          id: record.id,
          resolved: record.resolved,
          isVotingOpen: record.isVotingOpen,
          canVote: record.canVote
        });
        
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            {!record.resolved && record.isVotingOpen && record.canVote && (
              <>
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => voteOnReport(record.id, true)}
                  disabled={loading || votingLoading || !account}
                  loading={votingLoading}
                  size="small"
                >
                  Yes
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  danger
                  onClick={() => voteOnReport(record.id, false)}
                  disabled={loading || votingLoading || !account}
                  loading={votingLoading}
                  size="small"
                >
                  No
                </Button>
              </>
            )}
          </div>
        )
      },
    },
  ];

  if (!window.ethereum) {
    return (
      <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
        <Alert
          message="MetaMask Not Installed"
          description="Please install MetaMask to use this application."
          type="error"
          showIcon
          action={
            <Button 
              type="primary" 
              href="https://metamask.io/download.html"
              target="_blank"
            >
              Install MetaMask
            </Button>
          }
        />
      </div>
    );
  }

  if (networkError) {
    return (
      <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
        <Alert
          message="Wrong Network"
          description="Please connect to the correct Ethereum network."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <Card
        title="DAO Voting System"
        style={{ marginBottom: 24 }}
        loading={loading && reports.length === 0}
      >
        {!account ? (
          <Button
            type="primary"
            onClick={initializeWeb3}
            loading={loading}
            icon={<WalletOutlined />}
          >
            Connect Wallet
          </Button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <Tag color="green">
              <CopyOutlined onClick={() => {
                navigator.clipboard.writeText(account);
                message.success('Address copied!');
              }} />
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </Tag>
            <Button 
              onClick={initializeWeb3}
              icon={<SyncOutlined />}
            >
              Switch Account
            </Button>
            <Button
              onClick={debouncedFetchReports}
              loading={loading}
              icon={<SyncOutlined />}
            >
              Refresh Data
            </Button>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <Input.TextArea
            rows={4}
            placeholder="Enter report description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 8 }}
            disabled={!account}
          />

          <Input
            placeholder="Harasser Name"
            value={harasserName}
            onChange={(e) => setHarasserName(e.target.value)}
            style={{ marginBottom: 8 }}
            disabled={!account}
          />

          <Input
            placeholder="Evidence IPFS CID (e.g., Qm...)"
            value={evidenceCID}
            onChange={(e) => setEvidenceCID(e.target.value)}
            style={{ marginBottom: 16 }}
            disabled={!account}
          />

          <div style={{ marginBottom: 16 }}>
            <Input
              type="number"
              placeholder="ETH to stake (min 0.1)"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              style={{ width: 200, marginRight: 8 }}
              disabled={!account}
              min="0.1"
              step="0.1"
            />
            <Button
              onClick={stakeETH}
              loading={loading}
              disabled={!account}
            >
              Stake ETH
            </Button>
          </div>

          <Button
            type="primary"
            onClick={submitReport}
            loading={loading}
            disabled={!account || !description.trim() || !harasserName.trim() || !evidenceCID.trim()}
            block
          >
            Submit New Report
          </Button>
        </div>
      </Card>

      <Card
        title={`Current Reports (${reports.length})`}
        loading={loading && reports.length === 0}
      >
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          loading={loading && reports.length > 0}
        />
      </Card>
    </div>
  );
};

export default Reports;