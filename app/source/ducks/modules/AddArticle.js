import { call, takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import SagasManager from '../helpers/sagasManager';

const appName = APP_NAME;
const ADD_ARTICLE = `${ appName }/AddArticle/ADD_ARTICLE`;
const ADD_FINISHED = `${ appName }/AddArticle/ADD_FINISHED`;
const CLEAR_STATUS = `${ appName }/AddArticle/CLEAR_STATUS`;

const initialState = {
  status: '',
};

export default function AddArticle(state = initialState, action) {
  switch (action.type) {
    case ADD_FINISHED: return {
      ...state,
      ...action.payload,
    };
    case CLEAR_STATUS:
      return {
        status: '',
      };
    default: return state;
  }
}

export const addArticle = (payload) => ({
  type: ADD_ARTICLE,
  payload,
});

const addFinished = (payload) => ({
  type: ADD_FINISHED,
  payload,
});

const clearStatus = () => ({
  type: CLEAR_STATUS,
});

function* watchAddArticle(action) {
  const body = JSON.stringify(action.payload);
  const res = yield fetch('/api/articles/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).catch(e => `error ${ e }`);
  yield put(addFinished({ status: res.status, statusText: res.statusText }));
  yield call(delay, 2000);
  yield put(clearStatus());
}

SagasManager.addSagaToRoot(function* () {
  yield takeLatest(ADD_ARTICLE, watchAddArticle);
});
