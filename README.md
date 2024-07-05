# E-commerce Backend Project

This project is a backend application for managing product and order. It is built using TypeScript, Express, and Mongoose.

## Live Link

## Technology Stack

1. **TypeScript:**

TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors during development and improves code quality. TypeScript is transpiled to JavaScript before execution.

2. **Express:**

Express is a web application framework for Node.js. It simplifies the process of building robust, scalable, and modular web applications by providing a set of features for routing, middleware, and handling HTTP requests and responses.

3. **Mongoose:**

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to define schemas, models, and interact with MongoDB databases using JavaScript or TypeScript.

4. **Zod:**

Zod is a TypeScript-first schema declaration and validation library. It helps define the shape of data structures, validate input, and ensure type safety in runtime. In your project, Zod is used for validating data.

5. **HttpStatus:**

HttpStatus is a library that provides a set of constants for HTTP status codes. It makes it easier to use meaningful status codes in your application for better communication between the server and client.

6. **CORS (Cross-Origin Resource Sharing):**

CORS is a security feature implemented by web browsers that allows or restricts web applications running at one origin to make requests for resources from a different origin. The cors library in your project helps handle CORS headers.

7. **dotenv:**

dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This is useful for managing configuration settings in development.

8. **ESLint:**

ESLint is a linter for JavaScript and TypeScript that helps identify and fix common coding issues. It enforces code style and consistency across the project.

9. **Prettier:**

Prettier is a code formatter that automatically formats code to follow a consistent style. It works well with ESLint and helps maintain a clean and uniform codebase.

10. **ts-node-dev:**

ts-node-dev is a development server for TypeScript applications. It allows you to run and develop TypeScript applications with automatic restarts on file changes. It's particularly useful during development.

These technologies and libraries together provide a robust foundation for building a backend application. TypeScript brings static typing to JavaScript, Express simplifies web application development, Mongoose interacts with MongoDB, and the additional tools enhance the development experience, ensure code quality, and handle various aspects of the application's functionality.

## Routes

This document outlines the endpoints for an e-commerce API, detailing how to manage products and orders. The API supports CRUD operations for products and various operations for managing orders.

### Products

1. **Create Product**

   - **Endpoint:** `/products`
   - **Method:** POST
   - **Description:** Creates a new product with details such as name, description, price, category, tags, variants, and inventory information.
   - **Request Body:**
     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```

2. **Get All Products**

   - **Endpoint:** `/products`
   - **Method:** GET
   - **Description:** Retrieves a list of all products available in the e-commerce store.

3. **Search a Product**

   - **Endpoint:** `/products?searchTerm=watch`
   - **Method:** GET
   - **Description:** Searches for products based on the provided search term.
   - **Query Parameter:**
     - `searchTerm`: The term to search for (e.g., "watch").

4. **Get Single Product**

   - **Endpoint:** `/products/:productId`
   - **Method:** GET
   - **Description:** Retrieves details of a single product by its unique ID.
   - **Path Parameter:**
     - `productId`: The ID of the product to retrieve.

5. **Update Product**

   - **Endpoint:** `/products/:productId`
   - **Method:** PUT
   - **Description:** Updates the details of an existing product by its unique ID.
   - **Path Parameter:**
     - `productId`: The ID of the product to update.
   - **Request Body:**
     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```

6. **Delete Product**
   - **Endpoint:** `/products/:productId`
   - **Method:** DELETE
   - **Description:** Deletes an existing product by its unique ID.
   - **Path Parameter:**
     - `productId`: The ID of the product to delete.

### Orders

1. **Create Order**

   - **Endpoint:** `/orders`
   - **Method:** POST
   - **Description:** Creates a new order with details such as customer email, product ID, price, and quantity.
   - **Request Body:**
     ```json
     {
       "email": "asif@mail.com",
       "productId": "6687be4e0e3d6534247e43e8",
       "price": 999,
       "quantity": 12
     }
     ```

2. **Get All Orders**

   - **Endpoint:** `/orders`
   - **Method:** GET
   - **Description:** Retrieves a list of all orders placed in the e-commerce store.

3. **Get Order by Email**
   - **Endpoint:** `/orders?email={email}`
   - **Method:** GET
   - **Description:** Retrieves all orders associated with a specific email address.
   - **Query Parameter:**
     - `email`: The email address associated with the orders (e.g., "asif@mail.com").

---

This API provides essential endpoints to manage the core aspects of an e-commerce platform, including creating, updating, retrieving, and deleting products, as well as managing orders. This allows for comprehensive management of both inventory and customer orders.

## How to Run Locally

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm i
```

### 3. Set Environment Variables

Create a .env file in the root of your project and set any necessary environment variables, such as database connection details. Make sure you have the required environment variables according to your project.

### 4. Run the Project

Run the project in development mode using the provided script:

```bash
npm run start:dev

```

This script uses `ts-node-dev` to run the TypeScript code in development mode with automatic restarts on file changes.

### 5. Testing

You can test your API endpoints using tools like Postman, Insomnia, or by making HTTP requests directly using a tool like `curl` or a web browser.

### 6. Linting and Formatting

You can lint your code and fix formatting issues using the provided scripts:

```bash
npm run lint
npm run lint:fix

```

These commands use ESLint for linting and Prettier for code formatting.

### 7. Building for Production

If you want to deploy your application in production, you can build the TypeScript code using:

```bash
npm run build

```

Then start the production server:

```bash
npm run start:prod

```

### Database Setup

Make sure you have a MongoDB instance running if your project uses MongoDB, and that your database connection details are correctly configured in the .env file.
