import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import { loadArticle } from 'DuckModules/Article';

class Article extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.loadArticle({ id });
  }
  render() {
    if (!this.props.article) {
      return <div>loading data...</div>;
    }
    const {
            headline,
            abstract,
        } = this.props.article;
    const links = this.props.article.links.map(link =>
      <a key={ link.link } href={ link.link }>{link.text}</a>);
    return (<div>
      <h1>{headline}</h1>
      <p>{abstract}</p>
      <div>{links}</div>
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

};

const mapStateToProps = (state) => ({
  article: state.Article,
});

export default connect(mapStateToProps, { loadArticle })(Article);
