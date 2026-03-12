# ProductShop

ProductShop is a fully featured Angular application built for e-commerce, supporting various user roles including Customers, Sellers, and Administrators.

---

## Features

### 🛍️ E-Commerce Core

- **Product Catalog:** Browse a rich list of products categorized intelligently, featuring images, prices, descriptions, and dynamic stock levels.
- **Product Details:** Navigate to detailed views of products.
- **Shopping Cart:** Add or remove products to/from a live shopping cart cart with automatic subtotal calculation.
- **Wishlist & My Lists:** Users can mark products as favorites and access them quickly from their profile.
- **Product Reviews:** Customers can leave ratings and comments on products they purchased or viewed.

### 💳 Checkout & Payments

- **Multi-Method Checkout:** Supports standard checkout flows.
- **PayPal Integration:** Securely process payments using the PayPal checkout system.
- **Cash on Delivery:** Alternative payment method enabling administrators to collect funds upon delivery.
- **Order History (My Orders):** Customers can review their past and current orders, complete with status tracking and product purchase details.

### 👥 User Roles & Permissions

- **User Authentication:** Secured login and registration featuring robust authentication guards.
- **Role-Based Navigation:** The UI dynamically adjusts whether a User, Seller, or Admin is logged in.

#### 🛡️ Administrator Features

- **Admin Users Panel:** Manage registered users on the platform.
- **Admin Orders Panel:** View a global list of all transactions and orders. Includes the ability to manually update the status of 'Cash On Delivery' payments (Pending, Done, Failed).
- **Categories Management:** Add, edit, and remove product categories.

#### 🏪 Seller Features

- **Seller Dashboard:** A dedicated space for merchants to visualize their catalog.
- **Product Management:** Sellers can create new products, edit existing descriptions/prices, and crucially, manage product stock.

---

## Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm**: v9+
- **Angular CLI**: v17+

Install Angular CLI globally if you don’t already have it:

```bash
pnpm install -g @angular/cli
```

---

## Getting started

Clone the repository (or download the project files), then install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
ng serve
```

Open your browser at `http://localhost:4200/`. The app will automatically reload when you change any source files.

---

## Additional resources

- **Angular CLI reference**: [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- **Angular docs**: [Angular documentation](https://angular.dev/)
