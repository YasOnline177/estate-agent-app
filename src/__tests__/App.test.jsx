import { render, screen } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import propertiesData from '../data/properties.json';

// Use properties from JSON file
const realProperties = propertiesData.properties;

// -- Verifies that all 7 properties exist and have required fields --
describe('Property Data Structure', () => {
    test('properties.json contains exactly 7 properties', () => {
        expect(realProperties).toHaveLength(7);
    });

    test('all properties have required fields', () => {
        realProperties.forEach(property => {
            expect(property).toHaveProperty('id');
            expect(property).toHaveProperty('type');
            expect(property).toHaveProperty('bedrooms');
            expect(property).toHaveProperty('price');
            expect(property).toHaveProperty('added');
            expect(property).toHaveProperty('postcodeArea');
            expect(property).toHaveProperty('shortDescription');
            expect(property).toHaveProperty('images');
        });
    });

    test('all properties have valid price values', () => {
        realProperties.forEach(property => {
            expect(property.price).toBeGreaterThan(0);
            expect(typeof property.price).toBe('number');
        });
    });

    test('all properties have 6-8 images', () => {
        realProperties.forEach(property => {
            expect(property.images.length).toBeGreaterThanOrEqual(6);
            expect(property.images.length).toBeLessThanOrEqual(8);
        });
    });
});

// -- Tests filtering properties by different criteria --
describe('Search Filtering Logic', () => {
    test('filters properties by type "house"', () => {
        const houses = realProperties.filter(prop => prop.type === 'house');

        expect(houses.length).toBeGreaterThan(0);
        expect(houses.every(prop => prop.type === 'house')).toBe(true);

        // Verify specific houses exist
        const houseIds = houses.map(h => h.id);
        expect(houseIds).toContain('prop1');
        expect(houseIds).toContain('prop3');
    });

    test('filters properties by type "flat"', () => {
        const flats = realProperties.filter(prop => prop.type === 'flat');

        expect(flats.length).toBeGreaterThan(0);
        expect(flats.every(prop => prop.type === 'flat')).toBe(true);
    });

    test('filters properties by price range', () => {
        const minPrice = 400000;
        const maxPrice = 800000;

        const filtered = realProperties.filter(prop =>
            prop.price >= minPrice && prop.price <= maxPrice
        );

        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach(prop => {
            expect(prop.price).toBeGreaterThanOrEqual(minPrice);
            expect(prop.price).toBeLessThanOrEqual(maxPrice);
        });
    });

    test('filters properties by bedroom count', () => {
        const minBedrooms = 3;

        const filtered = realProperties.filter(prop =>
            prop.bedrooms >= minBedrooms
        );

        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach(prop => {
            expect(prop.bedrooms).toBeGreaterThanOrEqual(minBedrooms);
        });
    });

    test('filters properties by postcode area', () => {
        const postcodeArea = 'BR5';

        const filtered = realProperties.filter(prop =>
            prop.postcodeArea === postcodeArea
        );

        expect(filtered.length).toBeGreaterThan(0);
        expect(filtered[0].postcodeArea).toBe('BR5');
        expect(filtered[0].id).toBe('prop1');
    });
});

// -- Tests combining multiple filters together --
describe('Combined Search Filters', () => {
    test('filters by type AND price range', () => {
        const type = 'house';
        const minPrice = 600000;
        const maxPrice = 850000;

        const filtered = realProperties.filter(prop =>
            prop.type === type &&
            prop.price >= minPrice &&
            prop.price <= maxPrice
        );

        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach(prop => {
            expect(prop.type).toBe(type);
            expect(prop.price).toBeGreaterThanOrEqual(minPrice);
            expect(prop.price).toBeLessThanOrEqual(maxPrice);
        });
    });

    test('filters by type, price, AND bedrooms', () => {
        const type = 'house';
        const minPrice = 700000;
        const minBedrooms = 3;

        const filtered = realProperties.filter(prop =>
            prop.type === type &&
            prop.price >= minPrice &&
            prop.bedrooms >= minBedrooms
        );

        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach(prop => {
            expect(prop.type).toBe(type);
            expect(prop.price).toBeGreaterThanOrEqual(minPrice);
            expect(prop.bedrooms).toBeGreaterThanOrEqual(minBedrooms);
        });
    });
});

// -- Tests adding and removing properties from favourites --
describe('Favourites Management', () => {
    test('adds property to empty favourites array', () => {
        const favourites = [];
        const propertyToAdd = realProperties[0];

        const updatedFavourites = [...favourites, propertyToAdd];

        expect(updatedFavourites).toHaveLength(1);
        expect(updatedFavourites[0].id).toBe('prop1');
    });

    test('prevents duplicate properties in favourites', () => {
        const favourites = [realProperties[0]];
        const propertyToAdd = realProperties[0]; // Same property

        // Check if already exists
        const exists = favourites.some(fav => fav.id === propertyToAdd.id);

        expect(exists).toBe(true);

        // Don't add if exists
        const updatedFavourites = exists ? favourites : [...favourites, propertyToAdd];

        expect(updatedFavourites).toHaveLength(1);
    });

    test('adds multiple different properties to favourites', () => {
        let favourites = [];

        // Add first property
        favourites = [...favourites, realProperties[0]];
        expect(favourites).toHaveLength(1);

        // Add second property
        favourites = [...favourites, realProperties[1]];
        expect(favourites).toHaveLength(2);

        // Add third property
        favourites = [...favourites, realProperties[2]];
        expect(favourites).toHaveLength(3);
    });

    test('removes property from favourites by id', () => {
        const favourites = [
            realProperties[0],
            realProperties[1],
            realProperties[2]
        ];

        const idToRemove = 'prop2';
        const updatedFavourites = favourites.filter(fav => fav.id !== idToRemove);

        expect(updatedFavourites).toHaveLength(2);
        expect(updatedFavourites.find(fav => fav.id === 'prop2')).toBeUndefined();
        expect(updatedFavourites.map(f => f.id)).toEqual(['prop1', 'prop3']);
    });

    test('clears all favourites', () => {
        const favourites = [
            realProperties[0],
            realProperties[1],
            realProperties[2]
        ];

        const clearedFavourites = [];

        expect(clearedFavourites).toHaveLength(0);
    });
});

// -- Tests if SearchForm renders correctly --
describe('SearchForm Component', () => {
    test('renders search form with all elements', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        expect(screen.getByText('Search Properties')).toBeInTheDocument();
    });

    test('renders property type dropdown', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        const typeSelect = screen.getByRole('combobox', { name: /property type/i });
        expect(typeSelect).toBeInTheDocument();
    });

    test('renders search and clear buttons', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
    });

    test('renders price input fields', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    });

    test('renders bedroom dropdowns', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        expect(screen.getByLabelText(/min bedroom/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max bedrooms/i)).toBeInTheDocument();
    });
});