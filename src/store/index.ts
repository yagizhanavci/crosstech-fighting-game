import { createStore, combineReducers } from "redux";
import { playerReducer } from "./Player/reducer";
import { warReducer } from "./War/reducer";
import { matchHistoryReducer } from "./MatchHistory/reducer";

const rootReducer = combineReducers({
  players: playerReducer,
  activeWar: warReducer,
  matchHistory: matchHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
