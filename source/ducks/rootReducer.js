import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AddArticle from './modules/AddArticle';
import Articles from './modules/Articles';
import Article from './modules/Article';

export default combineReducers({
  AddArticle,
  Articles,
  Article,
  routerReducer,
});
