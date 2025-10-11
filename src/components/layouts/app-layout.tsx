export function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  )
}


function AppHeader() {
  return (
    <header className="border-b border-gray-300">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">L'Carta Dyalek</h1>
      </div>
    </header>
  )
}