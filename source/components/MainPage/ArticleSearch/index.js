import React from 'react';
import { connect } from 'react-redux';
import { getArticles, loadArticlesCount } from 'DuckModules/Articles';

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
            orderIncrease: false
        };
    }
    search = (e) => {
        e.preventDefault();
        this.props.loadArticlesCount();
        this.props.getArticles({
            index: 0,
            ...this.state

        });
    };
    handleStartDate = (e) => {
        this.setState({ startDate: e.target.value})
    };
    handleEndDate = (e) => {
        this.setState({endDate: e.target.value})
    };


    render() {
        return <form onSubmit={this.search}>
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
            <input type="submit" value="Search"/>
        </form>
    }
}

export default connect(undefined, {getArticles, loadArticlesCount})(ArticleSearch);