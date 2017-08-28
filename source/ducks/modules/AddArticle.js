import { takeLatest, put } from 'redux-saga/effects';
import SagasManager from '../helpers/sagasManager';

const appName = APP_NAME;
const ADD_ARTICLE = `${ appName }/AddArticle/ФВВ_ARTICLE`;
const ADD_FINISHED = `${ appName }/AddArticle/ADD_FINISHED`;

const initialState = {
  status: '',
};

export default function AddArticle(state = initialState, action) {
  switch (action.payload) {
    case ADD_FINISHED: return {
      ...state,
      ...action.payload,
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

function* watchAddArticle(action) {
  const body = JSON.stringify(action.payload);
  const res = yield fetch('/api/articles/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then(r => {
      return r;
    })
        .catch(e => `error ${ e }`);

  yield put(addFinished(res));
}

SagasManager.addSagaToRoot(function* () {
  yield takeLatest(ADD_ARTICLE, watchAddArticle);
});
