import { ArrowLeftIcon, Loader2Icon, SaveAllIcon, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUnoCardEditorContext } from "./uno-card-context";
import { FileUploadCard } from "../ui/file-upload-card";
import { Label } from "../ui/label";
import { useState } from "react";
import { NumberArrowsInput } from "../ui/number-arrows-input";
import { Input } from "../ui/input";


export function UnoCardConfigurator() {
  const { selectedCard } = useUnoCardEditorContext();
  if (!selectedCard) return <UnoGlobalConfiguration />;
  return <UnoSingleCardConfiguration />;
}


export function UnoGlobalConfiguration() {
  const { size, setSize, exportAllCards, colors } = useUnoCardEditorContext();
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

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label className="mb-2">Size</Label>
          <NumberArrowsInput value={size} onChange={(value) => setSize(value)} min={100} />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <Label className="text-base font-bold">Colors</Label>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Red</span>
            <Input type="color" value={colors.red} onChange={(e) => colors.setRed(e.target.value)} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Blue</span>
            <Input type="color" value={colors.blue} onChange={(e) => colors.setBlue(e.target.value)} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Green</span>
            <Input type="color" value={colors.green} onChange={(e) => colors.setGreen(e.target.value)} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Yellow</span>
            <Input type="color" value={colors.yellow} onChange={(e) => colors.setYellow(e.target.value)} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Black</span>
            <Input type="color" value={colors.black} onChange={(e) => colors.setBlack(e.target.value)} />
          </div>
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