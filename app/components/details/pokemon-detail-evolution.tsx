import useEvolutionChain from "@/app/hooks/useEvolutionChain";
import useNormalizeEvolutionChain from "@/app/hooks/useNormalizeEvolutionChain";
import { PokemonDetail } from "@/app/models/models";
import React, { useState } from "react";
import EvolutionItem from "./pokemon-evoloution-item";
import Loader from "../loader";
interface PokemonCardProps {
  pokemon: PokemonDetail;
}
const Evolution = ({ pokemon }: PokemonCardProps) => {
  const { isLoading, evolutionChain } = useEvolutionChain(pokemon.id);

  return (
    <div className="tab tab-evolution">
      {isLoading && <Loader />}

      {!isLoading && !evolutionChain.length && (
        <div>This pokemon doesn&apos;t evolove</div>
      )}

      {!isLoading &&
        evolutionChain.map((evolution) => (
          <EvolutionItem
            key={`${evolution.currentId}-${evolution.nextId}`}
            evolution={evolution}
          />
        ))}
    </div>
  );
};

export default Evolution;
