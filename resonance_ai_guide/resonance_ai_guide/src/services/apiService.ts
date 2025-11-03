const APP_ID = '6005f7e1-74d9-4cb0-889b-08da581329c0';
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://alexiszevkuj.lastapp.dev';

interface User {
  id: string;
  provider: string;
  created_at: string;
}

interface AIResponse {
  calculation_type?: string;
  input_data?: any;
  resonance_analysis?: any;
  guidance?: any;
  additional_considerations?: any;
  [key: string]: any;
}

class ApiService {
  private async makeRequest(endpoint: string, options: RequestInit): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async createAnonymousUser(): Promise<User> {
    const response = await this.makeRequest('/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: APP_ID,
        table_name: 'users',
        data: {
          provider: 'anonymous',
        },
      }),
    });

    return response;
  }

  async queryAI(query: string): Promise<AIResponse> {
    const formData = new URLSearchParams();
    formData.append('app_id', APP_ID);
    formData.append('query', query);

    const response = await this.makeRequest('/aiapi/answertext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    return response;
  }

  async calculateResonance(birthDate: string, birthTime: string, question: string): Promise<AIResponse> {
    const query = `Calculate my personal resonance using I Ching and Human Design principles. 
    Birth Date: ${birthDate}
    Birth Time: ${birthTime}
    Question/Focus: ${question}
    
    Please provide a comprehensive analysis including:
    - Primary I Ching hexagram
    - Human Design profile
    - Consciousness level assessment
    - Energy alignment guidance
    - Specific recommendations and actions
    - Additional considerations`;

    return this.queryAI(query);
  }

  async solveProblem(problemDescription: string, context: string): Promise<AIResponse> {
    const query = `Help me solve this problem using resonance principles, I Ching wisdom, and Human Design insights:
    
    Problem: ${problemDescription}
    Context: ${context}
    
    Please provide:
    - Analysis of the situation
    - Multiple solution approaches
    - Recommended actions
    - Timing considerations
    - Energy alignment suggestions
    - Potential obstacles and how to overcome them`;

    return this.queryAI(query);
  }
}

export const apiService = new ApiService();