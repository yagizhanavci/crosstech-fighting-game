export interface Ability {
  id: string;
  abilityName: string;
  abilityDamage: number;
  playerId: string;
}

export interface Player {
  id: string;
  name: string;
  healthPoints: number;
  armorPoints: number;
  autoAttackDamage: number;
  isBot: boolean;
  abilities: Ability[];
}
