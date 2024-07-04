import React, { Component } from 'react'

export class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  onUpdateSearch = (e) => {
    const name = e.target.value;
    this.setState({ name });
    // this.props.onUpdateSearch(name);
  };
  onUpdateStorage = async(e) => {
    e.preventDefault();
    localStorage.setItem("name", this.state.name);
    const characters = await this.props.getPeople(this.state.name);
    console.log(characters);
    
  };
  
  render() {
    return (
      <form className="search" action="">
        <input onChange={this.onUpdateSearch} type="text" name="" id="" />
        <button onClick={this.onUpdateStorage}>Search</button>
      </form>
    );
  }
}

