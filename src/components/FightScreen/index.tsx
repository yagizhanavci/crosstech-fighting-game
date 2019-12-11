import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const FightScreen: React.FC<Props> = () => {
  return (
    <div>
      <h1>Welcome to FightScreen</h1>
    </div>
  );
};

export default FightScreen;
