# Estate Agent Property Search App

A React-based single-page application that allows users to search, view, and manage property listings for an estate agency. The application supports filtering, favourites management, responsive design, deployment, and testing.

## 🔗 Live Demo

**GitHub Pages:** [https://yasonline177.github.io/estate-agent-app/](https://yasonline177.github.io/estate-agent-app/)

## 📌 Features

### Property Search
Filter properties by:
- Property type (House / Flat)
- Price range (min & max)
- Number of bedrooms (min & max)
- Date added
- Postcode area
- Clear filters button to reset all search criteria
- Results update dynamically without page reload

### Property Listings
- Properties displayed as cards with image, price, and key details
- Click a property card to view full property details
- Dedicated property details page with:
  - Image gallery with thumbnail navigation
  - Tabs for description, floor plan, and Google Maps integration

### Favourites Functionality
**Add properties to favourites:**
- By clicking a Favourite button
- By drag and drop
- Prevents duplicate favourites

**Remove properties from favourites:**
- Via remove button
- By dragging out of the favourites list
- Clear all favourites button

**Favourites list visible on the search page**

### Responsive Design
Two layouts:
- Large screens (desktop)
- Screens smaller than iPad landscape

Implemented using:
- CSS media queries
- Flexbox and CSS Grid

Search form, results, favourites sidebar, and property pages are fully responsive.

## 🔐 Security Considerations

- JSX automatically escapes content to prevent XSS attacks
- Application structure supports Content Security Policy (CSP) at deployment level
- Routing handled safely using React Router

## 🧪 Testing (Jest)

- Jest configured for the project
- **21 passing tests** across 5 test suites
- Tests cover:
  - Property data structure validation
  - Search/filter logic (single and multiple criteria)
  - Favourites add/remove functionality
  - Component rendering
  - Data validation

**All tests pass successfully**

Run tests with:
```bash
npm test
```

## 🚀 Deployment

- Deployed using **GitHub Pages**
- Built with **Vite**
- Uses `HashRouter` to prevent 404 errors on page refresh
- Live version matches the repository source code

Deploy commands:
```bash
npm run build
npm run deploy
```

## 🗂️ Project Structure

```
estate-agent-app/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── Favourites.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyDetails.jsx
│   │   └── SearchForm.jsx
│   ├── data/
│   │   └── properties.json
│   ├── __tests__/
│   │   └── App.test.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── babel.config.cjs
├── jest.config.js
├── jest.setup.js
├── fileTransformer.js
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS (Flexbox & Grid)** - Styling and layout
- **Jest & React Testing Library** - Testing framework
- **GitHub Pages** - Deployment platform

## ✅ Code Quality

- Clean and consistent file structure
- Meaningful comments throughout the codebase
- No unused components or dead code
- Consistent formatting and naming conventions
- Proper separation of concerns

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YasOnline177/estate-agent-app.git
   cd estate-agent-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📄 Property Data

The application uses a JSON file containing 7 properties with the following structure:
- Property ID
- Type (house/flat)
- Number of bedrooms
- Price
- Date added
- Postcode area
- Short and long descriptions
- Image gallery (6-8 images per property)
- Floor plan
- GPS coordinates for map integration

## 🎓 Academic Project

This project was developed as coursework for **5COSC026W Advanced Client-Side Web Development** at the University of Westminster (2025/26).
