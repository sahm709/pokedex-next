import { EvolutionChainDetails } from "@/app/models/models";
import "../css/evolution-item.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EvolutionItemProps {
  evolution: EvolutionChainDetails;
}

function EvolutionItem({ evolution }: EvolutionItemProps) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    if (id !== undefined) {
      router.push(`/pokemon/${id}`);
    }
  };

  return (
    <div className="evolution-container">
      <div
        className="evolve-container evolve-from"
        onClick={() =>
          evolution.currentId && handleNavigate(evolution.currentId)
        }
      >
        <div className="image-container">
          <div className="bg-pokeball"></div>
          <Image
            alt={evolution.currentName ?? "Current Pokemon"}
            src={evolution.currentImage ?? "/placeholder.png"}
            width={100}
            height={100}
          />
        </div>

        <span>{evolution.currentName}</span>
      </div>

      <div className="trigger-container right">
        <div className="arrow arrow-right "></div>
        {evolution.trigger} {evolution.triggerValue}
      </div>

      <div
        className="evolve-container evolve-to"
        onClick={() => evolution.nextId && handleNavigate(evolution.nextId)}
      >
        <div className="image-container">
          <div className="bg-pokeball"></div>
          <Image
            alt={evolution.nextName ?? "Next Pokemon"}
            src={evolution.nextImage ?? "/placeholder.png"}
            width={100}
            height={100}
          />
        </div>

        <span>{evolution.nextName}</span>
      </div>
    </div>
  );
}

export default EvolutionItem;
