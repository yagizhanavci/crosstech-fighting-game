import React from "react";
import { Player } from "../../store/Player/types";

interface PlayerComponentProps {
  player: Player;
  botHealthPoints: number;
  isPlayerTurn: boolean;
  handlePlayerAttack: (
    player: string,
    actionName: string,
    abilityDamage: number,
  ) => void;
}

const PlayerField: React.FC<PlayerComponentProps> = ({
  player,
  handlePlayerAttack,
  isPlayerTurn,
  botHealthPoints,
}) => {
  const {
    name,
    isBot,
    healthPoints,
    armorPoints,
    autoAttackDamage,
    abilities,
  } = player;

  const armorBarStyles = { width: `${armorPoints}%` };
  const healthBarStyles = { width: `${healthPoints}%` };

  return (
    <div className="player">
      <h4 className="player-name">{name}</h4>
      <div className="player-armor-field">
        <div style={armorBarStyles} className="player-armor-bar">
          <span className="player-armor-points">{armorPoints}</span>
        </div>
      </div>
      <div className="player-health-field">
        <div style={healthBarStyles} className="player-health-bar">
          <span className="player-health-points">{healthPoints}</span>
        </div>
      </div>
      {/* Insert Player Image Here */}
      <div className="ability-field">
        <button
          onClick={() => {
            handlePlayerAttack(name, "auto", autoAttackDamage);
          }}
          className="ability"
          disabled={
            isBot || !isPlayerTurn || botHealthPoints === 0 ? true : false
          }
        >
          auto attack
        </button>
        {abilities.map(ability => {
          return (
            <button
              onClick={() => {
                handlePlayerAttack(
                  name,
                  ability.abilityName,
                  ability.abilityDamage,
                );
              }}
              key={ability.id}
              className="ability"
              disabled={
                isBot || !isPlayerTurn || botHealthPoints === 0 ? true : false
              }
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
