import React, { Component } from "react";
import { Forms } from "./components/forms";
import { Result } from "./components/result";

const getPeople = async (name) => {
 const response = await fetch(
  `https://swapi.dev/api/people/?search=${name}&format=json`
 );
 const data = await response.json();
 return data;
};
export default class SearchApp extends Component {

  // handleChangeName = (name) => {
  //      this.setState({
  //        name:
  //      });
  // }
  render() {
    return (
      <div className="block">
        <div className="first">
          <Forms getPeople={getPeople} />
        </div>
        <div className="second">
          <Result />
        </div>
      </div>
    );
  }
}
