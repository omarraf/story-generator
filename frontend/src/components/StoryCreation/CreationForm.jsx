import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import './CreationForm.css';

export function CreationForm() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (!theme.trim()) {
      setError('Please enter a theme');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const job = await apiService.createStory({ title: title.trim(), theme: theme.trim() });
      navigate('/generating', { state: { jobId: job.job_id } });
    } catch (error) {
      console.error('Error creating story:', error);
      setError(error.response?.data?.detail || 'Failed to create story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="creation-form-container">
      <h1>Create Your Adventure</h1>
      <form onSubmit={handleSubmit} className="creation-form">
        <div className="form-group">
          <label htmlFor="title">Story Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your story title..."
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme">Story Theme</label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., fantasy, sci-fi, mystery, horror, romance..."
            disabled={isSubmitting}
            maxLength={50}
          />
          <small className="theme-hint">
            Be creative! Try themes like "underwater adventure", "time travel", "zombie apocalypse", etc.
          </small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={isSubmitting || !title.trim() || !theme.trim()}
          className="create-button"
        >
          {isSubmitting ? 'Creating...' : 'Create Story'}
        </button>
      </form>
    </div>
  );
}