import React from "react";
import './Log.css';

interface LogProps {
  logText: string;
}

const Log: React.FC<LogProps> = ({ logText }) => {
  const renderText = (
    <p>
      {logText.split(" ").map((word,idx) => {
        if (word === "auto") {
          return <span key={idx} className="log-text-ability-auto">AUTO</span>;
        } else if (word === "hadouken") {
          return <span key={idx} className="log-text-ability-hadouken">HADOUKEN</span>;
        } else if (word === "shoryuken") {
          return <span key={idx} className="log-text-ability-shoryuken">SHORYUKEN</span>;
        } else return `${word} `;
      })}
    </p>
  );
  return <div className="log">{renderText}</div>;
};

export default Log;
