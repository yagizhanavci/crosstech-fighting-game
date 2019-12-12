import { WarActionTypes } from "./types";

export const clearActiveWarLogsAction = (): WarActionTypes => {
  return {
    type: "CLEAR_ACTIVE_WAR_LOGS",
  };
};
