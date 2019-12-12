export const LOG_ACTIVE_WAR = "LOG_ACTIVE_WAR";

interface ILogActiveWarAction {
  type: typeof LOG_ACTIVE_WAR;
  payload: {
    turn: number;
    player: string;
    actionName: string;
    abilityDamage: number;
  };
}

export type WarActionTypes = ILogActiveWarAction;
