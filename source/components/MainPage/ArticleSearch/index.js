import React from 'react';
import { connect } from 'react-redux';
import { getArticles, loadArticlesCount } from 'DuckModules/Articles';
import "./index.css";

const maxDate = () => {
    let today = new Date();
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1;
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

class ArticleSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            sortBy: "creationDate",
            orderIncrease: true
        };
    }
    search = () => {
        this.props.loadArticlesCount();
        this.props.getArticles({
            index: this.props.currentPage,
            ...this.state

        });
    };
    submit = (e) => {
        e.preventDefault();
        this.search();
    };
    handleStartDate = (e) => {
        this.setState({ startDate: e.target.value})
    };
    handleEndDate = (e) => {
        this.setState({endDate: e.target.value})
    };

    toggleOrderIncrease = (e) => {
        e.preventDefault();
        this.setState({
            orderIncrease: !this.state.orderIncrease
        });
    };

    render() {
        if(this.props.currentList === undefined){
            this.search();
        }
        return <form className="search__form-wrap" onSubmit={this.submit}>
            <input
                type="date"
                value={this.state.startDate}
                onChange={this.handleStartDate}
                min="1851-09-18"
                max={maxDate()} name="startDate"/>
            <input
                type="date"
                value={this.state.endDate}
                onChange={this.handleEndDate}
                min="1851-09-18"
                max={maxDate()}
                name="endDate"/>
            <a href="#" onClick={this.toggleOrderIncrease} >{this.state.orderIncrease ? "↑" : "↓"}</a>
            <input type="submit" value="Search"/>
        </form>
    }
}
const mapStateToProps = ( state ) => ({
    currentPage: state.Articles.currentPage,
    currentList: state.Articles.articlesList[state.Articles.currentPage]
});
export default connect(mapStateToProps, {getArticles, loadArticlesCount})(ArticleSearch);