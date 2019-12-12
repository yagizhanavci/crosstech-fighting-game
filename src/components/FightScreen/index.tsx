import React, { useState, useEffect } from "react";
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
import { MatchHistoryActionTypes } from "../../store/MatchHistory/actions/types";
import { logMatchHistoryAction } from "../../store/MatchHistory/actions/logMatchHistory";
import { Match } from "../../store/MatchHistory/types";
import "./FightScreen.css";
import { restartMatchAction } from "../../store/Player/actions/restartMatch";
import { clearActiveWarLogsAction } from "../../store/War/actions/clearActiveWarLogs";

interface FightScreenProps extends RouteComponentProps {
  players: Player[];
  activeWarLogs: War;
  matchHistory: Match[];
  attack: (from: string, actionName: string, turn: number) => PlayerActionTypes;
  logActiveWar: (
    turn: number,
    player: string,
    actionName: string,
    abilityDamage: number,
  ) => WarActionTypes;
  logMatch: (
    winner: string,
    loser: string,
    matchDate: Date,
  ) => MatchHistoryActionTypes;
  restartMatch: () => PlayerActionTypes;
  clearActiveWarLogs: () => WarActionTypes;
}

const FightScreen: React.FC<FightScreenProps> = ({
  players,
  attack,
  logActiveWar,
  activeWarLogs,
  matchHistory,
  logMatch,
  restartMatch,
  clearActiveWarLogs,
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
    if (!winner || playerHealthPoints > 0) {
      attack("player", actionName, turn);
      logActiveWar(turn, player, actionName, abilityDamage);
      setIsPlayerTurn(false);
    }
  };

  const handleBotAttack = () => {
    // Check if there is a winner
    if (!winner || botHealthPoints > 0) {
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

  const handleRestartMatch = () => {
    setIsPlayerTurn(true);
    setTurn(1);
    setWinner("");
    clearActiveWarLogs();
    restartMatch();
  };

  // Check for a winner at each attack to health points
  useEffect(() => {
    decideWinner();
    // eslint-disable-next-line
  }, [botHealthPoints, playerHealthPoints]);

  useEffect(() => {
    if (!winner) {
      if (!isPlayerTurn) handleBotAttack();
    }
    // eslint-disable-next-line
  }, [isPlayerTurn]);

  useEffect(() => {
    if (winner !== "") {
      const loser = winner === "bot" ? playerName : botName;
      logMatch(winner, loser, new Date());
    }
    // eslint-disable-next-line
  }, [winner]);

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
            <h3 className="winner-header">{winner} has won</h3>
            <button
              className="winner-restart-button"
              onClick={handleRestartMatch}
            >
              Restart
            </button>
          </div>
        )}
        <div className="logs-field">
          <div className="active-logs">
            {activeWarLogs.recentLogs.map(log => (
              <Log key={log.id} logText={log.logText} />
            ))}
          </div>
          <div className="match-history-logs">
            {matchHistory.map(match => {
              return (
                <div key={match.id} className="match-log">
                  <p className="match-log-text">{match.matchInfo}</p>
                </div>
              );
            })}
          </div>
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
    matchHistory: state.matchHistory.matchHistory,
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
    clearActiveWarLogs: () =>
      dispatch<WarActionTypes>(clearActiveWarLogsAction()),
    logMatch: (winner: string, loser: string, matchDate: Date) =>
      dispatch<MatchHistoryActionTypes>(
        logMatchHistoryAction(winner, loser, matchDate),
      ),
    restartMatch: () => dispatch<PlayerActionTypes>(restartMatchAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);
