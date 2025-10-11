import { Button } from "./components/ui/button";
import { UnoCard } from "./components/uno-card/uno-card"
import { UnoSet } from "./constants/uno-set"
import * as htmlToImage from 'html-to-image'
function App() {

  const downloadCard = async (name: string) => {
    const card = document.getElementById(name);
    if (!card) return;
    const dataUrl = await htmlToImage.toPng(card, {
      backgroundColor: 'transparent',
    });
    console.log(dataUrl);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.target = '_blank';
    link.click();
  }
  return (
    <>
      <div>
        <h1>Hello World</h1>
        {UnoSet.map((card) => (
          <div style={{ width: "10%" }} key={card.name}>
            <div>
              <p>{card.name}</p>
              <Button onClick={() => downloadCard(card.name)}>Download</Button>
            </div>
            <UnoCard key={card.name} config={card} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
