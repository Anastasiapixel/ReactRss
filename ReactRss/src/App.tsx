import { Component, Suspense } from "react";
import { Forms } from "./components/forms";
import { Result } from "./components/result";
import { render } from "react-dom";
// import { render } from "react-dom";





const getPeople = async (name) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`,
  );
  const data: void = await response.json();
  return data;
};
export default class SearchApp extends Component {
  state = {
    results: [],
    names: () => {},
    date: () => {},
    name: "",
    person: [],
    birth_year: "",
    data: "",
  };

  callbackResults = (value) => {
    this.setState({ results: value });
   
console.log(this.state.names);
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
              date={this.state.results.map((person) => person.birth_year)}     />
          </Suspense>
        </div>
      </div>
    );
  }
}

