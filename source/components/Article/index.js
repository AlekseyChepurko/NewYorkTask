import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadArticle } from 'DuckModules/Article';
import './index.css';

class Article extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.loadArticle({ id });
  }
  render() {
    if (!this.props.article) {
      return <div className='article__data-preload'><span>loading data...</span></div>;
    }
    const {
            headline,
            abstract,
        } = this.props.article;
    const links = this.props.article.links.map(link => (<span key={ link.link }>
      <a href={ link.link } target='_blank'>{link.text}</a>;
    </span>));

    const creationDate = moment(this.props.creationDate).format('MMM do YYYY');

    return (<div className='jumbotron'>
      <h1 className='display-3 article__header'>{headline}</h1>
      <p>by {creationDate}</p>
      <p className='lead'>{abstract}</p>
      <div>
        Related links: {links}
      </div>
    </div>);
  }
}

Article.propTypes = {
  article: shape({
    headline: string,
    links: arrayOf(shape({
      link: string,
      text: string,
    })),
    abstract: string,
  }),
  match: shape({
    params: shape({
      id: string,
    }),
  }),
  loadArticle: func,
  creationDate: string,
};

Article.defaultProps = {
  article: {
    headline: '',
    links: [
      {
        name: '',
        link: '#',
      },
    ],
    abstract: '',
  },
  match: {
    params: {
      id: '',
    },
  },
  loadArticle: () => {},
  creationDate: '',

};

const mapStateToProps = (state) => ({
  article: state.Article,
});

export default connect(mapStateToProps, { loadArticle })(Article);
