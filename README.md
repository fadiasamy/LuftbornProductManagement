# Product Management System

A full-stack Product Management application built using ASP.NET Core Web API, Entity Framework Core, SQL Server, React, and TypeScript.

The application provides product management functionality through a RESTful API and a responsive user interface.

## Technologies Used

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server
- C#
- LINQ
- Clean Architecture
- Repository Pattern
- Service Layer
- DTOs (Data Transfer Objects)
- Asynchronous Programming
- Global Exception Handling Middleware

### Frontend
- React
- TypeScript
- Vite
- SCSS
- Fetch API

## Project Structure

```text
LuftbornProductManagement/
│
├── Backend/
│   ├── ProductManagement.Api/
│   ├── ProductManagement.Application/
│   ├── ProductManagement.Domain/
│   ├── ProductManagement.Infrastructure/
│   └── ProductManagement.sln
│
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## Features

### Backend
- Create, retrieve, update, and delete products (CRUD).
- RESTful API endpoints.
- Pagination with configurable page number and page size.
- Input validation for pagination parameters.
- Entity Framework Core for database operations.
- Repository and Service patterns for separation of concerns.
- DTOs to control data exposed to the client.
- Asynchronous database operations.
- Global exception handling middleware.
- SQL Server database integration.

### Frontend
- Display products in a table.
- Add new products.
- Edit existing products.
- Delete products.
- Search products.
- Loading and error handling.
- Success and error notifications.
- Integration with the backend API.

## Prerequisites

Make sure you have the following installed:

- .NET 8 SDK
- SQL Server
- Node.js and npm
- Visual Studio 2022 or Visual Studio Code

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/fadiasamy/LuftbornProductManagement.git
```

### 2. Backend Setup

Navigate to the Backend directory:

```bash
cd Backend
```

Open the solution:

```text
ProductManagement.sln
```

Configure the SQL Server connection string in:

```text
ProductManagement.Api/appsettings.json
```

Update the connection string according to your local SQL Server configuration.

Apply Entity Framework Core migrations:

```bash
dotnet ef database update --project ProductManagement.Infrastructure --startup-project ProductManagement.Api
```

Run the API:

```bash
dotnet run --project ProductManagement.Api
```

The API will be available at the configured HTTP/HTTPS addresses.

Swagger UI is enabled in the Development environment.

### 3. Frontend Setup

Open a new terminal and navigate to the Frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## API Endpoints

Base route: `/api/Products`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/Products` | Get paginated products |
| GET | `/api/Products/{id}` | Get product by ID |
| POST | `/api/Products` | Create a new product |
| PUT | `/api/Products/{id}` | Update an existing product |
| DELETE | `/api/Products/{id}` | Delete a product |

### Pagination

The products endpoint supports pagination through query parameters.

Example:

```http
GET /api/Products?pageNumber=1&pageSize=10
```

Parameters:

- `pageNumber`: The requested page number (default: 1).
- `pageSize`: Number of products per page (default: 5, maximum: 100).

Example response:

```json
{
  "items": [],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 25,
  "totalPages": 3
}
```

## Architecture

The backend follows Clean Architecture principles:

- **Domain:** Contains core business entities and domain logic.
- **Application:** Contains DTOs, interfaces, and application services.
- **Infrastructure:** Handles database access, Entity Framework Core, and repository implementations.
- **API:** Exposes REST endpoints and handles HTTP requests.

This structure promotes separation of concerns, maintainability, and testability.

## Error Handling

The backend uses global exception handling middleware to handle unexpected errors and return consistent API error responses.

## Author

**Fadia Samy**

GitHub: [fadiasamy](https://github.com/fadiasamy)
