import Products from './components/Products';

function App() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <header className="bg-[#1b1b1b] border-b border-[#2b2b2b]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#4CAF50]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-medium text-white">Platzi Fake Store API</h1>
          </div>
          <div className="mt-4 text-sm text-gray-400 font-mono">[GET] https://api.escuelajs.co/api/v1/products</div>
        </div>
      </header>
      <main>
        <Products />
      </main>
    </div>
  );
}

export default App;
