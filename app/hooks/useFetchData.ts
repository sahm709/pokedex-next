import { useState, useEffect } from "react";
import { PokemonDetail } from "../models/models";
import { getPokemon, getPokemonList } from "../lib/pokemonApi";

export const useFetchPokemons = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonList = await getPokemonList();
        const detailedDataPromises = pokemonList.map((pokemon) =>
          getPokemon(pokemon.name)
        );
        const detailedData = await Promise.all(detailedDataPromises);
        setPokemonList(detailedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pokemonList, isLoading };
};
