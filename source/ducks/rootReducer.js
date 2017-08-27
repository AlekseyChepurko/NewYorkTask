import { combineReducers } from 'redux';
import Articles from "./modules/Articles";
import Article from "./modules/Article";

export default combineReducers({
    Articles,
    Article
});
