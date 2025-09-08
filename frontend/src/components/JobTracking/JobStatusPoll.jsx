import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJobPolling } from '../../hooks/useJobPolling';
import './JobStatusPoll.css';

export function JobStatusPoll() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  
  const { jobStatus, error } = useJobPolling(jobId, !!jobId);

  useEffect(() => {
    if (!jobId) {
      navigate('/');
      return;
    }

    if (jobStatus?.status === 'completed' && jobStatus.story_id) {
      navigate(`/story/${jobStatus.story_id}`);
    }
  }, [jobStatus, jobId, navigate]);

  if (!jobId) {
    return <div>No job ID provided</div>;
  }

  if (error) {
    return (
      <div className="job-status-container">
        <div className="error-state">
          <h2>Generation Failed</h2>
          <p>Unable to check story status: {error.message}</p>
          <button onClick={() => navigate('/')} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (jobStatus?.status === 'failed') {
    return (
      <div className="job-status-container">
        <div className="error-state">
          <h2>Story Generation Failed</h2>
          <p>{jobStatus.error || 'An unknown error occurred during story generation.'}</p>
          <button onClick={() => navigate('/')} className="retry-button">
            Create New Story
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-status-container">
      <div className="generating-state">
        <h2>Creating Your Story...</h2>
        <div className="status-info">
          <p>Status: <span className="status-text">{jobStatus?.status || 'pending'}</span></p>
          <p>Job ID: <span className="job-id">{jobId}</span></p>
        </div>
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <div className="progress-text">
          {jobStatus?.status === 'processing' ? (
            <p>AI is writing your adventure...</p>
          ) : (
            <p>Preparing your story...</p>
          )}
        </div>

        <div className="estimated-time">
          <small>This usually takes 30-60 seconds</small>
        </div>
      </div>
    </div>
  );
}