import v4 from "uuid/v4";
import { Match, MatchHistory } from "./types";
import { MatchHistoryActionTypes, LOG_MATCH_HISTORY } from "./actions/types";
import moment from "moment";

// Check for match history in local storage
const persistedHistory: Match[] = JSON.parse(
  localStorage.getItem("matchHistory") || "[]",
);

const initialMatchHistory: MatchHistory = {
  matchHistory: persistedHistory,
};

export const matchHistooryReducer = (
  state = initialMatchHistory,
  action: MatchHistoryActionTypes,
) => {
  switch (action.type) {
    case LOG_MATCH_HISTORY:
      const newState = { ...state };
      const { winner, loser, matchDate } = action.payload;
      const newMatchLog = {
        id: v4(),
        matchInfo: `${winner} has won against ${loser} at ${moment(
          matchDate,
        ).format("LLL")}`,
      };
      newState.matchHistory.push(newMatchLog);
      localStorage.setItem(
        "matchHistory",
        JSON.stringify(newState.matchHistory),
      );
      return newState;
    default:
      return state;
  }
};
