import React, { Component } from "react";


export class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      results: [],
      names: [],
      date: [],
    };
  }


  render() {
    return (
      <div className="resultblock">

        {this.props.names.map((name, index) => (
          <div key={index}>
            <h1 key={index}>{name}</h1>
            <p>Birth year: {this.props.date[index]}</p>
          </div>
        ))}
      </div>
    );
  }
}
