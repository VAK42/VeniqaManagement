# VeniqaManagement - Comprehensive Technical Architecture & Developer Guide

## 1. Executive Summary & Architectural Vision

VeniqaManagement Is A Full-Stack Administration Dashboard Engineered To Orchestrate The Operations Of A Web Store. It Is Designed To Handle Complex Administrative Workflows, Including Product Catalog Management, Order Fulfillment, Tariff Configuration, And Featured Content Management.

The Core Design Philosophy Prioritizes A Secure, Role-Based Environment. The Frontend Acts As A Reactive Control Panel, While The Backend Encapsulates All Business Logic, Data Persistence, And Access Control Rules.

## 2. Runtime Environments & Execution Protocols

The Project Is Distinctly Divided Into Two Runtimes, Managed By Independent Configuration Files.

### 2.1 Server-Side Runtime
* **Configuration Source**: `Backend/package.json` And `Backend/config/config.js`
* **Entry Point**: `index.js`
* **Port**: Defaults To 3000
* **Execution Commands**:
    * `npm install`: Hydrates The Directory With Dependencies Such As `express`, `sequelize`, `sqlite3`, `bcryptjs`, And `multer`.
    * `npm start`: Triggers The `node index.js` Command To Initialize The HTTP Server And Sync The Database Schema.

### 2.2 Client-Side Runtime
* **Configuration Source**: `Frontend/package.json`
* **Entry Point**: `src/main.ts`
* **Port**: Defaults To 5173 (Vite Default)
* **Execution Commands**:
    * `npm install`: Hydrates The Directory With Dependencies Such As `vue`, `vuex`, `axios`, And `tailwindcss`.
    * `npm run dev`: Launches The Vite Development Server With Hot Module Replacement.

## 3. Backend Architecture & Service Layer Design

The Backend Is Built On Node.js And Express, Utilizing A Layered Architecture To Separate HTTP Handling From Business Logic.

### 3.1 Core Application Configuration
The `index.js` File Serves As The Central Bootstrap For The Application.
* **Security Middleware**: Integrates `helmet` To Secure HTTP Headers And `cors` To Manage Cross-Origin Requests.
* **Static Assets**: Serves Uploaded Images Via The `/uploads` Directory.
* **Route Aggregation**: The App Mounts Distinct Routers For `/auth`, `/catalog`, `/orders`, `/referenceData`, And `/ui`.

### 3.2 Authentication & Authorization Service
Security Is Managed Via Token-Based Authentication With Granular Permission Controls.
* **Admin Management**: Supports Creating Admins, Updating Permissions, And Deleting Accounts via `authService.js`.
* **Password Security**: Utilizes `bcryptjs` For Hashing And `crypto` For Generating Reset Tokens.
* **Permissions**: Middleware In `authMiddleware.js` Enforces Roles Such As `superAdmin`, `catalogManage`, Or `orderView`.

### 3.3 Catalog Management Service
This Service Handles The CRUD Operations For The Product Inventory.
* **Product Logic**: The `catalogService.js` Manages Product Creation, Updates, And Soft Deletion.
* **Data Handling**: Handles Complex Data Structures Including `thumbnailUrls`, `detailedImageUrls`, `prices`, And `weight`.
* **Uploads**: Utilizes `multer` Middleware To Handle Multipart Form Data For Product Images.

### 3.4 Order Fulfillment Service
The Service Responsible For Managing The Lifecycle Of Customer Orders.
* **Order Processing**: Allows Admins To View Orders, Update Status (e.g., CONFIRMED, CANCELLED), And Mark Items As Fulfilling, Shipped, Or Delivered.
* **Audit Logging**: The `orderService.js` Maintains An Audit Log Within The Order Record To Track Who Made Changes And When.
* **Comments**: Supports Adding Internal Comments To Orders For Administrative Notes.

### 3.5 UI & Reference Data Service
Manages Dynamic Content For The Storefront And System Configurations.
* **Featured Sections**: Allows Admins To Curate Featured Product Lists Via `uiService.js`.
* **Reference Data**: Manages Global Settings Like `Categories`, `Tariffs` (Custom Duties), `Roles`, And `Stores`.

## 4. Database Schema & Data Modeling

Persistence Is Managed By Sequelize With A SQLite Backend (`database.sqlite`). The Schema Makes Heavy Use Of JSON Columns To Store Flexible Data Structures.

### 4.1 User Domain
* **User Model**:
    * **Fields**: `email`, `password`, `name`, `isActive`.
    * **JSON Columns**: `permissions` (Array Of Strings defining Access Rights).

### 4.2 Product Domain
* **Product Model**:
    * **Fields**: `name`, `storeSku`, `store`, `brand`, `active`.
    * **JSON Columns**: `price`, `weight`, `thumbnailUrls`, `detailedImageUrls`, `customAttributes`.
* **Category Model**: Defines Hierarchical Structure (`category`, `subcategory`).
* **Tariff Model**: Defines Custom Duty Rates (`name`, `rates`).

### 4.3 Transaction Domain
* **Order Model**: Represents A Customer Order Being Processed.
    * **Fields**: `userEmail`, `status`.
    * **JSON Columns**: `items`, `shippingAddress`, `paymentInfo`, `auditLog`.

## 5. Frontend Architecture & Client-Side Logic

The Frontend Is A Single Page Application Built With Vue 3, Utilizing The Composition API And TypeScript.

### 5.1 Build Pipeline & Styling
The `vite.config.ts` File Defines The Build Process.
* **Styling**: Utilizes Tailwind CSS Configured In `tailwind.config.js` And Imported In `assets/css/index.css`.
* **Alias Resolution**: The `@` Symbol Is Mapped To The `src` Directory.

