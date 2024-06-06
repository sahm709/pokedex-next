import PokemonGrid from "./components/pokemon-grid";

export default function Home() {
  return (
    <div className="pokedex-app p-4 rounded-2xl">
      <h1 className="heading text-center font-bold text-3xl my-4 mb-16 text-gray-600 relative text-[#444444]">
        Pokédex
      </h1>
      <PokemonGrid />
    </div>
  );
}
