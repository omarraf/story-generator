import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreationForm } from './components/StoryCreation/CreationForm';
import { JobStatusPoll } from './components/JobTracking/JobStatusPoll';
import { StoryContent } from './components/StoryDisplay/StoryContent';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Choose Your Own Adventure</h1>
        <p>Create personalized interactive stories powered by AI</p>
      </div>
      <CreationForm />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generating" element={<JobStatusPoll />} />
          <Route path="/story/:storyId" element={<StoryContent />} />
          <Route path="*" element={
            <div className="not-found">
              <h2>Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/">Go Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
