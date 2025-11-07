# 🏪 Inventory Management System & POS API

> A modern, type-safe backend API for managing inventory and point-of-sale operations across multiple shop locations.

This is a comprehensive **Inventory Management System (IMS)** with **Point of Sale (POS)** functionality, built with a robust tech stack:
- **Backend:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB
- **ORM:** Prisma

This API is designed for businesses managing multiple shop locations (e.g., a chain of drug shops), enabling Admins to manage:
- Users (attendants)
- Shop locations
- Products and inventory
- Sales and orders
- Suppliers and customers

## ✨ Core Features

### 🔐 Security & Access
- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (ADMIN, ATTENDANT)
  - Secure password recovery flow

### 👥 User & Shop Management
- **User Management**
  - Create and manage shop attendants
  - User roles and permissions
- **Shop Management**
  - Multiple shop locations
  - Location-based inventory

### 📦 Inventory & Products
- **Product Management**
  - Complex product relationships
  - Categories, Brands, Units
  - Stock tracking and alerts
- **Stock Management**
  - Stock purchases
  - Stock adjustments
  - Inventory alerts

### 💼 Business Operations
- **Point of Sale (POS)**
  - Order processing
  - Sales tracking
  - Customer management
- **Supplier Management**
  - Supplier profiles
  - Purchase orders
  - Stock procurement
- **Financial Tracking**
  - Expenses management
  - Sales reporting
  - Inventory reporting

## 🛠 Tech Stack

### Core Technologies
| Category | Technologies |
|----------|-------------|
| Backend | Node.js, Express.js |
| Language | TypeScript |
| Database | MongoDB |
| ORM | Prisma |

### Development Tools
| Tool | Purpose |
|------|----------|
| ts-node-dev | Live reload for development |
| tsc-alias & tsconfig-paths | Path mapping (@/* imports) |
| JWT + bcrypt | Authentication & password hashing |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment configuration |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- NPM or Yarn
- MongoDB (local or Atlas)

### Quick Start

1. **Clone and Install**
   ```bash
   # Clone the repository
   git clone <your-repository-url>
   cd <repository-name>

   # Install dependencies
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

   Configure your `.env` file:
   ```env
   # MongoDB connection string
   DATABASE_URL="mongodb+srv://<user>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"

   # JWT secret key (generate with: openssl rand -base64 32)
   SECRET_KEY="your-super-secret-key-here"

   # Server port
   PORT=3000
   ```

### Database Setup

```bash
# Push the schema to MongoDB
npx prisma db push

# (Optional) Open Prisma Studio to manage data
npx prisma studio
```

### Development Server

```bash
# Start the development server
npm run dev

# Server will be available at http://localhost:3000
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build production-ready code |
| `npm start` | Run production server |
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Update Prisma Client |
| `npx prisma db push` | Push schema changes to database |

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.