import { PlayerActionTypes, PLAYER_LOGIN } from "./types";

export const playerLogin = (username: string): PlayerActionTypes => {
  return {
    type: PLAYER_LOGIN,
    payload: {
      username,
    },
  };
};
