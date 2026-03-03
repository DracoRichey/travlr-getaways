# Travlr Getaways

A full-stack travel booking web application built with the MEAN stack (MongoDB, Express, Angular, Node.js). The app supports two distinct frontend architectures — a server-rendered customer-facing site and an Angular SPA for administrative management.

![App Screenshot](travel.png)

## 🛠️ Tech Stack

- **MongoDB** — NoSQL document database for travel package data
- **Express** — Node.js web framework for REST API and routing
- **Angular** — Single Page Application (SPA) for the admin interface
- **Node.js** — Backend runtime environment
- **Handlebars** — Server-side templating for the customer-facing frontend
- **JWT** — JSON Web Token authentication for secured admin routes
- **Postman** — API testing and endpoint verification

## 🏗️ Architecture

The application uses two separate frontend approaches:

**Customer-facing site** — Built with Express, HTML/CSS, JavaScript, and Handlebars templates following a traditional MVC architecture. Pages are server-rendered and optimized for public browsing of travel packages.

**Admin SPA** — Built with Angular, communicating with the backend exclusively through RESTful API calls. Provides a responsive, dynamic interface for managing travel packages without full page reloads.

**Backend** — A RESTful API built with Node.js and Express, using MongoDB for flexible document-based data modeling of travel packages.

## 🔒 Security

- JWT authentication secures all administrative API routes
- Unauthorized requests are rejected; only valid token holders can access admin endpoints
- Verified using Postman with both authenticated and unauthenticated request testing

## ✨ Features

- Browse and view travel packages (customer frontend)
- Add, edit, and delete travel packages (admin SPA)
- Full CRUD operations via RESTful API endpoints
- MVC architecture with reusable Angular components
- JSON as the primary data interchange format between Angular and Express

## 🧪 Testing

- GET and POST endpoints tested via Postman for correct data retrieval and creation
- JWT-secured admin endpoints verified for proper authentication enforcement
- Functional testing conducted post-refactor to confirm no regressions

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB running locally or via Atlas

### Installation

```bash
git clone https://github.com/DracoRichey/travlr-getaways
cd travlr-getaways
npm install
```

### Running the App

```bash
npm start
```

Navigate to `http://localhost:3000` for the customer site.  
Navigate to `http://localhost:3000/admin` for the Angular admin SPA.

## 📁 Project Structure

```
├── app_server/          # Express MVC - customer-facing routes and controllers
├── app_api/             # RESTful API routes and controllers
├── app_admin/           # Angular SPA for admin interface
├── models/              # MongoDB/Mongoose data models
├── public/              # Static assets
└── app.js               # Main Express application entry point
```

> **Note:** Built as part of CS-465 (Full Stack Development) at Southern New Hampshire University.
