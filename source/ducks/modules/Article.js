import { takeLatest, put } from 'redux-saga/effects';
import SagasManager from '../helpers/sagasManager';

const appName = APP_NAME;
const LOAD_ARTICLE = `${appName}/Articles/LOAD_ARTICLE`;
const SET_ARTICLE = `${appName}/Articles/SET_ARTICLE`;

const initialState = null;

export default function Article(state=initialState, action){
    switch (action.type){
        case SET_ARTICLE: return action.payload;
        default: return state;
    }
}

export const loadArticle = (payload) => ({
    type: LOAD_ARTICLE,
    payload
});

const setArticle = (payload) => ({
    type: SET_ARTICLE,
    payload
});

function* watchLoadArticle(action){
    const id =  action.payload.id;
    const data = yield fetch(`/api/article/${id}`).then(r => r.json())
        .catch(e => "error");
    yield put(setArticle(data))
}

SagasManager.addSagaToRoot(function* () {
    yield takeLatest(LOAD_ARTICLE, watchLoadArticle);
});
