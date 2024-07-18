import { useCallback, useState } from 'react';
import { Forms, PersonType } from './components/forms';
import { Result } from './components/result';

export interface AppType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  callbackResults: (value: string[]) => void;
  names: string[];
  results: string[];
  name: string;
  setLoaderResult: (isLoad: boolean) => void;
  isLoad: boolean;
}
const getPeople: AppType['getPeople'] = async (
  name: string,
): Promise<{ results: PersonType[] }> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`,
  );
  const data = await response.json();
  return data;
};
export const SearchApp = () => {
  const [results, setResults] = useState<PersonType[]>([]);
  const callbackResults = useCallback((value: PersonType[]) => {
    setResults(value);
  }, []);

  const [loaderResult, setLoaderResult] = useState<AppType['isLoad']>(false);
  (isload: AppType['isLoad']) => {
    setLoaderResult(isload);
  };

  return (
    <div className="block">
      <div className="first">
        <Forms
          loaderResult={setLoaderResult}
          getPeople={getPeople}
          callbackResults={callbackResults}
          results={[]}
        />
      </div>
      <div className="second">
        <div className={loaderResult ? 'loader' : 'loaderHide'}>Loading...</div>
        <Result
          names={results.map((person) => person.name)}
          date={results.map((person) => person.birth_year)}
        />
      </div>
    </div>
  );
};

export default SearchApp;
