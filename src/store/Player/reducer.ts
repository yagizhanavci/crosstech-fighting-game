import { Player, Ability } from "./types";
import {
  PlayerActionTypes,
  PLAYER_ATTACK,
  PLAYER_LOGIN,
  RESTART_MATCH,
} from "./actions/types";

const initialPlayerState: Player[] = [
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
        abilityName: "hadouken",
        abilityDamage: 20,
      },
      {
        id: "ability-2",
        playerId: "player",
        abilityName: "shoryuken",
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
        abilityName: "hadouken",
        abilityDamage: 15,
      },
      {
        id: "ability-2",
        playerId: "bot",
        abilityName: "shoryuken",
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
        const newState = [...state];
        // Check if the players are alive
        if (newState[0].healthPoints > 0 && newState[1].healthPoints > 0)
          if (action.payload.actionName === "auto") {
            // Check for auto attack
            // Check if the armor of the player is depleted
            if (newState[1].armorPoints === 0) {
              newState[1].healthPoints -= newState[0].autoAttackDamage;
              // Check if the bot dead
              if (newState[1].healthPoints < 0) newState[1].healthPoints = 0;
            }
            // Check if the armor can not endure
            else if (newState[1].armorPoints < newState[0].autoAttackDamage) {
              newState[1].armorPoints -= newState[0].autoAttackDamage;
              newState[1].healthPoints -= Math.abs(newState[1].armorPoints);
              newState[1].armorPoints = 0;
            } else {
              // The player has armor
              newState[1].armorPoints -= newState[0].autoAttackDamage;
            }
          } else {
            // Check for ability damage
            const usedAbility = state[0].abilities.find(
              (ability: Ability) =>
                ability.abilityName === action.payload.actionName,
            );
            if (usedAbility) {
              // Check if the armor of the player is depleted
              if (newState[1].armorPoints === 0) {
                newState[1].healthPoints -= usedAbility.abilityDamage;
                // Check if the bot dead
                if (newState[1].healthPoints < 0) newState[1].healthPoints = 0;
              }
              // Check if the armor can not endure
              else if (newState[1].armorPoints < usedAbility.abilityDamage) {
                newState[1].armorPoints -= usedAbility.abilityDamage;
                newState[1].healthPoints -= Math.abs(newState[1].armorPoints);
                newState[1].armorPoints = 0;
              } else {
                // The player has armor
                newState[1].armorPoints -= usedAbility.abilityDamage;
              }
            }
          }
        return newState;
      } else {
        const newState = [...state];
        // If the player is bot
        // Check if the players are alive
        if (newState[1].healthPoints > 0 && newState[0].healthPoints > 0) {
          // Check for auto attack
          if (action.payload.actionName === "auto") {
            // Check if the armor of the player is depleted
            if (newState[0].armorPoints === 0) {
              newState[0].healthPoints -= newState[1].autoAttackDamage;
              // Check if the player is dead
              if (newState[0].healthPoints < 0) newState[0].healthPoints = 0;
            }
            // Check if the armor can not endure
            else if (newState[0].armorPoints < newState[1].autoAttackDamage) {
              newState[0].armorPoints -= newState[1].autoAttackDamage;
              newState[0].healthPoints -= Math.abs(newState[0].armorPoints);
              newState[0].armorPoints = 0;
            } else {
              // The player has armor
              newState[0].armorPoints -= newState[1].autoAttackDamage;
            }
          } else {
            // Check for ability damage
            const usedAbility = newState[1].abilities.find(
              (ability: Ability) =>
                ability.abilityName === action.payload.actionName,
            );
            if (usedAbility) {
              // Check if the armor of the player is depleted
              if (newState[0].armorPoints === 0) {
                newState[0].healthPoints -= usedAbility.abilityDamage;
                // Check if the player is
                if (newState[0].healthPoints < 0) newState[0].healthPoints = 0;
              }
              // Check if the armor can not endure
              else if (newState[0].armorPoints < usedAbility.abilityDamage) {
                newState[0].armorPoints -= usedAbility.abilityDamage;
                newState[0].healthPoints -= Math.abs(newState[0].armorPoints);
                newState[0].armorPoints = 0;
              } else {
                // The player has armor
                newState[0].armorPoints -= usedAbility.abilityDamage;
              }
            }
          }
        }
        return newState;
      }
    case PLAYER_LOGIN:
      const newState = [...state];
      newState[0].name = action.payload.username;
      return newState;
    case RESTART_MATCH:
      const newRematchState = [...state];
      newRematchState[0].armorPoints = 100;
      newRematchState[1].armorPoints = 100;
      newRematchState[0].healthPoints = 100;
      newRematchState[1].healthPoints = 100;
      return newRematchState;
    default:
      return state;
  }
};
