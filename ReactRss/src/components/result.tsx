import React from "react";

type ResultProps = {
  names: string[];
  date: string[];

};

export const Result: React.FC<ResultProps> = ({ names, date }) => {


 
  return <>
    <div className="resultblock">
      {names.map((name, index) => (
        <div key={index}>
          <h1 key={index}>{name}</h1>
          <p>Birth year: {date[index]}</p>
        </div>
      ))}
    </div>
  </>
};

