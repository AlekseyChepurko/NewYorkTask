import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Pagination extends React.Component {
    render(){
        const {
            articlesCount,
            currentPage,
            articlesPerPage
        } = this.props;
        const pageCount = articlesCount/articlesPerPage;
        const pages = [];
        for(let i=0; i<pageCount; i++){
            pages.push(
                <li key={i}>
                    <PageItem pageNumber={i+1} />
                </li>)
        }
        return <ul>
            {pages}
        </ul>
    }
}

const PageItem = (props) => {
    const {
        pageNumber,
        changePage
    } = props;
    const clickHandle = (e) => {
        e.preventDefault();
        changePage(pageNumber)
    };
    return <button onClick={clickHandle}>{pageNumber}</button>
};

const mapStateToProps = (state, ownProps) => ({
    params: ownProps.params,
    articlesCount: state.Articles.articlesCount,
    currentPage: state.Articles.currentPage,
    articlesPerPage: state.Articles.articlesPerPage
});
export default connect(mapStateToProps)(Pagination);