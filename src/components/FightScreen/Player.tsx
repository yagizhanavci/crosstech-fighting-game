import React from "react";
import { Player } from "../../store/Player/types";
import { PlayerActionTypes } from "../../store/Player/actions/types";
import { WarActionTypes } from "../../store/War/actions/types";

interface PlayerComponentProps {
  player: Player;
  isPlayerTurn: boolean;
  handlePlayerAttack: (player: string, actionName: string) => void;
}

const PlayerField: React.FC<PlayerComponentProps> = ({
  player,
  handlePlayerAttack,
  isPlayerTurn,
}) => {
  return (
    <div className="player">
      <h4 className="player-name">{player.name}</h4>
      <div className="player-armor-field">
        <div className="player-armor-bar">
          <span className="player-armor-points">{player.armorPoints}</span>
        </div>
      </div>
      <div className="player-health-field">
        <div className="player-health-bar">
          <span className="player-health-points">{player.healthPoints}</span>
        </div>
      </div>
      {/* Insert Player Image Here */}
      <div className="ability-field">
        <button
          onClick={() => {
            handlePlayerAttack(player.id, "auto");
          }}
          className="ability"
          disabled={player.id === "bot" || !isPlayerTurn ? true : false}
        >
          auto attack
        </button>
        {player.abilities.map(ability => {
          return (
            <button
              onClick={() => {
                handlePlayerAttack(player.id, ability.abilityName);
              }}
              key={ability.id}
              className="ability"
              disabled={player.id === "bot" || !isPlayerTurn ? true : false}
            >
              {/* Insert Ability Image Here */}
              {ability.abilityName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerField;
