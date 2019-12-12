import { LOG_ACTIVE_WAR, WarActionTypes } from "./types";

export const logActiveWarAction = (
  turn: number,
  player: string,
  actionName: string,
  abilityDamage: number,
): WarActionTypes => {
  return {
    type: LOG_ACTIVE_WAR,
    payload: {
      turn,
      player,
      actionName,
      abilityDamage,
    },
  };
};
