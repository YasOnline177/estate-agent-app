import { useState } from "react";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import propertiesData from "./data/properties.json"; 

function App() {
  // State to store filtered search results
  const [results, setResults] = useState(propertiesData.properties);
  
  // Handle search logic from SearchForm
  function handleSearch(filters) {
    const filtered = propertiesData.properties.filter(prop => {
      
      // Property type filter 
      if (filters.type && prop.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
      
      // Price filter
      if (filters.minPrice && prop.price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && prop.price > parseInt(filters.maxPrice)) {
        return false;
      }
      
      // Bedroom filter
      if (filters.minBedrooms && prop.bedrooms < parseInt(filters.minBedrooms)) {
        return false;
      }
      if (filters.maxBedrooms && prop.bedrooms > parseInt(filters.maxBedrooms)) {
        return false;
      }

      // Date added filter
      if (filters.dateAdded && new Date(prop.added) < new Date(filters.dateAdded)) {
        return false;
      }

      // Postcode filter
      if (filters.postcodeArea && prop.postcodeArea !== filters.postcodeArea) {
        return false;
      }

      // if matches all criteria
      return true;
    });

    // update state
    setResults(filtered);
  }

  return (
    <>
      <div className="app-container">
        <header>
          <h1>Estate Agent Property Search</h1>
        </header>

        <main>
          <SearchForm onSearch={handleSearch} />

          {/* Results section */}
          <section className="results-container">
            {results.length > 0 ? (
              results.map(property => (
                <PropertyCard 
                  key={property.id}
                  property={property}
                />
              ))
            ) : (
              <p>No properties match your search.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;