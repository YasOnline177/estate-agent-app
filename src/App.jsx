import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import Favourites from "./components/Favourites";
import propertiesData from "./data/properties.json"; 

function App() {
  // State to store filtered search results
  const [results, setResults] = useState(propertiesData.properties);
  // Store favourite properties selected by the user
  const [favourites, setFavourites] = useState([]);
  const [isDragging, setIsDragging] = useState(false);  // show floating drop zone
  
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

  // Add a property to favourites and prevent duplicate properties
  function addToFavourites(property) {
    // Prevent duplicates
    const alreadyAdded = favourites.some(fav => fav.id === property.id);
    if (!alreadyAdded) {
      setFavourites([...favourites, property]);
    }
  }

  return (
      <div className="app-container">
        <header>
          <h1>Estate Agent Property Search</h1>
          <nav>
            <Link to="/favourites">
              View Favourites
            </Link>
          </nav>
        </header>

        {/* Floating drop zone for drag & drop */}
        {isDragging && (
          <div
            className="floating-favourites"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const id = e.dataTransfer.getData("propertyId");
              const property = results.find(p => p.id === id);
              if (property) addToFavourites(property);
            }}
          >
            Drop Here to Add to Favourites
          </div>
        )}

        <main>
          <Routes>
            {/* Home page with search and results */}
            <Route path="/" element={
              <>
                <SearchForm onSearch={handleSearch} />

                

                {/* Results section */}
                <section className="results-container">
                  {results.length > 0 ? (
                    results.map(property => (
                      <PropertyCard 
                        key={property.id}
                        property={property}
                        setIsDragging={setIsDragging}
                      />
                    ))
                  ) : (
                    <p>No properties match your search.</p>
                  )}
                </section>
              </>
            } />

            {/* Property page with gallery */}
            <Route 
              path="/property/:id" 
              element={
                <PropertyDetails 
                  addToFavourites={addToFavourites}
                />
              } 
            />

            <Route 
              path="/favourites" element={<Favourites favourites={favourites} />} 
            />
            
          </Routes>
        </main>
      </div>
  );
}

export default App;