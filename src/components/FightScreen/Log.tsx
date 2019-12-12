import React from "react";

interface LogProps {
  logText: string;
}

const Log: React.FC<LogProps> = ({ logText }) => {
  return (
    <div className="log">
      <p className="log-text">{logText}</p>
    </div>
  );
};

export default Log;
