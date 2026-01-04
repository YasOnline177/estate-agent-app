import PropertyCard from "./PropertyCard";

function Favourites({
    favourites,
    addToFavourites,
    removeFromFavourites,
    clearFavourites,
    results,
    isDragging,
    setIsDragging,
    dragSource,
    setDragSource
}) {
    return (
        <>
            {/* Favourites Sidebar */}
            <aside className="favourites-sidebar">
                <h2>Favourites</h2>

                {/* Clear all favourites button */}
                {favourites.length > 0 && (
                    <button 
                        className="favourite-btn"
                        onClick={clearFavourites}
                    >
                        Clear All
                    </button>
                )}

                {favourites.length === 0 ? (
                    <p>No favourites added yet.</p>
                ) : (
                    <div className="favourite-list">
                        {favourites.map((property) => (
                            <div
                                key={property.id}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("propertyId", property.id);
                                    setDragSource("favourites");
                                    setIsDragging(true);
                                }}
                                onDragEnd={() => {
                                    setIsDragging(false);
                                    setDragSource(null);
                                }}
                                style={{ marginBottom: "10px" }}
                            >
                                <PropertyCard property={property} />
                                <button
                                    className="favourite-btn"
                                    style={{ background: "red", maxWidth: "50%", margin: "5px 55px" }}
                                    onClick={() => removeFromFavourites(property.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* Drag and drop zones */}
            {isDragging && dragSource === "results" && (
                <>
                    {/* Add to favourites */}
                    <div
                        className="drop-zone add"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const id = e.dataTransfer.getData("propertyId");
                            const property = results.find((p) => p.id === id);
                            if (property) addToFavourites(property);
                            setIsDragging(false);
                            setDragSource(null);
                        }}
                    >
                        Drop Here to Add
                    </div>
                </>
            )}
            {isDragging && dragSource === "favourites" && (
                <>
                    {/* Remove from favourites */}
                    <div
                        className="drop-zone remove"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const id = e.dataTransfer.getData("propertyId");
                            removeFromFavourites(id);
                            setIsDragging(false);
                            setDragSource(null);
                        }}
                    >
                        Drop Here to Remove
                    </div>
                </>
            )}
        </>
    );
}

export default Favourites;  