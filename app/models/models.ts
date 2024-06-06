export interface Pokemon {
  name: string;
  url: string;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  moves: Move[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

interface EvolutionDetail {
  trigger: {
    name: string;
    url: string;
  };
  min_level: number;
  min_happiness: number;
  item: {
    name: string;
  };
}
export interface EvolutionChainDetails {
  currentId?: number;
  nextId?: number;
  currentName?: string;
  nextName?: string;
  currentImage?: string;
  nextImage?: string;
  trigger?: string;
  triggerValue?: string;
}
