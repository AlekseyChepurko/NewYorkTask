import React from 'react';


class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      link: '',
    };
  }
  handleText = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
  };
  handleLink = (e) => {
    e.preventDefault();
    this.setState({
      link: e.target.value,
    });
  };
  addLink = (e) => {
    e.preventDefault();
    this.props.addLink(this.state);
  };
  render() {
    const links = this.props.links.map((link, index) =>
      (<li key={ index }>
        <span>{index + 1}. </span>
        <a href={ link.link }>{link.text}</a>
      </li>));
    return (<div>
      <ul>
        {links}
      </ul>
      <div className='row'>
        <div className='col-lg-5 input-group'>
          <span className='input-group-addon'>Link</span>
          <input type='text' className='form-control' onChange={ this.handleLink } value={ this.state.link } />
        </div>
        <div className='col-lg-5 input-group'>
          <span className='input-group-addon'>Text</span>
          <input type='text' className='form-control' onChange={ this.handleText } value={ this.state.text } />
        </div>
        <button className='col-lg-2 btn btn-outline-info' onClick={ this.addLink }>Add Link</button>
      </div>
    </div>);
  }
}

export default Links;
