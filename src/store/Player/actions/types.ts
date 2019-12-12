export const PLAYER_ATTACK = "PLAYER_ATTACK";
export const PLAYER_LOGIN = "PLAYER_LOGIN";
export const RESTART_MATCH = "RESTART_MATCH";

interface IAttackAction {
  type: typeof PLAYER_ATTACK;
  payload: {
    from: string;
    actionName: string;
    turn: number;
  };
}

interface IPlayerLogınAction {
  type: typeof PLAYER_LOGIN;
  payload: {
    username: string;
  };
}

interface IRestartMatchAction {
  type: typeof RESTART_MATCH;
}

export type PlayerActionTypes =
  | IAttackAction
  | IPlayerLogınAction
  | IRestartMatchAction; // More may come
