import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

type PdfExportProps = {
  cls: string;
  name: string;
  page: {
    width: number;
    height: number;
  };
};

export async function exportPdfPages(props: PdfExportProps) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "cm",
    format: [props.page.width, props.page.height],
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pages = document.getElementsByClassName(
    props.cls
  ) as HTMLCollectionOf<HTMLElement>;
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    const dataURI = await htmlToImage.toPng(page);
    doc.addImage(dataURI, "PNG", 0, 0, pageWidth, pageHeight);
    if (index < pages.length - 1) {
      doc.addPage();
    }
  }
  doc.save(props.name);
}

type CardPngExportProps = {
  id: string;
  name: string;
};

export async function exportCardPng({ id, name }: CardPngExportProps) {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) {
    throw new Error(`Element with id '${id}' Not found.`);
  }

  const dataURI = await htmlToImage.toPng(element);
  saveAs(dataURI, `${name}.png`);
}
