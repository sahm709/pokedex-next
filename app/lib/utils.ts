import {
  ChainLink,
  EvolutionChain,
  EvolutionChainDetails,
} from "../models/models";
import { getImageURL } from "./pokemonApi";

interface TriggersDisplayName {
  [key: string]: string;
}

export const normalizeEvolutionChain = (evolution: ChainLink) => {
  if (!evolution.evolves_to.length) {
    return [];
  }

  const triggersDisplayName: TriggersDisplayName = {
    "level-up": "Level",
    trade: "Trade",
    "use-item": "Use Item",
  };

  // Extract pokemon ID from 'species' URL (https://pokeapi.co/api/v2/pokemon-species/{id}/).
  const extractId = (url: string): number => {
    const match = url.match(/\/(\d+)\//);
    return match ? parseInt(match[1]) : 0; // Assuming 0 as a default value if there's no match
  };

  return evolution.evolves_to.reduce<Array<EvolutionChainDetails>>(
    (carry, nextEvolution) => {
      const details = nextEvolution.evolution_details[0],
        currentId = extractId(evolution.species.url),
        nextId = extractId(nextEvolution.species.url);

      carry.push({
        currentId: currentId ?? "", // Use an empty string as the default value if currentId is null or undefined
        nextId: nextId ?? "", // Use an empty string as the default value if nextId is null or undefined
        currentName: evolution.species.name,
        nextName: nextEvolution.species.name,
        currentImage: getImageURL(currentId ?? ""), // Use an empty string as the default value if currentId is null or undefined
        nextImage: getImageURL(nextId ?? ""), // Use an empty string as the default value if nextId is null or undefined
        trigger: triggersDisplayName[details.trigger.name],
        triggerValue:
          details.min_level?.toString() ||
          details.min_happiness?.toString() ||
          details.item?.name.replace("-", " ") ||
          "",
      });

      carry.push(...normalizeEvolutionChain(nextEvolution));

      return carry;
    },
    []
  );
};
