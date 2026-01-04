import { Link } from "react-router-dom";

/*
    Display a single property summary card
    Used on the search result page
*/

function PropertyCard({ property, setIsDragging, addToFavourites, setDragSource }) {
    return (
        <div 
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("propertyId", property.id);
                setIsDragging(true);    // show drop zone
                setDragSource("results");   // mark that the dragged item is from the results list
            }}
            onDragEnd={() => {
                setIsDragging(false)
                setDragSource(null)
            }}
        >
            <Link
                to={`/property/${property.id}`}
                className="property-link"
            >
                <article className="property-card">
                    <img src={property.images[0]} alt={property.shortDescription} />

                    <div className="property-info">
                        <h3>{property.shortDescription}</h3>
                        <p className="price">£{property.price.toLocaleString()}</p>
                        <p>{property.bedrooms} bedrooms</p>
                        <p>{property.postcodeArea}</p>
                    </div>
                </article>
            </Link>

            {/* Favourite button */}
            {addToFavourites && (
                <button 
                    className="favourite-btn"
                    onClick={() => addToFavourites(property)}
                    style={{ marginTop: "8px", width: "100%"}}
                >
                    Add to Favourites
                </button>
            )}
        </div>
    )
}

export default PropertyCard; 