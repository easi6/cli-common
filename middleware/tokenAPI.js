import {apiMiddleware, isRSAA, RSAA, CALL_API} from 'redux-api-middleware';
import {normalize} from 'normalizr';

export const CLEAR_REFRESH_TOKEN_PROMISE = 'CLEAR_REFRESH_TOKEN_PROMISE';
export const SAVE_REFRESH_TOKEN_PROMISE = 'SAVE_REFRESH_TOKEN_PROMISE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_FAILURE = 'TOKEN_REFRESH_FAILURE';

const defaultConfig = {
  refreshReducerKey: 'tokenRefresh',
  saveRefreshTokenPromise: promise => ({
    type: SAVE_REFRESH_TOKEN_PROMISE,
    promise,
  }),
  clearRefreshTokenPromise: () => ({
    type: CLEAR_REFRESH_TOKEN_PROMISE,
  }),
}; // TODO implement

const requestNewAccessToken = ({
  store, next,
  getRefreshToken, refreshTokenAction,
  clearRefreshTokenPromise,
  saveRefreshToken, saveAccessToken,
}) => store.dispatch(refreshTokenAction(getRefreshToken())).then((response) => {
  next(clearRefreshTokenPromise());

  if (!response.error) {
    saveRefreshToken(response.payload);
    saveAccessToken(response.payload);

    return {error: false};
  }

  return {error: true};
});

export {CALL_API, RSAA};
export default function tokenAPIMiddleware(config = {}) {
  const {
    getAccessToken,
    getRefreshToken,
    baseURL,
    refreshReducerKey,
    saveRefreshTokenPromise,
    clearRefreshTokenPromise,

    refreshTokenAction,
    saveRefreshToken,
    saveAccessToken,

    refreshFailure,
  } = {...defaultConfig, ...config};

  const middleware = store => next => (originalAction) => {
    // before injection
    // inject access token for bearer auth
    let copiedAction = originalAction;
    const schema = originalAction.schema;
    if (isRSAA(originalAction)) {
      copiedAction = {...originalAction};
      const callApi = copiedAction[RSAA];
      // set access token
      if (copiedAction.authenticated) {
        callApi.headers = Object.assign({}, callApi.headers, {
          Authorization: `Bearer ${getAccessToken()}`,
        });
      }
      delete copiedAction.authenticated;
      delete copiedAction.schema;

      if (callApi.endpoint.startsWith('/')) {
        let resolvedBaseURL = baseURL;
        if (typeof resolvedBaseURL === 'function') {
          resolvedBaseURL = resolvedBaseURL();
        }
        callApi.endpoint = `${resolvedBaseURL}${callApi.endpoint}`;
      }
    }

    // call middleware

    const nextWrapper = (action) => { // this is for apiMiddleware's next monkey patch
      console.log('inside nextWrapper');
      console.log(action);
      if (action.error) {
        if (action.payload.status === 401) {
          next(action);
          let refreshPromise = store.getState()[refreshReducerKey].refreshTokenPromise;

          if (!refreshPromise) {
            refreshPromise = requestNewAccessToken({
              store,
              next,
              getRefreshToken,
              refreshTokenAction,
              clearRefreshTokenPromise,
              saveRefreshToken,
              saveAccessToken,
            });
            next(saveRefreshTokenPromise(refreshPromise));
          }

          return refreshPromise.then((response) => {
            if (!response.error) {
              return store.dispatch(originalAction);
            }

            // even the refresh token failed
            return store.dispatch(refreshFailure()).then(() => ({error: true}));
          });
        }
        return next(action);
      }

      if (action.payload && schema) {
        action.payload = normalize(action.payload, schema);
      }

      return next(action);
    };

    const apiNext = apiMiddleware(store)(nextWrapper);
    return apiNext(copiedAction);
  };

  return middleware;
}
