import React, { useState } from 'react';
import './Styles/ReportPage.css';

function Report() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showVotePopup, setShowVotePopup] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState([
    { id: 1, submittedBy: 'User1', votes: 10, status: 'Open' },
    { id: 2, submittedBy: 'User2', votes: 5, status: 'Open' },
    { id: 3, submittedBy: 'User3', votes: 15, status: 'Closed' },
  ]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully!');
    setShowReportForm(false);
  };

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
    <div className="report-page-container">
      {/* Hero Section */}
      <div className="report-hero-section">
        <h1 className="report-hero-heading">Report Toxic Content and Let DAO Decide Your Fate!</h1>
        <div className="report-hero-buttons">
          <button 
            className="report-primary-btn" 
            onClick={() => setShowReportForm(true)}
          >
            Submit Report
          </button>
          <button 
            className="report-secondary-btn" 
            onClick={() => alert('View Closed Reports')}
          >
            View Closed Reports
          </button>
        </div>
      </div>

      {/* DAO Voting Section */}
      <div className="report-dao-section">
        <h2 className="report-section-title">DAO Voting Section</h2>
        <div className="report-table-container">
          <table className="report-data-table">
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
                  <td className={`report-status-${report.status.toLowerCase()}`}>
                    <span className="status-cell">
                      {report.status}
                    </span>
                  </td>
                  <td>
                    {report.status === 'Open' && (
                      <button
                        className="report-vote-btn table-action-btn"
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
      </div>

      {/* Popup for Voting */}
      {showVotePopup && (
        <div className="report-popup-overlay">
          <div className="report-popup-content">
            <h3>Do you agree with this complaint?</h3>
            <div className="report-popup-btn-group">
              <button 
                className="report-agree-btn" 
                onClick={() => handleVote(true)}
              >
                Yes
              </button>
              <button 
                className="report-disagree-btn" 
                onClick={() => handleVote(false)}
              >
                No
              </button>
            </div>
            <button 
              className="report-close-btn" 
              onClick={() => setShowVotePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Form for Submitting Report */}
      {showReportForm && (
        <div className="report-popup-overlay">
          <div className="report-popup-content">
            <h3>Submit a Report</h3>
            <form onSubmit={handleReportSubmit} className="report-form">
              <div className="report-form-group">
                <label>Complaint:</label>
                <textarea
                  className="report-form-input"
                  placeholder="Describe the toxic content..."
                  required
                  rows="5"
                />
              </div>
              <div className="report-form-group">
                <label>Website where you faced the issue:</label>
                <input 
                  type="text" 
                  className="report-form-input"
                  placeholder="Enter website URL" 
                  required 
                />
              </div>
              <div className="report-form-group">
                <label>Username of the harasser:</label>
                <input 
                  type="text" 
                  className="report-form-input"
                  placeholder="Enter username" 
                  required 
                />
              </div>
              <div className="report-form-group">
                <label>Upload Screenshot:</label>
                <div className="report-file-upload">
                  <input
                    type="file"
                    id="screenshot"
                    className="report-file-input"
                    accept="image/*"
                    onChange={(e) => {
                      const fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
                      document.getElementById("file-name").textContent = fileName;
                    }}
                  />
                  <label htmlFor="screenshot" className="report-file-label">
                    Choose File
                  </label>
                  <div id="file-name" className="report-file-name">
                    No file chosen
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                className="report-submit-btn"
              >
                Submit Report
              </button>
            </form>
            <button 
              className="report-close-btn" 
              onClick={() => setShowReportForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;  