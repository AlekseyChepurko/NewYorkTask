import { takeLatest, put } from 'redux-saga/effects';
import SagasManager from '../helpers/sagasManager';

const appName = APP_NAME;
const GET_ARTICLES = `${appName}/Articles/GET_ARTICLES`;
const ADD_ARTICLES = `${appName}/Articles/ADD_ARTICLES`;
const LOAD_ARTICLES_COUNT = `${ appName }/Articles/LOAD_ARTICLES_COUNT`;
const SET_ARTICLES_COUNT = `${ appName }/Articles/SET_ARTICLES_COUNT`;
const CHANGE_PAGE = `${ appName }/Articles/CHANGE_PAGE`;

const initialState = {
    articlesCount: 0,
    articlesPerPage: 5,
    articlesList: [],
    currentPage: 0
};

export default function Articles(state = initialState, action){
    switch (action.type) {
        case ADD_ARTICLES: {
            const newList = [...state.articlesList];
            newList[action.payload.index] = action.payload.articles;
            return {
                ...state,
                articlesList: newList
            }
        }
        case SET_ARTICLES_COUNT:
            return {
                ...state,
                articlesCount: action.payload.articlesCount
            };
        case CHANGE_PAGE: return {
            ...state,
            currentPage: action.payload.pageNumber
        };
        default: return state;
    }
}

const addArticles = ( payload ) => ({
    type: ADD_ARTICLES,
    payload
});

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload
});

const setArticlesCount = (payload) => ({
    type: SET_ARTICLES_COUNT,
    payload
});

export const loadArticlesCount = ( payload ) => ({
    type: LOAD_ARTICLES_COUNT,
    payload
});

export const changePage = (payload) => ({
    type: CHANGE_PAGE,
    payload
});

function* watchGetArticles(action){
    const articles = yield fetch(`/api/articles/list`)
        .then(r => r.json())
        .catch(e => {
            console.log(e);
        });
    yield put(addArticles({
        articles,
        index: action.payload.index
    }));
}

function* watchLoadArticlesCount(action) {
    const count = yield fetch('/api/articles/count').then( r => r.json());
    yield put(setArticlesCount({
        articlesCount: count
    }));
}

SagasManager.addSagaToRoot(function* () {
    yield takeLatest(LOAD_ARTICLES_COUNT, watchLoadArticlesCount);
    yield takeLatest(GET_ARTICLES, watchGetArticles);
});
