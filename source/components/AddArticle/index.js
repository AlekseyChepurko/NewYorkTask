import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addArticle } from 'DuckModules/AddArticle';
import Links from './Links';
import './index.css';

class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      abstract: '',
      lead: '',
      creationDate: '',
      links: [],
    };
  }

  handleHeadline = (e) => {
    this.setState({
      headline: e.target.value,
    });
  };
  handleAbstract = (e) => {
    this.setState({
      abstract: e.target.value,
    });
  };
  handleLead = (e) => {
    this.setState({
      lead: e.target.value,
    });
  };
  handleCreationDate = (e) => {
    this.setState({
      creationDate: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addArticle(this.state);
  };
  addLink = (link) => {
    this.setState({
      links: [...this.state.links, link],
    });
  };
  render() {
    const {
      status,
        statusText,
    } = this.props;
    const disabledProp = status !== '' ? { disabled: true } : {};
    return (<div>
      <h1><Link to='/' className='badge badge-secondary'>Archive</Link></h1>
      <form className='article__create-form' onSubmit={ this.handleSubmit }>
        <div className='form-group'>
          <label htmlFor='idHeadline'>Headline</label>
          <input
            className='form-control'
            id='idHeadline'
            type='text'
            name='headline'
            value={ this.state.headline }
            onChange={ this.handleHeadline }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='idLead'>Lead</label>
          <textarea
            className='form-control'
            id='idLead'
            rows='2'
            type='text'
            name='abstract'
            value={ this.state.lead }
            onChange={ this.handleLead }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='idAbstract'>Abstract</label>
          <textarea
            className='form-control'
            id='idAbstract'
            rows='4'
            type='text'
            name='abstract'
            value={ this.state.abstract }
            onChange={ this.handleAbstract }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='idCreationDate'>Creation date</label>
          <input
            className='form-control'
            id='idCreationDate'
            type='date'
            name='creationDate'
            value={ this.state.creationDate }
            onChange={ this.handleCreationDate }
          />
        </div>
        <Links
          links={ this.state.links }
          addLink={ this.addLink }
        />
        <input
          type='submit'
          className='btn btn-primary'
          value='Add'
          id='submit'
          { ...disabledProp }
        />
        <label htmlFor='submit'>{statusText}</label>
      </form>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  status: state.AddArticle.status,
  statusText: state.AddArticle.statusText,
});

export default connect(mapStateToProps, { addArticle })(AddArticle);
