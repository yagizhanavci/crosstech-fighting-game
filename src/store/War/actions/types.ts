export const LOG_ACTIVE_WAR = "LOG_ACTIVE_WAR";
export const CLEAR_ACTIVE_WAR_LOGS = "CLEAR_ACTIVE_WAR_LOGS";

interface ILogActiveWarAction {
  type: typeof LOG_ACTIVE_WAR;
  payload: {
    turn: number;
    player: string;
    actionName: string;
    abilityDamage: number;
    healthPoints: number;
  };
}

interface IClearActiveWarLogsAction {
  type: typeof CLEAR_ACTIVE_WAR_LOGS;
}

export type WarActionTypes = ILogActiveWarAction | IClearActiveWarLogsAction;
