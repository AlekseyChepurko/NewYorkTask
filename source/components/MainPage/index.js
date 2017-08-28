import React from 'react';
import { Link } from 'react-router-dom';
import ArticleSearch from './ArticleSearch';
import Pagination from './Pagination';
import Results from './ArticleSearch/Results';


export const MainPage = (props) => (<div>
  <h1><Link to='/add' className='badge badge-secondary'>Add new</Link></h1>
  <ArticleSearch />
  <Pagination />
  <Results />
</div>);
