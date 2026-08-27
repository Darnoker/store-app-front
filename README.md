# Store App Frontend

React + TypeScript frontend for the `Darnoker/store-app` backend, communicating exclusively through the `gateway-service`.

## Getting started

1. Start the backend so that the gateway is available at `http://localhost:8080`.
2. In this directory, run:

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

In development mode, Vite proxies requests to `/api/*` to `http://localhost:8080/*`, so you do not need to change the backend CORS configuration at this stage.

## Supported endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `GET /products`
- `GET /products/{productId}`
- `POST /products` — ADMIN panel
- `POST /orders`
- `GET /orders/me`
- `GET /orders/{orderId}`

## API configuration

By default:

```env
VITE_API_BASE_URL=/api
```

For an environment where the frontend should call a public gateway directly, set for example:

```env
VITE_API_BASE_URL=https://api.example.com
```

## JWT note

The token is stored in `localStorage` and sent as `Authorization: Bearer ...`. This matches the current backend. You can later replace this mechanism with a more secure HttpOnly cookie if the backend supports that flow.
