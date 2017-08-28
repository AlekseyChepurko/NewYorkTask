import React from 'react';
import ArticleSearch from './ArticleSearch';
import Pagination from './Pagination';
import Results from './ArticleSearch/Results';


export const MainPage = (props) => (<div>
  <ArticleSearch />
  <Pagination />
  <Results />
</div>);
