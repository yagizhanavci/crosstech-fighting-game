import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import FightScreen from "./components/FightScreen";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/fight-screen" component={FightScreen} />
      <Route path="*" render={() => <Redirect to="/" />} />
      {/* For not found routes */}
    </Switch>
  );
};

export default App;
