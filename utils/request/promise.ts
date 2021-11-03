import qs from 'qs';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface FormatResponse<Res = any> extends AxiosResponse<Res> {
  ok: boolean;
  json: () => Promise<Res>;
  blob: () => Promise<Res>;
  text: () => Promise<Res>;
  headers: AxiosResponse['headers'] & {
    get: (key: string) => any;
  };
}

const formatResponse = (response: AxiosResponse) => {
  const deprecatedFormatFunction = () => {
    console.warn('EASI6 Warning: .json, .blob, .text etc.. is not supported on axios. Please use `response.data`');
    return Promise.resolve(response.data);
  };

  return {
    ...response,
    ok: response.statusText === 'OK' || (response.status >= 200 && response.status <= 300),
    json: deprecatedFormatFunction,
    blob: deprecatedFormatFunction,
    text: deprecatedFormatFunction,
    headers: {
      ...response.headers,
      get: (key = '') => response.headers[key] || response.headers[key.toLowerCase()],
    },
  };
};

const formatError = (error: AxiosError) => {
  if (error.response) {
    return formatResponse(error.response);
  } else {
    return Promise.reject(error);
  }
};

const HTTP_METHODS: Method[] = ['GET', 'POST', 'PUT', 'DELETE'];
const DEFAULT_REQUEST_OPTIONS = { json: true, parseJSON: true };

const createApi = (axiosInstance: AxiosInstance, getAccessToken: Function) => {
  axiosInstance.defaults.timeout = 30 * 1000; // milliseconds
  axiosInstance.interceptors.response.use(formatResponse, formatError);

  const api: { [key: string]: <Res = any>(endpoint: string, body?: any) => Promise<FormatResponse<Res>> } = {};

  HTTP_METHODS.forEach((method) => {
    api[method.toLowerCase()] = async <Res = any>(endpoint: string, body: any) => {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      };

      const requestParam: AxiosRequestConfig = {
        url: endpoint,
        [method === 'GET' ? 'params' : 'data']: body,
        method,
        headers,
        ...DEFAULT_REQUEST_OPTIONS,
        paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' }),
      };

      if (requestParam.headers['Content-Type'] === 'application/json' && requestParam.data === undefined) {
        requestParam.data = null;
      }

      const response = await axiosInstance(requestParam);

      return response as FormatResponse<Res>;
    };
    return;
  });

  return api;
};

/**
 *
 * @param axiosInstance Create by Axios.create()
 * @param getAccessToken Get Your Access Token Function.
 */
const requestPromiseApiWithAuthorize = (axiosInstance: AxiosInstance, getAccessToken: Function) =>
  createApi(axiosInstance, getAccessToken);

export default requestPromiseApiWithAuthorize;
