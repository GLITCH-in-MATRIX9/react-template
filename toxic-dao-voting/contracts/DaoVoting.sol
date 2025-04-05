// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoVoting {
    struct Report {
        string description;
        string harasserName;
        string evidenceCID;
        uint yesVotes;
        uint noVotes;
        address submitter;
        bool resolved;
        mapping(address => bool) voted;
    }

    address public admin;
    uint public reportId;
    uint public constant VOTING_PERIOD = 1 hours;
    mapping(uint => Report) public reports;
    mapping(uint => uint) public reportTimestamps;
    
    // New features
    mapping(address => address) public delegates;
    mapping(address => uint) public votingPower;
    uint public minimumStake = 0.1 ether;

    event ReportSubmitted(uint indexed id, string description, address submitter);
    event Voted(uint indexed id, address voter, bool voteYes, uint weight);
    event ReportResolved(uint indexed id, bool approved);
    event VoteDelegated(address indexed from, address indexed to);
    event StakeChanged(address indexed user, uint amount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    function submitReport(
        string memory _description,
        string memory _harasserName,
        string memory _evidenceCID
    ) public {
        Report storage newReport = reports[reportId];
        newReport.description = _description;
        newReport.harasserName = _harasserName;
        newReport.evidenceCID = _evidenceCID;
        newReport.submitter = msg.sender;
        reportTimestamps[reportId] = block.timestamp;
        
        emit ReportSubmitted(reportId, _description, msg.sender);
        reportId++;
    }

    function voteOnReport(uint _id, bool _voteYes) public {
        Report storage report = reports[_id];
        require(report.submitter != address(0), "Report doesn't exist");
        require(!report.resolved, "Voting closed");
        require(block.timestamp <= reportTimestamps[_id] + VOTING_PERIOD, "Voting period ended");

        address voter = getEffectiveVoter(msg.sender);
        require(!report.voted[voter], "Already voted");
        require(votingPower[voter] >= minimumStake, "Insufficient stake");

        uint weight = votingPower[voter];
        if (_voteYes) {
            report.yesVotes += weight;
        } else {
            report.noVotes += weight;
        }

        report.voted[voter] = true;
        emit Voted(_id, voter, _voteYes, weight);
    }

    function resolveReport(uint _id) public onlyAdmin {
        Report storage report = reports[_id];
        require(!report.resolved, "Already resolved");
        require(block.timestamp > reportTimestamps[_id] + VOTING_PERIOD, "Voting still open");

        report.resolved = true;
        bool approved = report.yesVotes > report.noVotes;
        emit ReportResolved(_id, approved);
    }

    // New delegation feature
    function delegateVote(address to) public {
        require(to != msg.sender, "Cannot delegate to self");
        delegates[msg.sender] = to;
        emit VoteDelegated(msg.sender, to);
    }

    // Stake management
    function stakeTokens() public payable {
        require(msg.value > 0, "Must send ETH");
        votingPower[msg.sender] += msg.value;
        emit StakeChanged(msg.sender, votingPower[msg.sender]);
    }

    function unstakeTokens(uint amount) public {
        require(votingPower[msg.sender] >= amount, "Insufficient stake");
        votingPower[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit StakeChanged(msg.sender, votingPower[msg.sender]);
    }

    // Helper view functions
    function getEffectiveVoter(address voter) public view returns (address) {
        return delegates[voter] != address(0) ? delegates[voter] : voter;
    }

    function getReport(uint _id) public view returns (
        string memory description,
        string memory harasserName,
        string memory evidenceCID,
        uint yesVotes,
        uint noVotes,
        address submitter,
        bool resolved,
        bool canVote,
        bool isVotingOpen
    ) {
        Report storage r = reports[_id];
        address voter = getEffectiveVoter(msg.sender);
        isVotingOpen = block.timestamp <= reportTimestamps[_id] + VOTING_PERIOD && !r.resolved;
        
        return (
            r.description,
            r.harasserName,
            r.evidenceCID,
            r.yesVotes,
            r.noVotes,
            r.submitter,
            r.resolved,
            !r.voted[voter] && votingPower[voter] >= minimumStake
            isVotingOpen
        );
    }

    // Admin functions
    function setMinimumStake(uint newStake) public onlyAdmin {
        minimumStake = newStake;
    }

    function withdrawFees() public onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}