import React from "react";
import { PokemonDetail } from "../models/models";
import "./css/pokemon-card.css";
import { getImageURL } from "../lib/pokemonApi";
import { useRouter } from "next/navigation";

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

  // const handleClick = () => {
  //   router.push(`/pokemon/${id}`);
  // };
  return (
    <div className="card-container p-4 h-full cursor-pointer" onClick={onClick}>
      <div className={`card ${className}`}>
        <span className="pokemon-id">{paddedId}</span>
        <div className="card-title text-center">
          <h2>{name.replace(/-/g, " ")}</h2>

          <div className="pokemon-types">
            {types.map(({ type }) => (
              // <span className="type" key={type.name}>
              //   {type.name}
              // </span>
              <img
                src={`/types/${type.name}.png`}
                alt={type}
                className="self-center justify-self-end mb-2"
              />
            ))}
          </div>
        </div>
        <div className="pokemon-image">
          <img alt={name} src={imgURL} />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
