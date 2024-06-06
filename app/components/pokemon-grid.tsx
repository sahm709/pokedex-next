"use client";
import React, { useEffect, useState } from "react";
import { getPokemon, getPokemonList } from "../lib/pokemonApi";
import { Pokemon, PokemonDetail } from "../models/models";
import PokemonCard from "./pokemon-card";
import { usePokemons } from "../context/PokemonContext";
import { useFetchPokemons } from "../hooks/useFetchData";
import { useRouter } from "next/navigation";
import Loader from "./loader";

function PokemonGrid() {
  const { pokemonList, isLoading } = useFetchPokemons();
  const { pokemons, setPokemons, currentPokemonId, setCurrentPokemonId } =
    usePokemons();
  const router = useRouter();

  useEffect(() => {
    setPokemons(pokemonList);
  }, [pokemonList, setPokemons]);

  useEffect(() => {
    if (currentPokemonId !== -1) {
      router.push(`/pokemon/${currentPokemonId}`);
    }
  }, [currentPokemonId, router]);

  if (isLoading) return <Loader />;
  if (!pokemons.length) return <p>No profile data</p>;

  return (
    <div className="grid items-center justify-center mx-4 md:mx-16 xl:mx-32 2xl:mx-64 grid-cols-1 sm:grid-cols-2  xl:grid-cols-3">
      {pokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.id}
          onClick={() => setCurrentPokemonId(pokemon.id)}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
