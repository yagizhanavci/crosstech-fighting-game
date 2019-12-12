export const LOG_MATCH_HISTORY = "LOG_MATCH_HISTORY";

interface ILogMatchHistory {
  type: typeof LOG_MATCH_HISTORY;
  payload: {
    winner: string;
    loser: string;
    matchDate: Date;
  };
}

export type MatchHistoryActionTypes = ILogMatchHistory;
