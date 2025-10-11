import { ArrowLeftIcon, Loader2Icon, SaveAllIcon, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUnoCardEditorContext } from "./uno-card-context";
import { FileUploadCard } from "../ui/file-upload-card";
import { Label } from "../ui/label";
import { useState } from "react";
import { NumberArrowsInput } from "../ui/number-arrows-input";


export function UnoCardConfigurator() {
  const { selectedCard } = useUnoCardEditorContext();
  if (!selectedCard) return <UnoGlobalConfiguration />;
  return <UnoSingleCardConfiguration />;
}


export function UnoGlobalConfiguration() {
  const { size, setSize, exportAllCards } = useUnoCardEditorContext();
  const [loading, setLoading] = useState(false);
  const onExport = async () => {
    setLoading(true);
    await exportAllCards();
    setLoading(false);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Global Config</h1>
        <Button onClick={onExport} disabled={loading}>
          {loading ? <Loader2Icon className="animate-spin" /> : <SaveAllIcon />}
          Export All Cards
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div>
          <Label className="mb-2">Size</Label>
          <NumberArrowsInput value={size} onChange={(value) => setSize(value)} min={100} />
        </div>
      </div>
    </div>
  )
}

export function UnoSingleCardConfiguration() {
  const { selectedCard, setCardConfig, setSelectedCard, exportCard } = useUnoCardEditorContext();
  const [loading, setLoading] = useState(false);
  if (!selectedCard) return null;

  const onImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setCardConfig({ ...selectedCard, image: reader.result as string });
      }
      reader.readAsDataURL(file);
    } else {
      setCardConfig({ ...selectedCard, image: null });
    }
  }

  const onExport = async () => {
    setLoading(true);
    await exportCard(selectedCard.name);
    setLoading(false);
  }


  return (
    <div key={selectedCard.name}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="secondary" onClick={() => setSelectedCard(null)}>
          <ArrowLeftIcon />
        </Button>

        <span className="text-sm inline-block py-1 px-4 rounded-full bg-muted text-muted-foreground">#{selectedCard.name}</span>
        <Button onClick={onExport} disabled={loading}>
          {loading ? <Loader2Icon className="animate-spin" /> : <SaveIcon />}
          Export
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div key={selectedCard.image || "image"}>
          <Label className="mb-2">Card Image</Label>
          <FileUploadCard onChange={onImageChange} initalPreviewUrl={selectedCard.image || undefined} />
        </div>
      </div>
    </div>
  )
}