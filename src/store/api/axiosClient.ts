import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params: Record<string, unknown>): string =>
    queryString.stringify({ ...params, apiKey: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => config
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: AxiosError): Promise<never> => {
    throw error;
  }
);

export default axiosClient;