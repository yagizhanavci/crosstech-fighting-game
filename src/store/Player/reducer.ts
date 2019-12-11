import { Player, Ability } from "./types";
import { PlayerActionTypes, PLAYER_ATTACK } from "./actions/types";

const initialPlayerState = [
  {
    id: "player",
    name: "",
    healthPoints: 100,
    armorPoints: 100,
    autoAttackDamage: 10,
    isBot: false,
    abilities: [
      {
        id: "ability-1",
        playerId: "player",
        abilityName: "abilityName-1",
        abilityDamage: 20,
      },
      {
        id: "ability-2",
        playerId: "player",
        abilityName: "abilityName-2",
        abilityDamage: 15,
      },
    ],
  },
  {
    id: "bot",
    name: "A.I.",
    healthPoints: 100,
    armorPoints: 100,
    autoAttackDamage: 8,
    isBot: true,
    abilities: [
      {
        id: "ability-1",
        playerId: "bot",
        abilityName: "abilityName-1",
        abilityDamage: 15,
      },
      {
        id: "ability-2",
        playerId: "bot",
        abilityName: "abilityName-2",
        abilityDamage: 18,
      },
    ],
  },
];

export const playerReducer = (
  state: Player[] = initialPlayerState,
  action: PlayerActionTypes,
): Player[] => {
  switch (action.type) {
    case PLAYER_ATTACK:
      // If the player is human
      if (action.payload.from === "player") {
        // Check for auto attack
        if (action.payload.actionName === "auto")
          state[1].armorPoints -= state[0].autoAttackDamage;
        else {
          // Check for ability damage
          const usedAbility = state[0].abilities.find(
            (ability: Ability) =>
              ability.abilityName === action.payload.actionName,
          );
          if (usedAbility) state[1].armorPoints -= usedAbility.abilityDamage;
        }
        // Check if the armor of the player is depleted
        if (state[1].armorPoints < 0) {
          state[1].healthPoints -= Math.abs(state[1].armorPoints);
          if (state[1].healthPoints < 0) state[1].healthPoints = 0;
        }
        return state;
      } else {
        // If the player is bot
        if (action.payload.actionName === "auto")
          state[0].armorPoints -= state[1].autoAttackDamage;
        else {
          // Check for ability damage
          const usedAbility = state[1].abilities.find(
            (ability: Ability) =>
              ability.abilityName === action.payload.actionName,
          );
          if (usedAbility) state[0].armorPoints -= usedAbility.abilityDamage;
        }
        // Check if the armor of the player is depleted
        if (state[0].armorPoints < 0) {
          state[0].healthPoints -= Math.abs(state[1].armorPoints);
          if (state[0].healthPoints < 0) state[0].healthPoints = 0;
        }
        return state;
      }
    default:
      return state;
  }
};
