import { useState, useEffect, ChangeEvent, useCallback, useLayoutEffect, MouseEventHandler } from "react";
// import { AppType } from "../App";

export interface PersonType {
  name: string;
  birth_year: string;
}

interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
  // setLoaderResult: (isLoad: boolean) => void;
  loaderResult: (isLoad: boolean) => void;
  // isLoad: boolean;
}

interface ErrorType {
  error: Error;
  setError: () => boolean;
  errors: () => boolean;
}

export const Forms = (
  props: PropsType
) => {
  const [name, setName] = useState<string>("");
  const [results, setResults] = useState<PersonType[]>([]);
  const [error, setError] = useState<ErrorType | boolean>(false);
// const [loaderResult, setLoaderResult] = useState(false);
// const [loaderResult, setLoaderResult] = useState<AppType["isLoad"]>(false);((isload: AppType["isLoad"]) => {
//   setLoaderResult(isload);
// });
  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onUpdateStorage = useCallback(async () => {
    props.loaderResult(true);
    localStorage.setItem("name", name);
    const characters = await props.getPeople(name);
    setTimeout(() => {
    setResults(characters.results);
    const names = characters.results.map((person) => person.name);
    const date = characters.results.map((person) => person.birth_year);
    console.log(date);
    console.log(names);
    props.loaderResult(false);
    }, 1500);

  }, [name, props]);

  useEffect(() => {
    if (results.length === 0) {
      onUpdateStorage();
      console.log("clean");
      props.callbackResults(results);
      setResults(results);
      props.loaderResult(true);

    }
  }, []);
  useLayoutEffect(() => {
    props.callbackResults(results);
    setResults(results);

  }, [props, results]);
  const handleClick = () => {
    onUpdateStorage();
    setResults(results);
    props.callbackResults(results);
    // props.loaderResult(true);

  };
const errorMessage: MouseEventHandler<HTMLButtonElement> | boolean = () => {
setError(true);

}
if (error === true) {
  throw new Error("Error");
}
  return (
    
    <div className="search">
      <input onChange={onUpdateSearch} type="text" />
      <button onClick={handleClick}>Search</button>
      <button onClick={errorMessage}>Error's button</button>
    </div>
  );
};
