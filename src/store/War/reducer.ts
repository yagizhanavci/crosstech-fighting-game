import { War } from "./types";
import { WarActionTypes, LOG_ACTIVE_WAR } from "./actions/types";

const continuingWar: War = JSON.parse(
  localStorage.getItem("continuingWar") || "{}",
);

const initialWarState: War = continuingWar
  ? {
      ...continuingWar,
    }
  : {
      turn: 1,
      playerArmorPoints: 100,
      playerHealthPoints: 100,
      botArmorPoints: 100,
      botHealthPoints: 100,
    };

export const warReducer = (
  state: War = initialWarState,
  action: WarActionTypes,
): War => {
  switch (action.type) {
    case LOG_ACTIVE_WAR:
      localStorage.setItem("continuingWar", JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
