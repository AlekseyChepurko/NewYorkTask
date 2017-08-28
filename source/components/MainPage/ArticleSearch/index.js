import React from 'react';
import { connect } from 'react-redux';
import { func, number, arrayOf, object } from 'prop-types';
import { getArticles, loadArticlesCount, changePage } from 'DuckModules/Articles';
import './index.css';

const maxDate = () => {
  const today = new Date();
  const day = today.getDate() < 10 ? `0${ today.getDate() }` : today.getDate();
  const month = today.getMonth() + 1 < 10 ? `0${ today.getMonth() + 1 }` : today.getMonth() + 1;
  const year = today.getFullYear();
  return `${ year }-${ month }-${ day }`;
};

class ArticleSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: undefined,
      endDate: undefined,
      sortBy: 'creationDate',
      orderIncrease: true,
    };
  }
  search = () => {
    this.props.loadArticlesCount({ ...this.state });
    this.props.getArticles({
      index: this.props.currentPage,
      ...this.state,

    });
  };
  submit = (e) => {
    e.preventDefault();
    this.props.changePage({ pageNumber: 1 });
    this.search();
  };
  handleStartDate = (e) => {
    this.setState({ startDate: e.target.value });
  };
  handleEndDate = (e) => {
    this.setState({ endDate: e.target.value });
  };
  toggleOrderIncrease = (e) => {
    e.preventDefault();
    this.setState({
      orderIncrease: !this.state.orderIncrease,
    });
  };

  render() {
    if (this.props.currentList === undefined) {
      this.search();
    }
    return (<form className='search__form-wrap' onSubmit={ this.submit }>
      <div className='input-group col-lg-3 search__date-input'>
        <span className='input-group-addon' >Since</span>
        <input
          type='date'
          value={ this.state.startDate }
          onChange={ this.handleStartDate }
          min='1851-09-18'
          max={ maxDate() }
          name='startDate'
          className='form-control'
        />
      </div>
      <div className='input-group col-lg-3'>
        <label className='input-group-addon'>to</label>
        <input
          type='date'
          value={ this.state.endDate }
          onChange={ this.handleEndDate }
          min='1851-09-18'
          max={ maxDate() }
          name='endDate'
          id='endDate'
          className='form-control'

        />
      </div>
      <div>
        <a href='#' onClick={ this.toggleOrderIncrease } className='btn btn-link' >
          Order {this.state.orderIncrease ? '↑' : '↓'}
        </a>
        <input type='submit' className='btn btn-primary' value='Search' />
      </div>
    </form>);
  }
}

ArticleSearch.propTypes = {
  loadArticlesCount: func,
  getArticles: func,
  currentPage: number,
  changePage: func,
  currentList: arrayOf(object),
};

ArticleSearch.defaultProps = {
  loadArticlesCount: () => {},
  getArticles: () => {},
  currentPage: 1,
  changePage: () => {},
  currentList: [{}],
};

const mapStateToProps = (state) => ({
  currentPage: state.Articles.currentPage,
  currentList: state.Articles.articlesList[state.Articles.currentPage],
});
export default connect(mapStateToProps, {
  getArticles,
  loadArticlesCount,
  changePage })(ArticleSearch);
