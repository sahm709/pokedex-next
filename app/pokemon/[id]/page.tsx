"use client";
import PokemonCard from "@/app/components/pokemon-card";
import { usePokemons } from "@/app/context/PokemonContext";
import "./css/pokemon-detail.css";
import { getImageURL } from "@/app/lib/pokemonApi";
import { useEffect, useState } from "react";
import PokemonAbout from "@/app/components/details/pokemon-detail-about";
import PokemonStats from "@/app/components/details/pokemon-detail-stats";
import Evolution from "@/app/components/details/pokemon-detail-evolution";
import PokemonMoves from "@/app/components/details/pokemon-detail-moves";
import { useFetchPokemons } from "@/app/hooks/useFetchData";
import BackButton from "@/app/components/back-button";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import Image from "next/image";

const TAB_ABOUT = "about";
const TAB_STATS = "base-stats";
const TAB_EVOLUTION = "evolution";
const TAB_DEFAULT = TAB_ABOUT;
const TAB_MOVES = "moves";

const tabs = [
  {
    id: TAB_ABOUT,
    label: "About",
  },
  {
    id: TAB_STATS,
    label: "Base Stats",
  },
  {
    id: TAB_EVOLUTION,
    label: "Evolution",
  },
  {
    id: TAB_MOVES,
    label: "Moves",
  },
];

const PokemonDetailPage = ({ params }: { params: { id?: string } }) => {
  const { id } = params;
  const { pokemons } = usePokemons();
  const [currentTab, setCurrentTab] = useState(TAB_DEFAULT);

  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    if (pokemons.length === 0) {
      router.push("/"); // Redirect to the homepage if pokemons array is empty
    }
  }, [pokemons.length, router]);

  const pokemon = pokemons.find((p) => p.id === Number(id));
  if (!pokemon) return <Loader />;

  const imgURL = getImageURL(pokemon?.id);

  const typeClassNames = pokemon.types
    .map(({ type }) => "type-" + type.name)
    .join(" ");

  const getClassName = (tabName: string) => {
    return `tab-switch ${
      currentTab === tabName ? "active" : ""
    } ${typeClassNames}`;
  };

  return (
    <div className="flex justify-center items-start p-0 h-screen">
      <div className="pokemon-detail flex flex-col h-3/4 max-w-3xl w-full">
        <BackButton onClick={() => router.push("/")} />
        <div className="detail-card min-h-96 mt-0">
          <PokemonCard pokemon={pokemon} />
        </div>
        <div className="details">
          <Image
            alt={pokemon.name}
            src={imgURL}
            className="pokemon-image"
            width={100}
            height={100}
          />
          <div className="tabs-switch-container">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                className={getClassName(id)}
                onClick={() => setCurrentTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {(() => {
            switch (currentTab) {
              case TAB_ABOUT:
                return <PokemonAbout pokemon={pokemon} />;
              case TAB_STATS:
                return <PokemonStats pokemon={pokemon} />;
              case TAB_EVOLUTION:
                return <Evolution pokemon={pokemon} />;
              case TAB_MOVES:
                return <PokemonMoves pokemon={pokemon} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
