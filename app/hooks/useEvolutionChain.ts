import { useEffect, useState } from "react";
import useNormalizeEvolutionChain from "./useNormalizeEvolutionChain";
import { fetchPokemonEvolutionChain } from "../lib/pokemonApi";
import { EvolutionChain, EvolutionChainDetails } from "../models/models";
interface EvolutionHookResult {
  currentEvolution?: EvolutionChain; // You might want to replace any[] with a more specific type
  evolutionChain: EvolutionChainDetails[];
  isLoading: boolean;
}
const useEvolutionChain = (pokemonId: number): EvolutionHookResult => {
  const [currentEvolution, setCurrentEvolution] = useState<
    EvolutionChain | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const { evolutionChain } = useNormalizeEvolutionChain({
    chain: currentEvolution?.chain,
    id: pokemonId,
  });

  useEffect(() => {
    if (pokemonId) {
      setIsLoading(true);

      fetchPokemonEvolutionChain(pokemonId).then((evolution) => {
        setCurrentEvolution(evolution);
        setIsLoading(false);
      });
    }
  }, [pokemonId]);

  return {
    currentEvolution,
    evolutionChain,
    isLoading,
  };
};

export default useEvolutionChain;
