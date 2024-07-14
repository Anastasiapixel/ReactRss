import { Suspense, useCallback, useState } from "react";
import { Forms } from "./components/forms";
import { Result } from "./components/result";
// import { render } from "react-dom";

type AppType = {
  getPeople: (name: string) => void;
  results: string[];
  callbackResults: (value: string[]) => void;
  name: string;
}
const getPeople : AppType["getPeople"] = async (name) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`,
  );
  const data: void = await response.json();
  return data;
};
const SearchApp : React.FC<AppType> = () => {
  const [results, setResults] = useState([]);
  const names = useCallback(() => {}, []);
  const date = useCallback(() => {}, []);
  const [name, setName] = useState("");
  const [person, setPerson] = useState([]);
  const [birth_year, setBirthYear] = useState("");
  const [data, setData] = useState("");

const callbackResults = useCallback((value: string[]) => {
  setResults(value);
  console.log(names);
}, [names]);


    return (
      <div className="block">
        <div className="first">
          <Forms getPeople={getPeople} callbackResults={callbackResults} />
        </div>
        <div className="second">
          <Suspense fallback={<div>Loading...</div>}>
            <Result 
              names={results.map((person) => person.name)}
              date={results.map((person) => person.birth_year)}    
               />
          </Suspense>
        </div>
      </div>
    );
  
}
export default SearchApp;
