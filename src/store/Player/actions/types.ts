export const PLAYER_ATTACK = "PLAYER_ATTACK";

interface AttackAction {
  type: typeof PLAYER_ATTACK;
  payload: {
    from: string;
    actionName: string;
    turn: number;
  };
}

export type PlayerActionTypes = AttackAction; // More may come
