import React, { Component } from "react";
import { Forms } from "./components/forms";
import { Result } from "./components/result";
export default class SearchApp extends Component {
  render() {
    return (
      <div className="block">
        <div className="first">
          <Forms />
        </div>
        <div className="second">
         <Result />
        </div>
      </div>
    );
  }
}
