import { useMemo } from "react";
import {
  ChainLink,
  EvolutionChain,
  EvolutionChainDetails,
} from "../models/models";
import { normalizeEvolutionChain } from "../lib/utils";

interface NormalizeEvolutionChainArgs {
  chain?: ChainLink; // Replace any[] with the correct type if possible
  id: number;
}

interface NormalizeEvolutionChainResult {
  evolutionChain: EvolutionChainDetails[];
}

// Hook to normalize an evolution chain into an array.
const useNormalizeEvolutionChain = ({
  chain,
}: NormalizeEvolutionChainArgs): NormalizeEvolutionChainResult => {
  return useMemo(() => {
    return { evolutionChain: chain ? normalizeEvolutionChain(chain) : [] };
  }, [chain]);
};

export default useNormalizeEvolutionChain;
