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
  playerImage: string;
}

const PlayerField: React.FC<PlayerComponentProps> = ({
  player,
  handlePlayerAttack,
  isPlayerTurn,
  botHealthPoints,
  playerImage,
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
    <div className="player col-md-6">
      <h4 className="player-name">{name}</h4>
      <div className="player-armor-field">
        <span>
          <i
            className={`fas fa-shield-alt ${armorPoints === 0 && "broken"}`}
          ></i>
        </span>
        <div style={armorBarStyles} className="player-armor-bar">
          <span className="player-armor-points">{armorPoints}</span>
        </div>
      </div>
      <div className="player-health-field">
        <span>
          <i
            className={`fas fa-plus-square ${healthPoints === 0 && "broken"}`}
          ></i>
        </span>
        <div style={healthBarStyles} className="player-health-bar">
          <span className="player-health-points">{healthPoints}</span>
        </div>
      </div>
      <div className="player-image-field mt-1">
        <img
          src={playerImage}
          alt={playerImage}
          width={200}
          height={400}
          className="player-image"
        />
      </div>
      <div className="ability-field">
        <button
          onClick={() => {
            handlePlayerAttack(name, "auto", autoAttackDamage);
          }}
          className="ability btn btn-primary btn-lg mr-3"
          disabled={
            isBot || !isPlayerTurn || botHealthPoints === 0 ? true : false
          }
        >
          <span>
            <i className="fas fa-khanda"></i>
          </span>
          <span className="ability-description text-center">
            Auto attack deals {player.autoAttackDamage} damage
          </span>
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
              className={`ability mr-3 btn btn-lg ${
                ability.abilityName === "hadouken"
                  ? "btn-danger"
                  : "btn-success"
              }`}
              disabled={
                isBot || !isPlayerTurn || botHealthPoints === 0 ? true : false
              }
            >
              {ability.abilityName === "hadouken" ? (
                <span>
                  <i className="fas fa-fire"></i>
                </span>
              ) : (
                <span>
                  <i
                    style={{ fontSize: "1.5rem" }}
                    className="fas fa-mars-stroke-v"
                  ></i>
                </span>
              )}
              <span className="ability-description text-center">
                {ability.abilityName} attack deals {ability.abilityDamage}{" "}
                damage
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerField;
