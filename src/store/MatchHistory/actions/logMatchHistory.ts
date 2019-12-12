import { MatchHistoryActionTypes } from "./types";

export const logMatchHistoryAction = (
  winner: string,
  loser: string,
  matchDate: Date,
): MatchHistoryActionTypes => {
  return {
    type: "LOG_MATCH_HISTORY",
    payload: {
      winner,
      loser,
      matchDate,
    },
  };
};
