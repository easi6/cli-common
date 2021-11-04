import _ from 'lodash';
import * as qs from 'qs';
import { normalize } from 'normalizr';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface TadaRequestOptions extends AxiosRequestConfig {
  json: boolean;
  parseJSON: boolean;
  schema: any;
  headers: any;
  contentType: any;
  responseType: any;
  isBulkRequest: boolean;
  isArrayQuery: boolean;
  isParam: boolean;
}

export interface IterableIterator {}

export type FormatResponse = ReturnType<typeof formatResponse>;

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
const DEFAULT_REQUEST_OPTIONS = { json: true, parseJSON: true, isBulkRequest: false, isArrayQuery: false, isParam: false };

interface ApiConfig {
  authenticated: boolean;
  getAccessToken: Function;
  requestNewAccessToken: any;
}

export interface RefreshTokenConfig {
  axiosInstance: AxiosInstance;
  apiRequest: Function;
  response: FormatResponse;
}

const createApi = (axiosInstance: AxiosInstance, config: ApiConfig) => {
  const { getAccessToken, authenticated, requestNewAccessToken } = config;

  axiosInstance.defaults.timeout = 30 * 1000; // milliseconds
  axiosInstance.interceptors.response.use(formatResponse, formatError);

  const api: { [key: string]: (endpoint: string, body?: any, options?: Partial<TadaRequestOptions>) => any } = {};

  HTTP_METHODS.forEach((method) => {
    api[method.toLowerCase()] = function* requests(
      endpoint: string,
      body: any,
      options: Partial<TadaRequestOptions> = DEFAULT_REQUEST_OPTIONS,
    ): any {
      const originalOptions = { ...options };

      /* headers */
      let { headers = {} } = options;

      headers.Authorization = 'Basic dGFkYS1hZG1pbjp0YWRhLWFkbWluLXNlY3JldA==';
      if (options.contentType) {
        headers['Content-Type'] = options.contentType;
      }
      if (options.json) {
        headers['Content-Type'] = 'application/json';
      }
      headers = { ...headers, ...options.headers };

      /* request config */
      const requestConfig = {
        ...DEFAULT_REQUEST_OPTIONS,
        ..._.omit(options, ['headers', 'schema']),
      };
      if (requestConfig.responseType === undefined && !requestConfig.parseJSON) {
        requestConfig.responseType = 'blob';
      }

      if (!requestConfig.timeout && requestConfig.responseType === 'blob') {
        requestConfig.timeout = 3 * 60 * 1000;
      }

      if (!requestConfig.timeout && requestConfig.isBulkRequest) {
        requestConfig.timeout = 3 * 60 * 1000;
      }

      if (requestConfig.isArrayQuery) {
        requestConfig.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });
      }

      const requestParam: AxiosRequestConfig = {
        url: endpoint,
        [method === 'GET' || options.isParam ? 'params' : 'data']: body,
        method,
        headers,
        ...requestConfig,
      };

      if (requestParam.headers['Content-Type'] === 'application/json' && requestParam.data === undefined) {
        requestParam.data = null;
      }

      /* sending request */
      if (!authenticated) {
        return yield axiosInstance(requestParam);
      }
      headers.Authorization = `Bearer ${getAccessToken()}`;
      if (_.startsWith(requestParam.url, 'https://s3.ap-southeast-1.amazonaws.com/')) {
        requestParam.headers = null;
      }
      const response = yield axiosInstance(requestParam);

      if (requestConfig.responseType === 'blob' && response.status >= 400) {
        // convert blob data to JSON
        response.data = JSON.parse(yield new Response(response.data).text());
      }

      /* authorization failed */
      if (response.status === 401) {
        return yield requestNewAccessToken({
          axiosInstance,
          apiRequest: () => requests(endpoint, body, originalOptions),
          response,
        });
      }

      if (response.ok && response.data && options.schema) {
        response.data = normalize(response.data, options.schema);
      }
      return response;
    };
    return;
  });
  return api;
};

// export const authenticatedRequest = createApi(undefined, { authenticated: true });
// export const request = createApi(undefined, { authenticated: false });

export const requestApiWithAuthorize = (axiosInstance: AxiosInstance, config: ApiConfig) => createApi(axiosInstance, config);
export const requestApi = (axiosInstance: AxiosInstance, config: ApiConfig) => createApi(axiosInstance, config);
