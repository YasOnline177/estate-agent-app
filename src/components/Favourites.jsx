/* 
    Display the user's favourite properties
*/

function Favourites({ favourites }) {
    return (
        <div>
            <h2>Favourite Properties</h2>

            {favourites.length === 0 ? (
                <p>No favourites added yet.</p>
            ) : (
                <ul>
                    {favourites.map(property => (
                        <li key={property.id}>
                            {property.shortDescription} - £{property.price.toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Favourites;