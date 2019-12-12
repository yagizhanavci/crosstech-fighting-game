import { War } from "../types";

export const LOG_ACTIVE_WAR = "LOG_ACTIVE_WAR";

interface ILogActiveWarAction {
  type: typeof LOG_ACTIVE_WAR;
  payload: War;
}

export type WarActionTypes = ILogActiveWarAction;
