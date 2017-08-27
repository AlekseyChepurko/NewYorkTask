import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Articles from "./modules/Articles";
import Article from "./modules/Article";

export default combineReducers({
    Articles,
    Article,
    routerReducer
});
