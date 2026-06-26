import axios, { AxiosRequestConfig } from "axios";
import { getToken, saveToken } from "./storage";
import { AUTH, base_url } from "./constants/config";

const axiosInstance = axios.create({ baseURL: base_url });

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getToken("refreshToken");
        const { data } = await axios.post(AUTH.refresh(refreshToken!));
        await Promise.all([
          saveToken("accessToken", data.access_token),
          saveToken("refreshToken", data.refresh_token),
        ]);
        
        isRefreshing = false;
        processQueue(null, data.access_token);

        originalRequest.headers["Authorization"] =
          `Bearer ${data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// API Request helpers
type Params = Record<string, unknown> | object;

const request = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  body?: unknown,
  params?: Params,
  responseType: AxiosRequestConfig["responseType"] = "json",
): Promise<T> => {
  const res = await axiosInstance.request<T>({
    url,
    method,
    data: body,
    params,
    responseType,
  });

  return res.data;
};

export const api = {
  get: <T>(url: string, params?: Params) =>
    request<T>("GET", url, undefined, params),

  post: <T>(url: string, body?: unknown, params?: Params) =>
    request<T>("POST", url, body, params),

  put: <T>(url: string, body?: unknown, params?: Params) =>
    request<T>("PUT", url, body, params),

  patch: <T>(url: string, body?: unknown, params?: Params) =>
    request<T>("PATCH", url, body, params),

  delete: <T>(url: string, params?: Params) =>
    request<T>("DELETE", url, undefined, params),

  //For file downloads
  getBlob: (url: string, params?: Params) =>
    request<Blob>("GET", url, undefined, params, "blob"),
};
