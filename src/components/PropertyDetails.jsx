import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { useState } from "react";

/* 
    Shows a single property's details including an image gallery
*/

function PropertyDetails() {
    // State for the currently active tab
    const [activeTab, setActiveTab] = useState("description");
    const { id } = useParams(); // get property id from URL
    const property = propertiesData.properties.find(p => p.id === id);

    // State for the main displayed image 
    const [mainImage, setMainImage] = useState(property.images[0]);

    if (!property) return <p>Property not found.</p>

    return (
        <div className="property-detail-container">
            <h2>{property.shortDescription}</h2>
            <p>£{property.price.toLocaleString()} | {property.bedrooms} bedrooms | {property.postcodeArea}</p>

            {/* Main image display */}
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
            
            {/* Tabs navigation */}
            <div className="tabs">
                <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>
                    Description 
                </button>

                <button onClick={() => setActiveTab("floorplan")} className={activeTab === "floorplan" ? "active" : ""}>
                    Floor Plan
                </button>

                <button onClick={() => setActiveTab("map")} className={activeTab === "map" ? "active" : ""}> 
                    Map
                </button>

                {/* Tab content */}
                <div className="tab-content">
                    {/* Long description tab */}
                    {activeTab === "description" && (
                        <p>{property.longDescription}</p>
                    )}

                    {/* Floorplan tab */}
                    {activeTab === "floorplan" && (
                        <img src={property.floorPlan} alt="Floor Plan" className="floorplan-img" />
                    )}

                    {/* Google map tab */}
                    {activeTab === "map" && (
                        <iframe 
                            title="map"
                            width="100%"
                            height="350"
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`}
                        />
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default PropertyDetails;