import { Link } from "react-router-dom";

/*
    Display a single property summary card
    Used on the search result page
*/

function PropertyCard({ property, setIsDragging }) {
    return (
        <div 
            draggable 
            onDragStart={(e) => {
                e.dataTransfer.setData("propertyId", property.id);
                setIsDragging(true);
            }}
            onDragEnd={() => setIsDragging(false)}
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
        </div>
    )
}

export default PropertyCard;