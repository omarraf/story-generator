import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useJobPolling(jobId, enabled = true) {
  const [jobStatus, setJobStatus] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !jobId) return;

    let pollInterval;
    let mounted = true;

    const poll = async () => {
      try {
        const status = await apiService.getJobStatus(jobId);
        if (!mounted) return;

        setJobStatus(status);
        
        if (status.status === 'completed' || status.status === 'failed') {
          setIsPolling(false);
          clearInterval(pollInterval);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err);
        setIsPolling(false);
        clearInterval(pollInterval);
      }
    };

    setIsPolling(true);
    poll();
    pollInterval = setInterval(poll, 2000);

    return () => {
      mounted = false;
      clearInterval(pollInterval);
    };
  }, [jobId, enabled]);

  return { jobStatus, isPolling, error };
}