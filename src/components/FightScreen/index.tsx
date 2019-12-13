import React, { useState, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Player } from "../../store/Player/types";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "redux";
import { PlayerActionTypes } from "../../store/Player/actions/types";
import { playerAttack } from "../../store/Player/actions/playerAttack";
import PlayerField from "./PlayerField";
import { WarActionTypes } from "../../store/War/actions/types";
import { logActiveWarAction } from "../../store/War/actions/logActiveWarAction";
import { War } from "../../store/War/types";
import Log from "./Log";
import { MatchHistoryActionTypes } from "../../store/MatchHistory/actions/types";
import { logMatchHistoryAction } from "../../store/MatchHistory/actions/logMatchHistory";
import { Match } from "../../store/MatchHistory/types";
import { restartMatchAction } from "../../store/Player/actions/restartMatch";
import { clearActiveWarLogsAction } from "../../store/War/actions/clearActiveWarLogs";
import ryuNormal from "../../images/ryu-normal.png";
import kenNormal from "../../images/ken-normal.png";
import "./FightScreen.css";

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
            ? "hadouken"
            : "shoryuken";
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
      <main className="fight-screen container-fluid">
        <section className="players-field row mt-3 mb-3">
          {!winner && (
            <div className="player-turn-indicator-field">
              <span className="mb-2">
                <i
                  className={`fas ${
                    isPlayerTurn ? "fa-arrow-left" : "fa-arrow-right"
                  }`}
                ></i>
              </span>
              <p>
                {isPlayerTurn ? `${playerName}'s Turn` : `${botName}'s Turn`}
              </p>
            </div>
          )}
          {players.map(player => (
            <PlayerField
              key={player.id}
              player={player}
              handlePlayerAttack={handlePlayerAttack}
              isPlayerTurn={isPlayerTurn}
              botHealthPoints={botHealthPoints}
              playerImage={player.id === "player" ? ryuNormal : kenNormal}
            />
          ))}
        </section>
        {winner && (
          <section className="winner-field">
            <div className="winner-field-content">
              <h3 className="winner-header text-center">{winner} has won</h3>
              <button
                className={`winner-restart-button text-center btn btn-lg ${
                  winner === "A.I." ? "btn-warning" : "btn-success"
                }`}
                onClick={handleRestartMatch}
              >
                Restart
              </button>
            </div>
          </section>
        )}
        <section className="logs-field mt-5 container">
          <div className="row">
            <div className="active-logs col-md-8">
              <h3 className="active-logs-header text-center">Fight Logs</h3>
              {activeWarLogs.recentLogs.map(log => (
                <Log key={log.id} logText={log.logText} />
              ))}
            </div>
            <div className="match-history-logs col-md-4">
              <h3 className="match-history-logs-header text-center">
                Match History
              </h3>
              {matchHistory.map(match => (
                <Log key={match.id} logText={match.matchInfo} />
              ))}
            </div>
          </div>
        </section>
      </main>
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
