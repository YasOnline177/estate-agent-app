import { useState } from "react";

/* 
    Collects user search criteria using enhanced form widgets
    Sends selected filters back to the parent component 
*/

function SearchForm({ onSearch }) {
    // State  object to store all search filters
    const [filters, setFilters] = useState({
        type: "",
        minPrice: "",
        maxPrice: "",
        minBedrooms: "",
        maxBedrooms: "",
        dateAdded: "",
        postcodeArea: ""
    });

    // Update filter state when any form field changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    }

    // Prevents page reload and sends filters to parent 
    function handleSubmit(e) {
        e.preventDefault();
        onSearch(filters);
    }

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <section className="form-section">
                <h2>Search Properties</h2>

            {/* Property type selection */}
            <div className="form-group">
                <label>
                    Property Type:
                    <select name="type" value={filters.type} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="house">House</option>
                        <option value="flat">Flat</option>
                    </select>
                </label>
            </div>

            {/* Price range inputs */}
            <div className="form-group">
                <label>
                    Min Price:
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Max Price:
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                    />
                </label>
            </div>

            {/* Bedroom count selection */}
            <div className="form-group">
                <label>
                    Min Bedroom:
                    <select name="minBedrooms" value={filters.minBedrooms} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                <label>
                    Max Bedrooms:
                    <select name="maxBedrooms" value={filters.maxBedrooms} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
            </div>

            <div className="form-group">
                {/* Date picker for property added date */}
                <label>
                    Date Added:
                    <input 
                        type="date"
                        name="dateAdded"
                        value={filters.dateAdded}
                        onChange={handleChange}
                    />
                </label>

                {/* Postcode area selection */}
                <label>
                    Postcode Area:
                    <select name="postcodeArea" value={filters.postcodeArea} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="BR5">BR5</option>
                        <option value="BR6">BR6</option>
                        <option value="NW1">NW1</option>
                        <option value="E1">E1</option>
                        <option value="SW3">SW3</option>
                        <option value="N1">N1</option>
                        <option value="SE1">SE1</option>
                    </select>
                </label>
            </div>
            
            <button type="submit">Search</button>
            </section>

        </form>
    )
}

export default SearchForm;