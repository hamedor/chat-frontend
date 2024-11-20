import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

abstract class ApiService {
  protected axiosInstance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }
}

export default ApiService;