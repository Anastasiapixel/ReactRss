import { useState, useEffect, ChangeEvent } from "react";
import { flushSync } from "react-dom";

export interface PersonType {
  name: string;
  birth_year: string;
}

interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
}

export const Forms = (props: PropsType) => {
  const [name, setName] = useState<string>("");
  const [results, setResults] = useState<PersonType[]>([]);

  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onUpdateStorage = async () => {
    localStorage.setItem("name", name);
    const characters = await props.getPeople(name);

    flushSync(() => {
      setResults(characters.results);
    });

    const names = results.map((person) => person.name);
    const date = results.map((person) => person.birth_year);
    console.log(date);
    console.log(names);
  };

  const handleClick = () => {
    setResults(props.results);
    onUpdateStorage();
    props.callbackResults(results);
  };

  useEffect(() => {
    onUpdateStorage();
  }, []);

  useEffect(() => {
    if (
      results !== props.results ||
      props.callbackResults !== props.callbackResults
    ) {
      onUpdateStorage();
    }
  }, [props, results]);

  return (
    <div className="search">
      <input onChange={onUpdateSearch} type="text" />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};


