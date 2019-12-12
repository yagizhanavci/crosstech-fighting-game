import { PlayerActionTypes } from "./types";

export const restartMatchAction = (): PlayerActionTypes => {
  return {
    type: "RESTART_MATCH",
  };
};
