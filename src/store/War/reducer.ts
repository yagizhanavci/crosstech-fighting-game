import { War } from "./types";
import {
  WarActionTypes,
  LOG_ACTIVE_WAR,
  CLEAR_ACTIVE_WAR_LOGS,
} from "./actions/types";
import v4 from "uuid/v4";

const initialWarState: War = {
  recentLogs: [],
};

export const warReducer = (
  state: War = initialWarState,
  action: WarActionTypes,
): War => {
  switch (action.type) {
    case LOG_ACTIVE_WAR:
      const {
        turn,
        player,
        actionName,
        abilityDamage,
        healthPoints,
      } = action.payload;
      if (healthPoints > 0)
        return {
          recentLogs: [
            ...state.recentLogs,
            {
              id: v4(),
              logText: `${player} has used ${actionName} attack and dealt ${abilityDamage} to his/her opponent at turn ${turn}`,
            },
          ],
        };
      else return state;
    case CLEAR_ACTIVE_WAR_LOGS:
      return {
        recentLogs: [],
      };
    default:
      return state;
  }
};
