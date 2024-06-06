import { PokemonDetail } from "@/app/models/models";
import RangeView from "../range-view";
import { useState, useEffect } from "react";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}
interface TypeRelations {
  double_damage_from: Array<{ name: string; url: string }>;
  double_damage_to: Array<{ name: string; url: string }>;
  half_damage_from: Array<{ name: string; url: string }>;
  half_damage_to: Array<{ name: string; url: string }>;
  no_damage_from: Array<{ name: string; url: string }>;
  no_damage_to: Array<{ name: string; url: string }>;
}

const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
const PokemonStats = ({ pokemon }: PokemonCardProps) => {
  const total = pokemon.stats.reduce(
    (sum, current) => sum + current.base_stat,
    0
  );

  return (
    <div className="tab tab-base-stats">
      <table>
        <tbody>
          {labels.map((label, i) => (
            <tr key={label}>
              <td>{label}</td>
              <td>
                {pokemon.stats[i].base_stat}
                <RangeView value={pokemon.stats[i].base_stat} />
              </td>
            </tr>
          ))}

          <tr>
            <td>Total</td>
            <td>
              {total}
              <RangeView value={total} max={600} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonStats;
