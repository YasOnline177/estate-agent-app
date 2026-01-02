import SearchForm from "./components/SearchForm";

function App() {
  function handleSearch(filter) {
    console.log("Search filter: ",filters);
  }

  return (
    <>
      <div className="app">
        <header>
          <h1>Estate Agent Property Search</h1>
        </header>

        <main>
          <SearchForm onSearch={handleSearch} />
        </main>
      </div>
    </>
  )
}

export default App;