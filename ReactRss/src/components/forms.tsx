import React, { Component } from 'react'
import { flushSync } from 'react-dom';

export class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      results: [],

    };
  }
  onUpdateSearch = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  onUpdateStorage = async () => {
    localStorage.setItem("name", this.state.name);
    const characters = await this.props.getPeople(this.state.name);

    flushSync(() => {
      this.setState({ results: characters.results });
    });
 
    const names = this.state.results.map((person) => person.name);
    const date = this.state.results.map((person) => person.birth_year);
    console.log(date);
    console.log(names);
  };


  handleClick =  () => {
    this.setState({ results: this.props.results });
    this.onUpdateStorage();
    this.props.callbackResults(this.state.results);
  };

  async componentDidMount() {
   await this.onUpdateStorage();
    this.setState({ results: this.props.results });
    this.props.callbackResults(this.state.results);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.results == prevState.results ||
      this.props.callbackResults !== prevProps.callbackResults
    ) {
      this.onUpdateStorage();
      
      
    }
  }

  render() {
    return (
      <div className="search">
        <input onChange={this.onUpdateSearch} type="text" name="" id="" />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

