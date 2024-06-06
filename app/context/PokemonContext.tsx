"use client";
import React, { ReactNode } from "react";
import { createContext, useEffect, useState, useContext } from "react";
import { PokemonDetail } from "../models/models";

interface PokemonContextType {
  pokemons: PokemonDetail[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
  currentPokemonId: number;
  setCurrentPokemonId: React.Dispatch<React.SetStateAction<number>>;
  currentPokemon?: PokemonDetail;
}

type Props = {
  children: ReactNode;
};
export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: Props) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [currentPokemonId, setCurrentPokemonId] = useState(-1);

  const currentPokemon = pokemons[currentPokemonId];

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        currentPokemonId,
        setCurrentPokemonId,
        currentPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;

export const usePokemons = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemons must be used within a PokemonProvider");
  }
  return context;
};
