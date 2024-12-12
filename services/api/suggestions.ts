import api from './client';
import type { 
  CreateSessionDto, 
  UpdateSessionDto, 
  Session, 
  SessionResponse, 
  SessionsResponse 
} from '@/types/suggestions';

/**
 * Suggestions API service for handling all suggestion-related API calls
 */
class SuggestionsApi {
  private readonly baseUrl = '/suggestions';

  /**
   * Create a new hypnosis session
   */
  async createSession(data: CreateSessionDto): Promise<SessionResponse> {
    return api.post(this.baseUrl, data);
  }

  /**
   * Get all hypnosis sessions
   */
  async getSessions(): Promise<SessionsResponse> {
    return api.get(this.baseUrl);
  }

  /**
   * Get a specific hypnosis session by ID
   */
  async getSession(id: string): Promise<SessionResponse> {
    return api.get(`${this.baseUrl}/${id}`);
  }

  /**
   * Update an existing hypnosis session
   */
  async updateSession(id: string, data: UpdateSessionDto): Promise<SessionResponse> {
    return api.patch(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Delete a hypnosis session
   */
  async deleteSession(id: string): Promise<SessionResponse> {
    return api.delete(`${this.baseUrl}/${id}`);
  }
}

export const suggestionsApi = new SuggestionsApi(); 