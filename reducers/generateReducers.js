import {combineReducers} from 'redux';

const generateReducers = ({key, fetchListActions, fetchDetailActions}) => {
  const [listRequest, listSuccess, listFailure] = fetchListActions;
  const [detailRequest, detailSuccess, detailFailure] = fetchDetailActions;

  const byId = (state = {}, action) => {
    if (action.payload) {
      if ([listSuccess, detailSuccess].includes(action.type)) {
        return {
          ...state,
          ...action.payload.entities[key],
        };
      }
    }
    return state;
  };
  const getEntity = (state, id) => state[id];

  const ids = (state = [], action) => {
    if (action.payload && action.type === listSuccess) {
      return action.payload.result[key];
    }
    return state;
  };

  const page = (state={total: 1, current: 1}, action) => {
    if (action.payload && action.type === listSuccess) {
      return action.payload.result.page;
    }
    return state;
  };

  const isFetching = (state=true, action) => {
    if ([listRequest, detailRequest].includes(action.type)) {
      return true;
    } else if ([listSuccess, listFailure, detailSuccess, detailFailure].includes(action.type)) {
      return false;
    }
    return state;
  };

  const object = {
    reducers:
      combineReducers({
        byId,
        ids,
        page,
        isFetching,
      }),
    getById: (state) => (id) => getEntity(state.byId, id),
    getVisible(state) {
      const ids = state.ids;
      return ids.map(id => getEntity(state.byId, id));
    }
  };
  return object;
};

export default generateReducers;