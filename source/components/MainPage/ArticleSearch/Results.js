import React from 'react';
import { string, array, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import './Result.css';

class Results extends React.Component {
  render() {
    const {
            articlesList,
            currentPage,
        } = this.props;
    const results =
            articlesList[currentPage]
                ? articlesList[currentPage].map((item) => <Result key={ item._id } { ...item } />)
                : null;
    return (<ul>
      {results}
    </ul>);
  }
}

Results.propTypes = {
  articlesList: array,
  currentPage: number,
};

Results.defaultProps = {
  articlesList: [],
  currentPage: 1,
};

const Result = (props) => {
  const {
        headline,
        lead,
        _id: id,
    } = props;
  const creationDate = moment(props.creationDate).format('Do MMMM YYYY');

  return (<li className='articles__result-wrap'>
    <div className='articles__result-header'>
      <h2 className='headline'><Link className='btn btn-link' to={ `/article/${ id }/` }>{headline}</Link></h2>
      <div className='articles__result-creationDate'>{creationDate}</div>
    </div>
    <div className='articles__result-lead'>{lead}</div>
  </li>);
};

Result.defaultProps = {
  headline: 'head',
  lead: 'lead',
  creationDate: Date.now(),
  _id: '',
};

Result.propTypes = {
  headline: string,
  lead: string,
  creationDate: string,
  _id: string,
};


const mapStateToProps = (state) => ({
  articlesList: state.Articles.articlesList,
  currentPage: state.Articles.currentPage,
});

export default connect(mapStateToProps)(Results);
