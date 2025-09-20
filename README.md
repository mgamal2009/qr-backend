# QR Backend

This is the backend service for the QR project.  
It provides authentication, task management, and API endpoints consumed by the frontend.

---

## 🚀 Tech Stack

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) (ORM for PostgreSQL)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) for authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing

---

## ⚙️ Setup

### 1. Clone repository

```bash
    git clone https://github.com/yourusername/qr-backend.git
    cd qr-backend
```

### 2. Install dependencies

```bash
    pnpm install
```

### 3. Setup environment variables

Create .env:

```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/qr_backend"
    JWT_SECRET="your-secret-key"
    PORT=4000
```

### 4. Setup database

Make sure you have PostgreSQL running and a database created.

Run migrations:

```bash
    npx prisma migrate dev --name init
    pnpm prisma generate
```

### 5. Run server

```bash
    pnpm dev
```

### 6. API Documentation

Register

POST /auth/register

Request Body:

```bash
    {
        "email": "test@example.com",
        "password": "securePassword123"
    }
```

Response:

```bash
    {
      "token": "jwt_token",
      "user": {
        "id": "uuid",
        "email": "test@example.com"
      }
    }
```

Login
POST /auth/login
Request Body:

```bash
    {
      "email": "test@example.com",
      "password": "securePassword123"
    }
```

Response:

```bash
    {
      "token": "jwt_token",
      "user": {
        "id": "uuid",
        "email": "test@example.com"
      }
    }
```

Get Current User
GET /auth/me
Headers:

```bash
    Authorization: Bearer jwt_token
```

Response:

```bash
    {
      "id": "uuid",
      "email": ""
    }
```

Forgot Password
POST /auth/forgot-password
Request Body:

```bash
    {
      "email": ""
    }
```

Response:

```bash
    {
      "message": "Password reset instructions sent to email"
    }
```

Get QR
GET /qr/current
Headers:

```bash
    Authorization: Bearer jwt_token
```

Response:

```bash
    {
      "uuid": "uuid",
      "expiresInSeconds": 3600
    }
```

📦 Dependencies

```bash
    express ^4.18.2
    prisma ^5.0.0
    @prisma/client ^6.16.2
    bcryptjs ^3.0.2
    jsonwebtoken ^9.0.0
    express-validator ^6.14.3
    dotenv ^16.0.0
```