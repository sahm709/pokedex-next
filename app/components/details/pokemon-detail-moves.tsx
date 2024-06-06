import { useEffect, useState } from "react";
import { PokemonDetail } from "../../models/models";
import Loader from "../loader";

interface PokemonMovesProps {
  pokemon: PokemonDetail;
}

const PokemonMoves = ({ pokemon }: PokemonMovesProps) => {
  const [moveDetails, setMoveDetails] = useState<
    { name: string; type: string; level: number }[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMoveDetails = async () => {
      setIsLoading(true);
      const allMoves = pokemon.moves;
      const movePromises = allMoves.map(({ move, version_group_details }) => {
        const level =
          version_group_details.find(
            (detail) => detail.version_group.name === "red-blue"
          )?.level_learned_at || 0; // Change "red-blue" to the appropriate version group
        return fetch(move.url).then((response) =>
          response.json().then((data) => ({ ...data, level }))
        );
      });

      const moveData = await Promise.all(movePromises);
      const moveDetails = moveData.map((move) => ({
        name: formatMoveName(move.name),
        type: move.type.name,
        level: move.level,
      }));
      setMoveDetails(moveDetails);
    };

    fetchMoveDetails();
  }, [pokemon.moves]);

  const formatMoveName = (name: string): string => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div className="tab tab-moves">
      <div className="grid grid-cols-1 gap-y-2">
        {moveDetails.map(({ name, type, level }) => {
          const className = "type-" + type;
          const typeIconUrl = `/types/${type}.png`; // Assuming the icons are stored in public/types directory
          return (
            <div key={name} className={`p-2 ${className} grid grid-cols-move`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{name}</p>
                  <p>Level {level}</p>
                </div>
                <img
                  src={typeIconUrl}
                  alt={type}
                  className="self-center justify-self-end"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonMoves;
