import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { Card, Button, Input, Table, Tag, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

// Contract configuration
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Contract ABI
// Updated Contract ABI (replace the old one)
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
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [lastBlock, setLastBlock] = useState(0);
  const listenersAdded = useRef(false);
  const [harasserName, setHarasserName] = useState('');
  const [evidenceCID, setEvidenceCID] = useState('');
  const [stakeAmount, setStakeAmount] = useState(0.1); // Default minimum stake
  // Check if user has enough stake
  const checkStake = async () => {
    const stake = await contract.votingPower(account);
    const minStake = await contract.minimumStake();
    return stake >= minStake;
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

  // Unstake ETH (optional)
  const unstakeETH = async (amount) => {
    try {
      setLoading(true);
      const tx = await contract.unstakeTokens(ethers.parseEther(amount.toString()));
      await tx.wait();
      message.success(`Unstaked ${amount} ETH successfully!`);
    } catch (error) {
      console.error("Unstaking error:", error);
      message.error(error.reason || "Failed to unstake ETH");
    } finally {
      setLoading(false);
    }
  };
  // Fetch reports with caching and throttling
  const fetchReports = useCallback(async () => {
    if (!contract) return;

    try {
      const currentBlock = await provider.getBlockNumber();
      if (currentBlock <= lastBlock) return;

      setLoading(true);
      const totalReports = await contract.reportId();
      const reportsData = [];

      for (let i = 0; i < totalReports; i++) {
        const report = await contract.getReport(i);
        reportsData.push({
          id: i,
          description: report[0],
          yesVotes: report[1].toString(),
          noVotes: report[2].toString(),
          submitter: report[3],
          resolved: report[4],
          canVote: report[5],
          isVotingOpen: report[6]
        });
      }

      setReports(reportsData.reverse());
      setLastBlock(currentBlock);
    } catch (error) {
      console.error("Error fetching reports:", error);
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
    if (!window.ethereum || listenersAdded.current) return;

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
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
      message.error(error.message);
    }
  }, [fetchReports, debouncedFetchReports]);

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

      // Check if user has staked enough
      const hasStake = await checkStake();
      if (!hasStake) {
        message.warning("You must stake at least 0.1 ETH first!");
        return;
      }

      // Submit report
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

      // Refresh reports
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
      setLoading(true);
      message.info(`Processing your ${voteYes ? 'YES' : 'NO'} vote...`);

      // Explicit gas limit to prevent out-of-gas errors
      const tx = await contract.voteOnReport(id, voteYes, {
        gasLimit: 300000
      });

      // Wait for 1 confirmation
      const receipt = await tx.wait(1);

      if (receipt.status === 1) {
        message.success(`Vote ${voteYes ? 'YES' : 'NO'} recorded!`);
        // Force immediate refresh (don't wait for event)
        await fetchReports();
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Voting error:", error);
      message.error(
        error.reason?.replace('execution reverted: ', '') ||
        error.message ||
        "Vote failed"
      );
    } finally {
      setLoading(false);
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
      render: (cid) => (
        <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
          View Evidence
        </a>
      ),
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
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          {!record.resolved && record.isVotingOpen && record.canVote && (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={() => voteOnReport(record.id, true)}
                disabled={loading || !account}
                size="small"
              >
                Yes
              </Button>
              <Button
                icon={<CloseOutlined />}
                danger
                onClick={() => voteOnReport(record.id, false)}
                disabled={loading || !account}
                size="small"
              >
                No
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

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
          >
            Connect Wallet
          </Button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tag color="green">Connected: {`${account.slice(0, 6)}...${account.slice(-4)}`}</Tag>
            <Button
              onClick={debouncedFetchReports}
              loading={loading}
            >
              Refresh
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

          {/* Stake Section */}
          <div style={{ marginBottom: 16 }}>
            <Input
              type="number"
              placeholder="ETH to stake (min 0.1)"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              style={{ width: 200, marginRight: 8 }}
              disabled={!account}
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