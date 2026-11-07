# Product Management System

A full-stack Product Management application built with ASP.NET Core Web API and React. The application provides RESTful endpoints for managing products, with a React frontend consuming the backend API.

## Technologies Used

### Backend
- C#
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server
- Clean Architecture

### Frontend
- React
- TypeScript
- Vite

## Project Structure

```text
LuftbornProductManagement/
│
├── Backend/
│   ├── ProductManagement.Api/
│   ├── ProductManagement.Application/
│   ├── ProductManagement.Domain/
│   ├── ProductManagement.Infrastructure/
│   └── LuftbornProductManagement.sln
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Backend API

The backend exposes RESTful endpoints under the following route:

`/api/products`

### Available Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/{id}` | Retrieve a product by its ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/{id}` | Update an existing product |
| DELETE | `/api/products/{id}` | Delete a product |

### Response Status Codes

| Status Code | Description |
|---|---|
| 200 OK | Request completed successfully |
| 201 Created | Product created successfully |
| 204 No Content | Product updated or deleted successfully |
| 404 Not Found | Product does not exist |

The API uses DTOs to handle product data:
- `CreateProductDto` – used when creating a product.
- `UpdateProductDto` – used when updating a product.
- `ProductDto` – used to return product information.

## Getting Started

### Prerequisites

- .NET 8 SDK
- SQL Server
- Node.js and npm

### 1. Run the Backend

1. Open `Backend/LuftbornProductManagement.sln` in Visual Studio.
2. Configure the SQL Server connection string in the API configuration.
3. Apply the database migrations if required.
4. Run the `ProductManagement.Api` project.

The API will be available at the local URL configured in the project's launch settings.

### 2. Run the Frontend

Open a terminal in the `Frontend` directory and run:

```bash
npm install
npm run dev
```

Vite will start the frontend development server and display its local URL in the terminal.

## Notes

- The frontend communicates with the backend through HTTP API requests.
- Make sure the backend is running and the frontend API configuration points to the correct backend URL.
- Database configuration should be set locally and should not contain committed credentials or secrets.