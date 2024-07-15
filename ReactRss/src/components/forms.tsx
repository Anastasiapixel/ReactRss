import { useState, useEffect, ChangeEvent, useCallback, useLayoutEffect } from "react";

export interface PersonType {
  name: string;
  birth_year: string;
}

interface FormState {
  name: string;
  results: PersonType[];
}

interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
}

export const Forms = (
  props: PropsType,
  callbackResults: (results: PersonType[]) => void,
) => {
  const [name, setName] = useState<string>("");
  const [results, setResults] = useState<PersonType[]>([]);
  const [state, setState] = useState<FormState>({
    name: "",
    results: [],
  });
  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onUpdateStorage = useCallback(async () => {
    localStorage.setItem("name", name);
    const characters = await props.getPeople(name);
    setResults(characters.results);
    const names = characters.results.map((person) => person.name);
    const date = characters.results.map((person) => person.birth_year);
    console.log(date);
    console.log(names);
  }, [name, props]);

  useEffect(() => {
    if (results.length === 0) {
      onUpdateStorage();
      console.log("clean");
      props.callbackResults(results);
      setResults(results);
    } else {
      console.log(results.length);
      console.log("not clean");
    }
  }, []);
  useLayoutEffect(() => {

          console.log("clean");
          props.callbackResults(results);
          setResults(results);
  }, [results]);
  const handleClick = () => {
    onUpdateStorage();
    setResults(results);
    props.callbackResults(results);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setResults(props.results);
  //     await onUpdateStorage();
  //     props.callbackResults(results);
  //     console.log(results);
  //   };

  //   fetchData();
  // });

  return (
    <div className="search">
      <input onChange={onUpdateSearch} type="text" />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};