### 5.2 Network Layer & Event Hub
The Application Implements A Global Event Bus To Handle Network States.
* **Event Hub**: `utils/eventHub.ts` Exports A Mitt-Based Emitter.
* **Axios Interceptors**: `plugins/axios.ts` Injects The Authorization Bearer Token From Local Storage And Emits Events For Loading States (`beforeRequest`, `afterResponse`).

### 5.3 State Management
Vuex Is Used To Modularize Application State In `src/store/`.
* **Auth Store**: Manages Session State And Permissions (`auth.ts`).
* **Admin Store**: Manages Product Lists And Reference Data (`admin.ts`).
* **Order Store**: Manages Order Lists And Detail Views (`orders.ts`).
* **Featured Store**: Manages UI Configuration (`featured.ts`).

## 6. API Endpoint Documentation

The Backend Exposes The Following RESTful Routes.

### 6.1 Authentication
* `POST /auth/login`: Authenticates Admin Users.
* `POST /auth/admin`: Creates New Admin Users (SuperAdmin Only).
* `POST /auth/resetPassword`: Handles Password Recovery.

### 6.2 Catalog
* `GET /catalog`: Retrieves Paginated Product Lists.
* `POST /catalog`: Creates A New Product With Images.
* `PUT /catalog/:id`: Updates Product Details.
* `DELETE /catalog/:id`: Removes A Product.

### 6.3 Orders
* `GET /orders`: Lists Orders Filtered By Status.
* `GET /orders/:id`: Retrieves Detailed Order Information.
* `PUT /orders/:id/status`: Updates Overall Order Status.
* `POST /orders/fulfill`: Marks Specific Items As Fulfilling.

### 6.4 Reference Data & UI
* `GET /referenceData/bundle`: Fetches All Dropdown Data (Roles, Stores, Categories).
* `POST /referenceData/categories`: Adds New Product Categories.
* `POST /referenceData/tariffs`: Adds New Tariff Configurations.
* `POST /ui/featured`: Updates Homepage Featured Sections.

## 7. Developer Setup Guide

Follow These Instructions To Initialize The Environment Locally.

1.  **Backend Initialization**:
    * Navigate To `Backend/`.
    * Execute `npm install`.
    * Execute `npm start`.
    * Verify Server Is Running On Port 3000.

2.  **Frontend Initialization**:
    * Navigate To `Frontend/`.
    * Execute `npm install`.
    * Execute `npm run dev`.
    * Open Browser To The Provided Localhost URL.

3.  **Database Inspection**:
    * The System Automatically Creates `Backend/database.sqlite`.
    * Use A SQLite Viewer To Inspect Tables And Verify Schema Synchronization.

### 7.3 Production Build & Optimization
For Production Deployment, The Frontend Must Be Compiled From Vue/TypeScript Into Static HTML, CSS, And JavaScript Assets.

1.  **Type Checking & Compilation**:
    * Command: `npm run build`.
    * **Process**: This Triggers `vue-tsc --build` To Perform A Strict Type Check. If Successful, It Runs `vite build`.
    * **Output**: Generates A `dist/` Directory Containing Optimized Assets.

2.  **Local Production Preview**:
    * Command: `npm run preview`.
    * **Function**: Boots Up A Local Static Server To Preview The Contents Of The `dist/` Folder.

## 8. Quality Assurance & Code Standards

The Frontend Enforces Code Quality Through Automated Tooling.

### 8.1 Static Analysis
* **Command**: `npm run lint`.
* **Configuration**: Governed By `eslint.config.ts`.
* **Rules**: Extends `@vue/eslint-config-typescript`.

## 9. Deployment Strategy & Architecture

For A Live Production Environment, The Following Architecture Is Recommended:

### 9.1 Backend Deployment
* **Process Manager**: Use PM2 To Manage The Node.js Process.
* **Environment**: Ensure Node.js Version 20+ Is Installed.
* **Security**: Ensure `config.js` Secrets Are Replaced With Secure Environment Variables.

### 9.2 Frontend Deployment
* **Static Serving**: The Contents Of `Frontend/dist` Should Be Served By Nginx Or Apache.
* **Reverse Proxy**: Configure The Web Server To Proxy `/auth`, `/catalog`, And `/orders` Requests To The Backend Service Port (3000).

## 10. Project Directory Map

A High-Level Overview Of The Critical File Structure.

```text
VeniqaManagement/
├── Backend/
│   ├── config/             # Configuration (config.js)
│   ├── controllers/        # Request Handlers (auth, catalog, order)
│   ├── database/           # Sequelize Models (models/index.js)
│   ├── middleware/         # Auth & Upload Middleware
│   ├── routes/             # API Route Definitions
│   ├── services/           # Business Logic
│   ├── index.js            # Entry Point
│   └── package.json        # Backend Dependencies
│
└── Frontend/
    ├── src/
    │   ├── assets/         # CSS & Images
    │   ├── components/     # Reusable UI (homepage, orders)
    │   ├── constants/      # API URL Mappings & Permissions
    │   ├── plugins/        # Axios Configuration
    │   ├── router/         # Vue Router Definitions
    │   ├── store/          # Vuex State Modules (admin, auth, orders)
    │   ├── views/          # Page Components (login, home, orderview)
    │   ├── App.vue         # Root Component
    │   └── main.ts         # Frontend Entry Point
    ├── vite.config.ts      # Build Config
    └── package.json        # Frontend Dependencies
```
