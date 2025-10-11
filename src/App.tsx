import { UnoCard } from "./components/uno-card/uno-card"
import { UnoSet } from "./constants/uno-set"
function App() {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        {UnoSet.map((card) => (
          <div style={{ width: "10%" }}>
            <UnoCard key={card.name} config={card} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
