# Uniqla Store

## Introduction

**Uniqla Store** is a full-stack eCommerce web application built with **TypeScript**, **Next.js**, and **MongoDB**. This project is designed to provide a seamless shopping experience, where users can explore products, search for items, manage their wishlist, and handle user authentication through registration and login. It serves as a modern, feature-rich platform, demonstrating advanced web development practices, making it an excellent addition to your portfolio.

## Features

The Uniqla Store offers a variety of features to ensure an optimal shopping experience:

### 1. **User Authentication**
   - **Register Page**: Users can create a new account.
   - **Login Page**: Registered users can log in to access their account and wishlist.
   - **Secure Authentication**: Optionally, **NextAuth.js** can be implemented to provide secure user authentication.

### 2. **Home Page**
   - **Promotional Banner**: A section for displaying special offers and promotional deals.
   - **Store Information**: Brief details about Uniqla Store’s mission and values.
   - **Featured Products**: A section showcasing 5 to 10 highlighted products with a "See All" link for further exploration.

### 3. **Product Pages**
   - **Product List Page**: Displays all available products with the following features:
     - **Search Functionality**: Users can search for products by name, using **debounce** to improve search performance.
     - **Infinite Scroll**: Automatically loads more products as the user scrolls down the page.
   - **Product Detail Page**: Provides detailed information about a specific product, including images, descriptions, and prices.
     - **Add to Wishlist**: Users can easily add products to their wishlist for future reference.

### 4. **Wishlist Management**
   - **Wishlist Page**: Displays all products that a user has added to their wishlist.
   - **Remove from Wishlist**: Users can remove products from their wishlist at any time.

### 5. **SEO & Meta Tags**
   - **Dynamic Meta Tags**: Each product detail page is optimized for search engines with dynamic meta tags to improve SEO and product discoverability.

## Technologies Used

### Frontend
- **Next.js**: A powerful React-based framework that supports server-side rendering (SSR) and static site generation (SSG) to improve performance and SEO.
- **TypeScript**: Adds static typing to JavaScript, ensuring better code maintainability and fewer errors.
- **SCSS/CSS Modules**: For styling the user interface and ensuring that the app is responsive across different devices.

### Backend
- **MongoDB**: A NoSQL database used to store product information, user data, and wishlist items.
- **Next.js API Routes**: Provides a convenient way to handle server-side logic and interact with the MongoDB database.
- **Mongoose**: A library that simplifies database interactions and helps structure the MongoDB data.

### Additional Libraries & Tools
- **Axios / Fetch API**: Used to make API calls between the client and server.
- **NextAuth.js** (optional): Handles secure user authentication and session management.
- **Debounce**: Optimizes the search function to avoid unnecessary API requests while typing.

### User Interface
- **Responsive Design**: Ensures that the app is fully responsive, providing a great user experience across devices including desktops, tablets, and smartphones.

## Core Features Overview

- **Authentication**: Secure registration and login functionality to personalize the user experience.
- **Home Page**: Displays a promotional banner, store information, and featured products for easy browsing.
- **Product Browsing**: Includes a product list page with search functionality, infinite scroll, and detailed product pages.
- **Wishlist**: Allows users to add products to a wishlist and remove them as needed.

## Future Enhancements

To further improve the user experience, the following features can be added:

- **Shopping Cart & Checkout**: A complete shopping cart system integrated with a payment gateway (e.g., Stripe, PayPal).
- **User Reviews & Ratings**: Enable users to leave reviews and rate products.
- **Order History**: Provide users with a section to view their past orders.
- **Admin Dashboard**: Build an admin panel for managing products, user accounts, and orders.

## Conclusion

**Uniqla Store** is a modern eCommerce platform that demonstrates the use of cutting-edge technologies like **Next.js**, **TypeScript**, and **MongoDB**. It offers a complete user experience with product browsing, wishlist management, and secure authentication, making it an ideal project for showcasing your web development skills.
