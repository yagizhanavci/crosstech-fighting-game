export const PLAYER_ATTACK = "PLAYER_ATTACK";
export const PLAYER_LOGIN = "PLAYER_LOGIN";

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

export type PlayerActionTypes = IAttackAction | IPlayerLogınAction; // More may come
