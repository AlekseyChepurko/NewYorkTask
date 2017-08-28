import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

const Result = (props) => {
  const {
        headline,
        lead,
        _id,
        creationDate,
    } = props;
  const links = props.links.map((link) => {
    return <li key={ link }>{link}</li>;
  });
  return (<li className='articles__result-wrap'>
    <div className='articles__result-header'>
      <h2 className='headline'><Link to={ `/article/${ _id }/` }>{headline}</Link></h2>
      <div className='articles__result-creationDate'>{creationDate}</div>
    </div>
    <div className='articles__result-lead'>{lead}</div>
    <ul className='articles__result-links'>{links}</ul>
  </li>);
};

Result.defaultProps = {
  headline: 'head',
  lead: 'lead',
  creationDate: Date.now(),
  links: [
    {
      text: 'adyn',
      link: '#',
    },
    {
      text: 'dva',
      link: '#',
    },
  ],
};

Result.propTypes = {
  headline: string,
  lead: string,
  creationDate: string,
  links: arrayOf(shape({
    text: string,
    link: string,
  })),
};


const mapStateToProps = (state) => ({
  articlesList: state.Articles.articlesList,
  currentPage: state.Articles.currentPage,
});

export default connect(mapStateToProps)(Results);
