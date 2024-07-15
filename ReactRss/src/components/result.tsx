import { PersonType } from "./forms";

type ResultProps = {
  names: string[];
  date: string[];
};
export interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
}

export const Result: React.FC<ResultProps & PropsType> = ({ names, date }) => (
  
  
  <div className="resultblock">
    {names.map((name, index) => (
      <div key={index}>
        <h1 key={index}>{name}</h1>
        <p>Birth year: {date[index]}</p>
      </div>)
    )}
      </div>
    )

