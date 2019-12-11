import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "./store";
import { Player } from "./store/Player/types";
import { Dispatch } from "redux";
import { PlayerActionTypes } from "./store/Player/actions/types";
import { playerAttack } from "./store/Player/actions/playerAttack";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import FightScreen from "./components/FightScreen";

interface Props {
  players: Player[];
  attack: (from: string, actionName: string, turn: number) => PlayerActionTypes;
}

const App: React.FC<Props> = ({ players, attack }) => {
  useEffect(() => {
    attack("bot", "abilityName-1", 1);
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/fight-screen" component={FightScreen} />
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    attack: (from: string, actionName: string, turn: number) =>
      dispatch<PlayerActionTypes>(playerAttack(from, actionName, turn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
