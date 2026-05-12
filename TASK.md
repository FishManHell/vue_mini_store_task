# Vue.js Home Assignment: Full Stack Developer

**Duration:** around 4 hours

## Scenario

You are tasked with building a small user interface for a mini e-commerce platform. The platform sells a limited range of digital products (e.g., e-books, software licenses, online courses). Users should be able to browse products and view details for a specific product.

## Pages to Implement

### 1. List Page

- **Purpose:** Display a list of available products.
- **Data:** You must implement a simple backend REST API to provide the product data. Each product should have at least: `id`, `name`, `price`, `shortDescription`, `thumbnailUrl`.
- **Functionality:** Fetch and display the product list from the mock data.
  - Each product in the list should display its name, price, and thumbnail.
  - Clicking on a product item should navigate the user to the Product Details Page for that specific product.
  - Implement a robust, multi-faceted filtering system (e.g., filter by name and category) and add sorting options (e.g., by price or name).

### 2. Details Page

- **Purpose:** Display detailed information about a single selected product.
- **Data:** This page should display more detailed information for the product selected on the Product Listing Page. In addition to the fields listed above, each product in the mock data will also have: `longDescription`, `category`, `reviews`.
- **Functionality:**
  - Display the product's name, price, thumbnail (larger than on the listing page), short description, long description, and category.
  - Display the list of reviews for the product.
  - Provide a "Back to Products" button or link to navigate back to the Product Listing Page.
  - Implement an "Add to Cart" button that updates the global shopping cart state.

### 3. Shopping Cart Page

- **Purpose:** Allow users to review items in their cart and proceed to a mock checkout.
- **Functionality:** Display all items currently in the cart, allowing users to adjust product quantities or remove items. Display a dynamically updated total cost.

## Backend Requirements & Technology

- **Technology:** Implement a RESTful API using a preferred backend stack (e.g., Node.js/NestJS/Express, Python/FastAPI, etc.).
- **Functionality:** Create endpoints to serve product listing data, single product details, and manage mock persistence for the shopping cart.
- **Implementation:** The API should handle the requested filtering and sorting logic for the product list on the server-side, and utilize a simple mock database for data storage.

## Expectations

### Code Quality & Services

- The solution should demonstrate a clean and modular architecture, with a focus on logical component separation and clear naming conventions.
- Implement skeleton loaders or meaningful loading indicators for asynchronous data fetching (e.g., on the List Page) to enhance user experience.
- **Vue.js:** Use Vue 3 with the Composition API.
- **TypeScript:** The project must be written in TypeScript. Define interfaces for your data structures (e.g., `Product`, `Review`).
- **Routing:** Use Vue Router for navigation.
- **Styling:**
  - The app looks nice — focus on a clean, user-friendly layout. Basic responsiveness for mobile/desktop is expected.
  - You are free to use any styling approach you prefer (CSS, SCSS, CSS Modules).
  - **Advantage:** Using Tailwind CSS.
- **Component Library:**
  - Use any component library in case you need any.
  - **Advantage:** Using PrimeVue.
- **Git:**
  - Initialize a Git repository for your project.
  - Use git as you see fit.
- **State Management (Required):** use Pinia for global state management of the shopping cart.
- **Basic Error Handling:** Consider basic error handling, such as what to display if a product ID in the URL doesn't correspond to an existing product. Or if a user navigates to a wrong url to the application.
- **Testing and Quality:**
  - Write unit tests for at least one component (e.g., the filtering logic or cart management).
  - Focus on basic accessibility (A11y) for key navigation elements (e.g., keyboard support).

## Extras

- Host with Github Pages, or any UI hosting service.
- Error handling more gracefully, bad data fetching / internet outages for users is always a possibility.
