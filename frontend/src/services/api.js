import axios from 'axios';

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async createStory(storyData) {
    const response = await this.client.post('/stories/create', storyData);
    return response.data;
  }

  async getJobStatus(jobId) {
    const response = await this.client.get(`/jobs/${jobId}`);
    return response.data;
  }

  async getCompleteStory(storyId) {
    const response = await this.client.get(`/stories/${storyId}/complete`);
    return response.data;
  }
}

export const apiService = new ApiService();