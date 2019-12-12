import { LOG_ACTIVE_WAR, WarActionTypes } from "./types";

export const logActiveWarAction = (
  turn: number,
  playerArmorPoints: number,
  botArmorPoints: number,
  playerHealthPoints: number,
  botHealthPoints: number,
): WarActionTypes => {
  return {
    type: LOG_ACTIVE_WAR,
    payload: {
      turn,
      playerHealthPoints,
      playerArmorPoints,
      botHealthPoints,
      botArmorPoints,
    },
  };
};
