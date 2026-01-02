import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { useState } from "react";

/* 
    Shows a single property's details including an image gallery
*/
function PropertyDetails() {
    const { id } = useParams(); // get property id from URL
    const property = propertiesData.properties.find(p => p.id === id);

    // State for the main displayed image 
    const [mainImage, setMainImage] = useState(property.images[0]);

    if (!property) return <p>Property not found.</p>

    return (
        <div className="property-detail-container">
            <h2>{property.shortDescription}</h2>
            <p>£{property.price.toLocaleString()} | {property.bedrooms} bedrooms | {property.postcodeArea}</p>

            {/* Main large image */}
            <div className="main-image">
                <img src={mainImage} alt={property.shortDescription} />
            </div>

            {/* Thumbnail gallery */}
            <div className="thumbnails">
                {property.images.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt={`${property.shortDescription} ${index + 1}`} 
                        className={img === mainImage ? "selected": ""}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
        </div>
    );
}

export default PropertyDetails;