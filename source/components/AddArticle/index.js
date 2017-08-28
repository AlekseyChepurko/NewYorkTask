import React from "react";
import { connect } from "react-redux";
import { addArticle } from "DuckModules/AddArticle";
class AddArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headline: "",
            abstract: "",
            creationDate: ""
        }
    }

    handleHeadline = (e) => {
        this.setState({
            headline: e.target.value
        })
    };
    handleAbstract = (e) => {
        this.setState({
            abstract: e.target.value
        })
    };
    handleCreationDate = (e) => {
        this.setState({
            creationDate: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addArticle(this.state);
    };
    render(){
        return <form onSubmit={this.handleSubmit}>
            <input type="text" name="headline" value={this.state.headline} onChange={this.handleHeadline}/>
            <input type="text" name="abstract" value={this.state.abstract} onChange={this.handleAbstract}/>
            <input type="date" name="creationDate" value={this.state.creationDate} onChange={this.handleCreationDate}/>
            <input type="submit" value="add"/>
        </form>
    }
}

export default connect(undefined, {addArticle})(AddArticle);