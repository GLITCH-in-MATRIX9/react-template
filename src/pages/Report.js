// src/pages/Report.js
import React, { useState } from 'react';
import './Styles/Report.css'; // Import global styles

function Report() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showVotePopup, setShowVotePopup] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState([
    { id: 1, submittedBy: 'User1', votes: 10, status: 'Open' },
    { id: 2, submittedBy: 'User2', votes: 5, status: 'Open' },
    { id: 3, submittedBy: 'User3', votes: 15, status: 'Closed' },
  ]);

  // Handle report submission
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully!');
    setShowReportForm(false);
  };

  // Handle voting
  const handleVote = (agree) => {
    const updatedReports = reports.map((report) =>
      report.id === selectedReportId
        ? { ...report, votes: agree ? report.votes + 1 : report.votes - 1 }
        : report
    );
    setReports(updatedReports);
    setShowVotePopup(false);
  };

  return (
    <div className="report-page">
      {/* Centered Heading */}
      <h1 className="report-heading">Report Toxic Content and Let DAO Decide Your Fate!</h1>

      {/* Buttons for Submitting and Viewing Reports */}
      <div className="button-container">
        <button className="animated-button" onClick={() => setShowReportForm(true)}>
          Submit Report
        </button>
        <button className="animated-button" onClick={() => alert('View Closed Reports')}>
          View Closed Reports
        </button>
      </div>

      {/* DAO Voting Section */}
      <div className="dao-voting-section">
        <h2>DAO Voting Section</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Submitted By</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.submittedBy}</td>
                <td>{report.votes}</td>
                <td>{report.status}</td>
                <td>
                  {report.status === 'Open' && (
                    <button
                      className="vote-button"
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setShowVotePopup(true);
                      }}
                    >
                      Vote Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Voting */}
      {showVotePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Do you agree with this complaint?</h3>
            <div className="popup-buttons">
              <button className="popup-button yes" onClick={() => handleVote(true)}>
                Yes
              </button>
              <button className="popup-button no" onClick={() => handleVote(false)}>
                No
              </button>
            </div>
            <button className="close-button" onClick={() => setShowVotePopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Form for Submitting Report */}
      {showReportForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Submit a Report</h3>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label>Complaint:</label>
                <textarea
                  placeholder="Describe the toxic content..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Website where you faced the issue:</label>
                <input type="text" placeholder="Enter website URL" required />
              </div>
              <div className="form-group">
                <label>Username of the harasser:</label>
                <input type="text" placeholder="Enter username" required />
              </div>
              <div className="form-group">
                <label>Upload Screenshot:</label>
                <input type="file" accept="image/*" />
              </div>
              <button type="submit" className="submit-button">
                Submit Report
              </button>
            </form>
            <button className="close-button" onClick={() => setShowReportForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;