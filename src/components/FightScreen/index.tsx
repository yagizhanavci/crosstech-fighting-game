import React, { useState, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Player } from "../../store/Player/types";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "redux";
import { PlayerActionTypes } from "../../store/Player/actions/types";
import { playerAttack } from "../../store/Player/actions/playerAttack";
import PlayerField from "./Player";
import "./FightScreen.css";
import { WarActionTypes } from "../../store/War/actions/types";
import { logActiveWarAction } from "../../store/War/actions/logActiveWarAction";
import { War } from "../../store/War/types";

interface FightScreenProps extends RouteComponentProps {
  players: Player[];
  activeWar: War;
  attack: (from: string, actionName: string, turn: number) => PlayerActionTypes;
  // logActiveWar: (
  //   turn: number,
  //   playerArmorPoints: number,
  //   botArmorPoints: number,
  //   playerHealthPoints: number,
  //   botHealthPoints: number,
  // ) => WarActionTypes;
}

const FightScreen: React.FC<FightScreenProps> = ({ players, attack }) => {
  const [turn, setTurn] = useState<number>(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  // If the player attacks , let the bot attack with random action(auto or ability attack) as well
  // and increment the turn after sometime
  const handlePlayerAttack = (player: string, actionName: string) => {
    if (player === "player") {
      attack(player, actionName, turn);
      setIsPlayerTurn(false);
      handleBotAttack();
    }
  };

  const handleBotAttack = () => {
    setTimeout(() => {
      const botRandomAction = Math.ceil(Math.random() + 1 * 3);
      const botActionName =
        botRandomAction === 1
          ? "auto"
          : botRandomAction === 2
          ? "abilityName-1"
          : "abilityName-2";
      attack("bot", botActionName, turn);
      setTurn(prevTurn => prevTurn + 1);
      setIsPlayerTurn(true);
    }, 2000);
  };

  if (players[0].name) {
    return (
      <div className="fight-screen">
        <div className="players-field">
          {players.map(player => (
            <PlayerField
              key={player.id}
              player={player}
              handlePlayerAttack={handlePlayerAttack}
              isPlayerTurn={isPlayerTurn}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    players: state.players,
    activeWar: state.activeWar,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    attack: (from: string, actionName: string, turn: number) =>
      dispatch<PlayerActionTypes>(playerAttack(from, actionName, turn)),
    // logActiveWar: (
    //   turn: number,
    //   playerArmorPoints: number,
    //   botArmorPoints: number,
    //   playerHealthPoints: number,
    //   botHealthPoints: number,
    // ) =>
    //   dispatch<WarActionTypes>(
    //     logActiveWarAction(
    //       turn,
    //       playerArmorPoints,
    //       playerHealthPoints,
    //       botArmorPoints,
    //       botHealthPoints,
    //     ),
    //   ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);
