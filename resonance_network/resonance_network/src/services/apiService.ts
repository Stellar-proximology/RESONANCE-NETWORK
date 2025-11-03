import axios from 'axios';

const BASE_URL = import.meta.env.DEV ? '/api' : 'https://alexisacui47.lastapp.dev';
const APP_ID = '162db931-1988-4997-b8b4-a38cb52184c7';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  email: string;
  provider: string;
  created_at: string;
}

export interface UserProfile {
  id?: string;
  user_id: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  current_state: string;
  challenge: string;
  dream: string;
  skills: string[];
  needs: string[];
  availability: Record<string, string>;
  natal_gates: Array<{
    gate: number;
    line: number;
    color: number;
    tone: number;
    base: number;
    description: string;
  }>;
}

export interface GlobalForecast {
  id?: string;
  forecast_date: string;
  resonance_index: number;
  text_summary: string;
  active_gates: string[];
  suggested_tags: string[];
  rule_version: string;
}

export interface PersonalForecast {
  id?: string;
  user_id: string;
  forecast_date: string;
  text_summary: string;
  active_gates: string[];
  transit_effects: string;
  suggested_tags: string[];
  rule_version: string;
}

export interface DailyLog {
  id?: string;
  user_id: string;
  log_date: string;
  resonance_score: number;
  mood_score: number;
  note: string;
  selected_tags: string[];
}

export interface Pod {
  id?: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  resonance_theme: string;
  cynthia_guidance: string;
}

export interface PodMember {
  id?: string;
  pod_id: string;
  user_id: string;
  joined_at: string;
  left_at?: string;
  feedback?: string;
}

export interface PodMessage {
  id?: string;
  pod_id: string;
  user_id: string;
  message: string;
}

export interface AIResponse {
  message: string;
  gates?: string[];
  tags?: string[];
  suggestion?: string;
}

class ApiService {
  // User Authentication
  async createUser(email: string, password: string): Promise<User> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'users',
      data: {
        email,
        password,
        provider: 'email',
      },
    });
    return response.data;
  }

  async loginUser(email: string, password: string): Promise<User> {
    const response = await api.post('/data/login', {
      app_id: APP_ID,
      email,
      password,
      provider: 'email',
    });
    return response.data;
  }

  // User Profile Operations
  async createUserProfile(profile: UserProfile): Promise<UserProfile> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'user_profiles',
      data: profile,
    });
    return response.data;
  }

  async updateUserProfile(profile: UserProfile): Promise<UserProfile> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'user_profiles',
      data: profile,
    });
    return response.data;
  }

  async getUserProfile(userId: string): Promise<UserProfile[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=user_profiles&user_id=${userId}`);
    return response.data;
  }

  // Global Forecasts
  async getGlobalForecasts(): Promise<GlobalForecast[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=global_forecasts`);
    return response.data;
  }

  async createGlobalForecast(forecast: GlobalForecast): Promise<GlobalForecast> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'global_forecasts',
      data: forecast,
    });
    return response.data;
  }

  // Personal Forecasts
  async getPersonalForecasts(userId: string): Promise<PersonalForecast[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=personal_forecasts&user_id=${userId}`);
    return response.data;
  }

  async createPersonalForecast(forecast: PersonalForecast): Promise<PersonalForecast> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'personal_forecasts',
      data: forecast,
    });
    return response.data;
  }

  // Daily Logs
  async getDailyLogs(userId: string): Promise<DailyLog[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=daily_logs&user_id=${userId}`);
    return response.data;
  }

  async createDailyLog(log: DailyLog): Promise<DailyLog> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'daily_logs',
      data: log,
    });
    return response.data;
  }

  async updateDailyLog(log: DailyLog): Promise<DailyLog> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'daily_logs',
      data: log,
    });
    return response.data;
  }

  // Pods
  async getPods(): Promise<Pod[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=pods`);
    return response.data;
  }

  async createPod(pod: Pod): Promise<Pod> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'pods',
      data: pod,
    });
    return response.data;
  }

  // Pod Members
  async getPodMembers(podId: string): Promise<PodMember[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=pod_members&pod_id=${podId}`);
    return response.data;
  }

  async createPodMember(member: PodMember): Promise<PodMember> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'pod_members',
      data: member,
    });
    return response.data;
  }

  // Pod Messages
  async getPodMessages(podId: string): Promise<PodMessage[]> {
    const response = await api.get(`/data?app_id=${APP_ID}&table_name=pod_messages&pod_id=${podId}`);
    return response.data;
  }

  async createPodMessage(message: PodMessage): Promise<PodMessage> {
    const response = await api.post('/data', {
      app_id: APP_ID,
      table_name: 'pod_messages',
      data: message,
    });
    return response.data;
  }

  // AI Text-to-Text API
  async queryAI(query: string): Promise<AIResponse> {
    const formData = new FormData();
    formData.append('app_id', APP_ID);
    formData.append('query', query);

    const response = await api.post('/aiapi/answertext', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  }
}

export const apiService = new ApiService();