# Store App Frontend

Frontend React + TypeScript dopasowany do backendu `Darnoker/store-app` i komunikujący się wyłącznie przez `gateway-service`.

## Uruchomienie

1. Uruchom backend tak, aby gateway działał na `http://localhost:8080`.
2. W tym katalogu:

```bash
npm install
npm run dev
```

Frontend będzie dostępny pod `http://localhost:5173`.

W trybie developerskim requesty do `/api/*` są proxyowane przez Vite do `http://localhost:8080/*`, więc na tym etapie nie musisz zmieniać CORS w backendzie.

## Obsługiwane endpointy

- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `GET /products`
- `GET /products/{productId}`
- `POST /products` — panel ADMIN
- `POST /orders`
- `GET /orders/me`
- `GET /orders/{orderId}`

## Konfiguracja API

Domyślnie:

```env
VITE_API_BASE_URL=/api
```

Dla środowiska, w którym frontend ma bezpośrednio strzelać do publicznego gatewaya, ustaw np.:

```env
VITE_API_BASE_URL=https://api.example.com
```

## Uwaga o JWT

Token jest zapisywany w `localStorage` i dodawany jako `Authorization: Bearer ...`. To pasuje do aktualnego backendu. Później możesz zmienić ten mechanizm na bezpieczniejsze ciasteczko HttpOnly, jeśli backend dostanie taki flow.
