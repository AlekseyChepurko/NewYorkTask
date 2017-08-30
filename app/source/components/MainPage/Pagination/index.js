import React from 'react';
import { string, number, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage } from 'DuckModules/Articles';
import './index.css';

class Pagination extends React.Component {
  render() {
    const {
            articlesCount,
            currentPage,
            articlesPerPage,
        } = this.props;
    const pageCount = articlesCount / articlesPerPage;
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <li key={ i }>
          <PageItem
            pageNumber={ i + 1 }
            active={ currentPage === i }
            changePage={ this.props.changePage }
          />
        </li>);
    }
    return (<ul className='pagination__wrap'>
      {pages}
    </ul>);
  }
}

Pagination.propTypes = {
  articlesCount: number,
  currentPage: number,
  articlesPerPage: number,
  changePage: func,
};

Pagination.defaultProps = {
  articlesCount: 0,
  currentPage: 1,
  articlesPerPage: 5,
  changePage: () => {},
};


const PageItem = (props) => {
  const {
        pageNumber,
        active,
    } = props;
  const clickHandle = (e) => {
    e.preventDefault();
    props.changePage({ pageNumber });
  };
  return (<Link
    className={ ` btn ${ active ? 'btn-primary' : 'btn-link' }` }
    to='#'
    onClick={ clickHandle }
  >{pageNumber}</Link>);
};

PageItem.propTypes = {
  pageNumber: number,
  changePage: func,
  active: bool,
};

PageItem.defaultProps = {
  active: false,
  pageNumber: 1,
  changePage: () => {},
};

const mapStateToProps = (state, ownProps) => ({
  params: ownProps.params,
  articlesCount: state.Articles.articlesCount,
  currentPage: state.Articles.currentPage,
  articlesPerPage: state.Articles.articlesPerPage,
});
export default connect(mapStateToProps, { changePage })(Pagination);
