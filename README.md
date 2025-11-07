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

## 📊 Database Schema

Below is our comprehensive Prisma schema that defines the data models for the entire application. The schema is designed to support all core features while maintaining data integrity through relationships.

// This is your Prisma schema file,  
// learn more about it in the docs: \[<https://pris.ly/d/prisma-schema\>](<https://pris.ly/d/prisma-schema>)  
<br/>generator client {  
provider = "prisma-client-js"  
}  
<br/>datasource db {  
provider = "mongodb"  
url = env("DATABASE_URL")  
}  
<br/>// --- ENUMS ---  
<br/>enum Gender {  
MALE  
FEMALE  
}  
<br/>enum Role {  
ADMIN  
ATTENDANT  
}  
<br/>enum CustomerType {  
RETAIL  
WHOLESALE  
DISTRIBUTOR  
OTHER  
}  
<br/>enum SupplierType {  
MANUFACTURER  
DISTRIBUTOR  
WHOLESALER  
RETAILER  
OTHER  
}  
<br/>enum NotificationStatus {  
WARNING  
DANGER  
INFO  
}  
<br/>enum PurchaseOrderStatus {  
PENDING  
PAID  
CANCELLED  
}  
<br/>enum OrderStatus {  
PENDING  
DELIVERED  
CANCELLED  
}  
<br/>// --- MODELS ---  
<br/>model User {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
email String @unique  
username String @unique  
password String  
firstName String  
lastName String  
phone String @unique  
dob DateTime?  
gender Gender  
image String?  
role Role @default(ATTENDANT)  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: An Admin user can manage many shops  
shops Shop\[\]  
<br/>// Password Reset Fields  
resetToken String?  
resetTokenExpiry DateTime?  
}  
<br/>model Shop {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
name String  
location String  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation to the Admin  
adminId String @db.ObjectId  
admin User @relation(fields: \[adminId\], references: \[id\])  
<br/>// Relation to Attendants (Store as array of User IDs)  
attendantIds String\[\] @db.ObjectId  
}  
<br/>model Customer {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
customerType CustomerType  
firstName String  
lastName String  
phone String @unique  
gender Gender  
maxCreditLimit Float  
maxCreditDays Int  
taxPin String?  
dob DateTime?  
email String? @unique  
nationalID String? @unique  
country String  
location String  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
}  
<br/>model Supplier {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
supplierType SupplierType  
name String  
contactPerson String  
phone String @unique  
email String? @unique  
location String  
country String  
website String?  
taxPin String?  
registrationNumber String? @unique  
bankAccountNumber String?  
bankName String?  
paymentTerms String  
logo String? @default("\[<https://example.com/default-logo.png\>](<https://example.com/default-logo.png>)")  
rating Float?  
notes String?  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: A Supplier provides many Products  
products Product\[\]  
// Relation: A Supplier has many PurchaseOrders  
purchaseOrders PurchaseOrder\[\]  
}  
<br/>model Unit {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
name String  
abbreviation String  
slug String @unique  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: A Unit is used by many Products  
products Product\[\]  
}  
<br/>model Brand {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
name String  
slug String @unique  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: A Brand is used by many Products  
products Product\[\]  
}  
<br/>model Category {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
name String  
slug String @unique  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: A Category is used by many Products  
products Product\[\]  
}  
<br/>model Product {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
name String  
sku String @unique  
productCode String  
slug String @unique  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// --- Relationships ---  
supplierId String @db.ObjectId  
supplier Supplier @relation(fields: \[supplierId\], references: \[id\])  
<br/>unitId String @db.ObjectId  
unit Unit @relation(fields: \[unitId\], references: \[id\])  
<br/>brandId String @db.ObjectId  
brand Brand @relation(fields: \[brandId\], references: \[id\])  
<br/>categoryId String @db.ObjectId  
category Category @relation(fields: \[categoryId\], references: \[id\])  
<br/>// Relation: Product is in many OrderItems  
orderItems OrderItem\[\]  
// Relation: Product is in many Sales  
sales Sale\[\]  
// Relation: Product is in many AdjustmentItems  
adjustmentItems AdjustmentItem\[\]  
// Relation: Product is in many PurchaseOrderItems  
purchaseOrderItems PurchaseOrderItem\[\]  
}  
<br/>model Order {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
customerId String @db.ObjectId  
customerName String  
orderNumber String @unique  
customerEmail String?  
orderAmount Int  
orderType String?  
status OrderStatus @default(DELIVERED)  
paymentMethod String  
transactionCode String?  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relation: An Order has many OrderItems  
orderItems OrderItem\[\]  
// Relation: An Order can result in many Sales  
sales Sale\[\]  
}  
<br/>model OrderItem {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
productId String @db.ObjectId  
orderId String @db.ObjectId  
name String  
price Float  
qty Int  
productThumbnail String  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
product Product @relation(fields: \[productId\], references: \[id\])  
order Order @relation(fields: \[orderId\], references: \[id\])  
}  
<br/>model Sale {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
orderId String @db.ObjectId  
productId String @db.ObjectId  
qty Int  
salePrice Float  
productName String  
productImage String  
customerName String  
customerEmail String?  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
product Product @relation(fields: \[productId\], references: \[id\])  
order Order @relation(fields: \[orderId\], references: \[id\])  
}  
<br/>model PurchaseOrder {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
supplierId String @db.ObjectId  
status PurchaseOrderStatus @default(PAID)  
discount Int?  
notes String?  
tax Int?  
refNo String  
totalAmount Int  
balanceAmount Int  
shippingCost Int?  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
supplier Supplier @relation(fields: \[supplierId\], references: \[id\])  
items PurchaseOrderItem\[\]  
}  
<br/>model PurchaseOrderItem {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
purchaseOrderId String @db.ObjectId  
productId String @db.ObjectId  
quantity Int  
productName String  
unitCost Int  
subTotal Int  
currentStock Int  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
purchaseOrder PurchaseOrder @relation(fields: \[purchaseOrderId\], references: \[id\])  
product Product @relation(fields: \[productId\], references: \[id\])  
}  
<br/>model Adjustment {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
refNo String @unique @default("AAAAB")  
reason String  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
items AdjustmentItem\[\]  
}  
<br/>model AdjustmentItem {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
adjustmentId String @db.ObjectId  
productId String @db.ObjectId  
quantity Int  
type String // e.g., "ADDITION" or "SUBTRACTION"  
currentStock Int  
productName String  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
<br/>// Relationships  
adjustment Adjustment @relation(fields: \[adjustmentId\], references: \[id\])  
product Product @relation(fields: \[adjustmentId\], references: \[id\]) // <-- Likely a typo in PPT, should be productId  
// Corrected relation:  
// product Product @relation(fields: \[productId\], references: \[id\])  
}  
<br/>model Notification {  
id String @id @default(auto()) @map("\_id") @db.ObjectId  
message String  
status NotificationStatus @default(WARNING)  
statusText String  
read Boolean @default(false)  
createdAt DateTime @default(now())  
updatedAt DateTime @updatedAt  
}  

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.