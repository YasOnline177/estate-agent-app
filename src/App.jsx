import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import Favourites from "./components/Favourites";
import propertiesData from "./data/properties.json";

function App() {
  // State to store filtered search results
  const [results, setResults] = useState(propertiesData.properties);
  // State to store favourite properties
  const [favourites, setFavourites] = useState([]);
  // Drag state to show floating drop zone
  const [isDragging, setIsDragging] = useState(false);
  // 
  const [dragSource, setDragSource] = useState(null);

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

  // Add a property to favourites and prevent duplicates
  function addToFavourites(property) {
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  }

  // Remove a property from favourites
  function removeFromFavourites(propertyId) {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  }

  // Clear all favourites
  function clearFavourites() {
    setFavourites([]);
  }

  return (
    <div className="app-container">
      <h1>Estate Agent Property Search</h1>

      <main>
        <Routes>
          {/* Home page with search and results */}
          <Route path="/" element={
            <>
              <SearchForm onSearch={handleSearch} />

              <div className="home-main">
                {/* Favourites section */}
                <Favourites
                  favourites={favourites}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  clearFavourites={clearFavourites}
                  results={results}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  dragSource={dragSource}
                  setDragSource={setDragSource} // track the source of the dragged item
                />
                
                {/* Results section */}
                <section className="results-container">
                  {results.length > 0 ? (
                    results.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        setIsDragging={setIsDragging}
                        setDragSource={setDragSource}
                        addToFavourites={addToFavourites}
                      />
                    ))
                  ) : (
                    <p>No properties match your search.</p>
                  )}
                </section>
              </div>
            </>
          } />

          {/* Property page with gallery */}
          <Route
            path="/property/:id"
            element={<PropertyDetails addToFavourites={addToFavourites} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;