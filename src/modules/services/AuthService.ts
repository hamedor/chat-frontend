import ApiService from '@/modules/services/ApiService';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

class AuthService extends ApiService {
  constructor() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    if (!baseURL) {
      throw new Error('Отсутствует URL в env');
    }
    super(baseURL);
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', { username, password });
  }

  async register(username: string, password: string): Promise<void> {
    await this.post<void>('/auth/register', { username, password });
  }

  async info(): Promise<LoginResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Токен отсутствует');
    }

    return await this.get<LoginResponse>('/auth/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AuthService();