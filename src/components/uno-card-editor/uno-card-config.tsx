import { ArrowLeftIcon, Loader2Icon, SaveAllIcon, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUnoCardEditorContext } from "./uno-card-context";
import { FileUploadCard } from "../ui/file-upload-card";
import { Label } from "../ui/label";
import { useState } from "react";
import { NumberArrowsInput } from "../ui/number-arrows-input";
import { Input } from "../ui/input";
import { exportCardPng, exportPdfPages } from "@/lib/exports";


export function UnoCardConfigurator() {
  const { selectedCard } = useUnoCardEditorContext();
  if (!selectedCard) return <UnoGlobalConfiguration />;
  return <UnoSingleCardConfiguration />;
}


export function UnoGlobalConfiguration() {
  const { colors, setColor, page, card } = useUnoCardEditorContext();


  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const handleExportPdfClick = async () => {
    try {
      setIsExportingPdf(true);
      await exportPdfPages({
        cls: "uno-card-pdf-page",
        name: "uno-cards.pdf",
        page: {
          width: page.width,
          height: page.height,
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsExportingPdf(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Global Config</h1>
        <Button onClick={handleExportPdfClick} disabled={isExportingPdf}>
          {isExportingPdf ? <Loader2Icon className="animate-spin" /> : <SaveAllIcon />}
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label className="mb-2 text-base font-bold">Page</Label>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Width</span>
              <NumberArrowsInput value={page.width} onChange={(value) => page.setWidth(value)} min={10} />
              <span>cm</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Height</span>
              <NumberArrowsInput value={page.height} onChange={(value) => page.setHeight(value)} min={10} />
              <span>cm</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Padding</span>
              <NumberArrowsInput value={page.padding} onChange={(value) => page.setPadding(value)} min={0} />
              <span>cm</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Rows</span>
              <NumberArrowsInput value={page.rows} onChange={(value) => page.setRows(value)} min={1} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Columns</span>
              <NumberArrowsInput value={page.columns} onChange={(value) => page.setColumns(value)} min={1} />
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 text-base font-bold">Card</Label>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Width</span>
              <NumberArrowsInput value={card.width} onChange={(value) => card.setWidth(value)} min={1} />
              <span>cm</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm block whitespace-nowrap w-16 shrink-0 ">Height</span>
              <NumberArrowsInput value={card.height} onChange={(value) => card.setHeight(value)} min={1} />
              <span>cm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1">
          <Label className="text-base font-bold">Colors</Label>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Red</span>
            <Input type="color" value={colors.red} onChange={(e) => setColor(e.target.value, "red")} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Blue</span>
            <Input type="color" value={colors.blue} onChange={(e) => setColor(e.target.value, "blue")} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Green</span>
            <Input type="color" value={colors.green} onChange={(e) => setColor(e.target.value, "green")} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Yellow</span>
            <Input type="color" value={colors.yellow} onChange={(e) => setColor(e.target.value, "yellow")} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm block whitespace-nowrap w-12 shrink-0 ">Black</span>
            <Input type="color" value={colors.black} onChange={(e) => setColor(e.target.value, "black")} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function UnoSingleCardConfiguration() {
  const { selectedCard, setCardConfig, setSelectedCard } = useUnoCardEditorContext();
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
    try {
      setLoading(true);
      await exportCardPng({ id: selectedCard.name, name: selectedCard.name })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
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
          Export Card
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