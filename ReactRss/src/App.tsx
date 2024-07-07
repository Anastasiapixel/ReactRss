import React, { Component, Suspense } from "react";
import { Forms } from "./components/forms";
import { Result } from "./components/result";

const getPeople = async (name) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`,
  );
  const data = await response.json();

  return data;
};

export default class SearchApp extends Component {
  state = {
    results: [],
    names: [],
    date: [],
    name: "",
  };

  callbackResults = (value) => {
    this.setState({ results: value });
  };

  render() {
    return (
      <div className="block">
        <div className="first">
          <Forms getPeople={getPeople} callbackResults={this.callbackResults} />
        </div>
        <div className="second">
          <Suspense fallback={<div>Loading...</div>}>
            <Result
              names={this.state.results.map((person) => person.name)}
              date={this.state.results.map((person) => person.birth_year)}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}

