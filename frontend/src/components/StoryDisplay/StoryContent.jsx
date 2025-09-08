import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import './StoryContent.css';

export function StoryContent() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  
  const [story, setStory] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        const storyData = await apiService.getCompleteStory(storyId);
        setStory(storyData);
        setCurrentNodeId(storyData.root_node.id);
        setChoiceHistory([]);
      } catch (error) {
        console.error('Error loading story:', error);
        setError(error.response?.data?.detail || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      loadStory();
    }
  }, [storyId]);

  const currentNode = story?.all_nodes[currentNodeId];

  const handleChoice = (optionNodeId) => {
    setChoiceHistory([...choiceHistory, currentNodeId]);
    setCurrentNodeId(optionNodeId);
  };

  const goBack = () => {
    if (choiceHistory.length > 0) {
      const previousNodeId = choiceHistory[choiceHistory.length - 1];
      setCurrentNodeId(previousNodeId);
      setChoiceHistory(choiceHistory.slice(0, -1));
    }
  };

  const restart = () => {
    if (story) {
      setCurrentNodeId(story.root_node.id);
      setChoiceHistory([]);
    }
  };

  if (loading) {
    return (
      <div className="story-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-container">
        <div className="error-state">
          <h2>Story Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="home-button">
            Create New Story
          </button>
        </div>
      </div>
    );
  }

  if (!story || !currentNode) {
    return (
      <div className="story-container">
        <div className="error-state">
          <h2>Story Error</h2>
          <p>Unable to load story content</p>
          <button onClick={() => navigate('/')} className="home-button">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <div className="story-header">
        <h1 className="story-title">{story.title}</h1>
        <div className="story-controls">
          <button onClick={restart} className="control-button">
            🔄 Restart
          </button>
          <button onClick={() => navigate('/')} className="control-button">
            🏠 Home
          </button>
        </div>
      </div>

      <div className="story-content">
        <div className="node-content">
          <p>{currentNode.content}</p>
        </div>

        {currentNode.is_ending ? (
          <div className={`ending ${currentNode.is_winning_ending ? 'victory' : 'defeat'}`}>
            <h3>
              {currentNode.is_winning_ending ? '🎉 Victory!' : '💔 The End'}
            </h3>
            <div className="ending-actions">
              <button onClick={restart} className="play-again-button">
                Play Again
              </button>
              <button onClick={() => navigate('/')} className="new-story-button">
                Create New Story
              </button>
            </div>
          </div>
        ) : (
          <div className="choices">
            <h4>What will you do?</h4>
            <div className="choice-buttons">
              {currentNode.options.map((option, index) => (
                <button 
                  key={index}
                  onClick={() => handleChoice(option.node_id)}
                  className="choice-button"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {choiceHistory.length > 0 && !currentNode.is_ending && (
          <div className="navigation">
            <button onClick={goBack} className="back-button">
              ← Go Back
            </button>
          </div>
        )}
      </div>

      <div className="story-progress">
        <small>Choices made: {choiceHistory.length}</small>
      </div>
    </div>
  );
}