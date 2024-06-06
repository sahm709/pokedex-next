import { useEffect, useState } from "react";
import { PokemonDetail } from "../../models/models";
import Loader from "../loader";
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

const PokemonAbout = ({ pokemon }: PokemonCardProps) => {
  const types = pokemon.types.map(({ type }) => type.name).join(", ");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const abilities = pokemon.abilities
    .map(({ ability }) => {
      return ability.name.replace("-", " ");
    })
    .join(", ");

  const height = pokemon.height * 10; // cm
  const weight = pokemon.weight / 10; // kg

  const [weaknesses, setWeaknesses] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchWeaknesses = async () => {
      setIsLoading(true);
      const typePromises = pokemon.types.map(({ type }) =>
        fetch(`https://pokeapi.co/api/v2/type/${type.name}`).then((res) =>
          res.json()
        )
      );

      const typeDetails: { damage_relations: TypeRelations }[] =
        await Promise.all(typePromises);

      let weaknesses: { [key: string]: number } = {};

      typeDetails.forEach((typeDetail) => {
        const { double_damage_from, half_damage_from, no_damage_from } =
          typeDetail.damage_relations;

        double_damage_from.forEach(({ name }) => {
          weaknesses[name] = weaknesses[name] ? weaknesses[name] * 2 : 2;
        });

        half_damage_from.forEach(({ name }) => {
          weaknesses[name] = weaknesses[name] ? weaknesses[name] * 0.5 : 0.5;
        });

        no_damage_from.forEach(({ name }) => {
          weaknesses[name] = 0;
        });
      });

      setWeaknesses(weaknesses);
      setIsLoading(false);
    };

    fetchWeaknesses();
  }, [pokemon.types]);

  const weaknessDisplay = Object.entries(weaknesses).map(([key, value]) => (
    <div key={key} className="flex items-center">
      <img
        src={`/types/${key}.png`}
        alt={key}
        className="self-center justify-self-end mr-2"
      />
      <span>{value}x</span>
    </div>
  ));

  const typeClassNames = pokemon.types
    .map(({ type }) => "type-" + type.name)
    .join(" ");

  return (
    <div className="tab tab-about">
      {isLoading && <Loader />}
      <table>
        <tbody>
          <tr>
            <td>Species</td>
            <td>{types}</td>
          </tr>

          <tr>
            <td>Height</td>
            <td>{height}cm</td>
          </tr>

          <tr>
            <td>Weight</td>
            <td>{weight}kg</td>
          </tr>

          <tr>
            <td>Abilities</td>
            <td>{abilities}</td>
          </tr>
          {/* <tr>
            <td>Weaknesses</td>
            <td>
              <ul>{weaknessDisplay}</ul>
            </td>
          </tr> */}
        </tbody>
      </table>
      <h2
        className={`mt-4 text-base font-bold text-center colored-text ${typeClassNames}`}
      >
        Weakness
      </h2>
      <div className="grid grid-cols-2 gap-4 place-items-center	">
        {weaknessDisplay}
      </div>
    </div>
  );
};

export default PokemonAbout;
