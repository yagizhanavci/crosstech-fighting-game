import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Player } from "../../store/Player/types";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "redux";
import { PlayerActionTypes } from "../../store/Player/actions/types";
import { playerAttack } from "../../store/Player/actions/playerAttack";
import PlayerField from "./Player";
import { WarActionTypes } from "../../store/War/actions/types";
import { logActiveWarAction } from "../../store/War/actions/logActiveWarAction";
import { War } from "../../store/War/types";
import Log from "./Log";
import "./FightScreen.css";

interface FightScreenProps extends RouteComponentProps {
  players: Player[];
  activeWarLogs: War;
  attack: (from: string, actionName: string, turn: number) => PlayerActionTypes;
  logActiveWar: (
    turn: number,
    player: string,
    actionName: string,
    abilityDamage: number,
  ) => WarActionTypes;
}

const FightScreen: React.FC<FightScreenProps> = ({
  players,
  attack,
  logActiveWar,
  activeWarLogs,
}) => {
  const [turn, setTurn] = useState<number>(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");

  const {
    name: botName,
    autoAttackDamage: botAutoAttackDamage,
    abilities: botAbilities,
    healthPoints: botHealthPoints,
  } = players[1]; // Destructure the bot's properties

  const { name: playerName, healthPoints: playerHealthPoints } = players[0]; // Destructure the player's properties

  // If the player attacks , let the bot attack with random action(auto or ability attack) as well
  // and increment the turn after sometime
  const handlePlayerAttack = (
    player: string,
    actionName: string,
    abilityDamage: number,
  ) => {
    attack("player", actionName, turn);
    logActiveWar(turn, player, actionName, abilityDamage);
    setIsPlayerTurn(false);
    handleBotAttack();
  };

  const handleBotAttack = () => {
    // Check if there is a winner
    if (!winner) {
      setTimeout(() => {
        const botRandomAction = Math.floor(Math.random() * 3) + 1;
        const botActionName =
          botRandomAction === 1
            ? "auto"
            : botRandomAction === 2
            ? "abilityName-1"
            : "abilityName-2";
        attack("bot", botActionName, turn);
        logActiveWar(
          turn,
          botName,
          botActionName,
          botRandomAction === 1
            ? botAutoAttackDamage
            : botAbilities[botRandomAction - 2].abilityDamage,
        );
        setTurn(prevTurn => prevTurn + 1);
        setIsPlayerTurn(true);
      }, 2000);
    }
  };

  const decideWinner = () => {
    if (playerHealthPoints > 0 && botHealthPoints === 0) setWinner(playerName);
    else if (botHealthPoints > 0 && playerHealthPoints === 0)
      setWinner(botName);
  };

  useEffect(() => {
    decideWinner();
  }, [botHealthPoints, playerHealthPoints]);

  if (playerName) {
    return (
      <div className="fight-screen">
        <div className="players-field">
          {players.map(player => (
            <PlayerField
              key={player.id}
              player={player}
              handlePlayerAttack={handlePlayerAttack}
              isPlayerTurn={isPlayerTurn}
              botHealthPoints={botHealthPoints}
            />
          ))}
        </div>
        {winner && (
          <div className="winner-field">
            <h3>{winner} has won</h3>
          </div>
        )}
        <div className="logs-field">
          {activeWarLogs.recentLogs.map(log => (
            <Log key={log.id} logText={log.logText} />
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
    activeWarLogs: state.activeWar,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    attack: (from: string, actionName: string, turn: number) =>
      dispatch<PlayerActionTypes>(playerAttack(from, actionName, turn)),
    logActiveWar: (
      turn: number,
      player: string,
      actionName: string,
      abilityDamage: number,
    ) =>
      dispatch<WarActionTypes>(
        logActiveWarAction(turn, player, actionName, abilityDamage),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);
