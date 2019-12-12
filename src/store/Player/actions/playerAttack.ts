import { PlayerActionTypes, PLAYER_ATTACK } from "./types";

export const playerAttack = (
  from: string,
  actionName: string,
  turn: number,
): PlayerActionTypes => {
  return {
    type: PLAYER_ATTACK,
    payload: {
      from,
      actionName,
      turn,
    },
  };
};
