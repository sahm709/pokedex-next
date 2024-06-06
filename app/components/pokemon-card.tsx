import React from "react";
import { PokemonDetail } from "../models/models";
import "./css/pokemon-card.css";
import { getImageURL } from "../lib/pokemonApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: PokemonDetail;
  onClick?: () => void;
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const router = useRouter();
  const { name, id, types } = pokemon;

  const imgURL = getImageURL(id),
    className = types.map(({ type }) => "type-" + type.name).join(" "),
    paddedId = "#" + id.toString().padStart(3, "000");

  return (
    <div className="card-container p-4 h-full cursor-pointer" onClick={onClick}>
      <div className={`card ${className}`}>
        <span className="pokemon-id">{paddedId}</span>
        <div className="card-title text-center">
          <h2>{name.replace(/-/g, " ")}</h2>

          <div className="pokemon-types">
            {types.map(({ type }) => (
              <Image
                alt={type.name}
                key={type.name}
                src={`/types/${type.name}.png`}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
        <div className="pokemon-image">
          <Image alt={name} key={name} src={imgURL} width={100} height={100} />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
