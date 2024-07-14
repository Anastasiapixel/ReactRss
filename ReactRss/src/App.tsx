import { Suspense, useCallback, useState } from "react";
import { Forms, PersonType } from "./components/forms";
import { Result } from "./components/result";


interface AppType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  callbackResults: (value: string[]) => void;
  names: string[];
  results: string[];
  name: string;
}
const getPeople: AppType["getPeople"] = async (name: string): Promise<{ results: PersonType[]; }> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`,
  );
  const data = await response.json();
  return data;
};
export const SearchApp = () => {
const [results, setResults] = useState<PersonType[]>([]);
const names = useCallback(() => {}, []);

const callbackResults = useCallback((value: PersonType[]) => {
  setResults(value);
  console.log(names);
}, [names]);

    return (
      <div className="block">
        <div className="first">
          <Forms getPeople={getPeople} callbackResults={callbackResults} results={[]} />
        </div>
        <div className="second">
          <Suspense fallback={<div>Loading...</div>}>
            <Result 
              names={results.map((person) => person.name)}
              date={results.map((person) => person.birth_year)}            />
          </Suspense>
        </div>
      </div>
    );
  
}
export default SearchApp;
