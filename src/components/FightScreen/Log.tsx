import React from "react";

interface LogProps {
  logText: string;
}

const Log: React.FC<LogProps> = ({ logText }) => {
  const renderText = (
    <p>
      {logText.split(" ").map(word => {
        if (word === "auto") {
          return <span className="log-text-ability-auto">AUTO </span>;
        } else if (word === "hadouken") {
          return <span className="log-text-ability-hadouken">HADOUKEN </span>;
        } else if (word === "shoryuken") {
          return <span className="log-text-ability-shoryuken">SHORYUKEN </span>;
        } else return `${word} `;
      })}
    </p>
  );
  return <div className="log">{renderText}</div>;
};

export default Log;
