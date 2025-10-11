import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUnoCardEditorContext } from "./uno-card-context";


export function UnoCardConfigurator() {
  const { selectedCard } = useUnoCardEditorContext();
  if (!selectedCard) return <UnoGlobalConfiguration />;
  return <UnoSingleCardConfiguration />;
}


export function UnoGlobalConfiguration() {
  return (
    <div>
      <h1>Global Configuration</h1>
    </div>
  )
}

export function UnoSingleCardConfiguration() {
  const { selectedCard, setCardConfig, setSelectedCard } = useUnoCardEditorContext();
  if (!selectedCard) return null;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setCardConfig({ ...selectedCard, image: reader.result as string });
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div key={selectedCard.name}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="secondary" onClick={() => setSelectedCard(null)}>
          <ArrowLeftIcon />
        </Button>

        <span className="text-sm inline-block py-1 px-4 rounded-full bg-muted text-muted-foreground">#{selectedCard.name}</span>
        <Button>
          <SaveIcon />
          Export
        </Button>
      </div>
      <div>
        <input type="file" onChange={onImageChange} accept="image/*" />
      </div>
    </div>
  )
}