# BLEND Dessert & Co 🍰

A premium full-stack dessert ordering web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **JWT Authentication** with role-based access (Admin/User)
- **Product Catalog** with 50+ real menu items from BLEND Dessert & Co
- **Search, Filter & Sort** with category tabs and pagination
- **Cart System** with localStorage persistence, quantity controls
- **Coupon Code System** (try: BLEND20, FIRST50, SWEET10)
- **Wishlist** functionality
- **Order Management** with status tracking
- **Admin Dashboard** with sales analytics, product CRUD, order management
- **Dark/Light Mode** toggle
- **Glassmorphism UI** with Framer Motion animations
- **Fully Responsive** mobile-first design
- **Image Upload** via Cloudinary
- **Payment UI** for COD, Razorpay, UPI

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Hot Toast, React Icons

**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT, Bcrypt, Multer + Cloudinary

## Project Structure

```
blend-dessert-co/
├── server/                 # Backend
│   ├── config/db.js
│   ├── controllers/        # authController, productController, orderController, userController, couponController
│   ├── middleware/          # auth.js, errorHandler.js, upload.js
│   ├── models/             # User, Product, Order, Coupon
│   ├── routes/             # authRoutes, productRoutes, orderRoutes, userRoutes, couponRoutes, uploadRoutes
│   ├── seed.js             # Database seeder with real menu data
│   ├── server.js           # Entry point
│   └── .env.example
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard, LoadingSkeleton, ProtectedRoute, AdminRoute
│   │   ├── context/        # AuthContext, CartContext, ThemeContext
│   │   ├── pages/          # Home, Menu, ProductDetail, Cart, Checkout, Login, Register, Profile, Wishlist
│   │   │   └── admin/      # AdminDashboard, AdminProducts, AdminOrders
│   │   ├── services/api.js
│   │   ├── utils/constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# In /server, create .env from example
cp .env.example .env
```

Edit `.env` with your values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blend-dessert-co
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This populates:
- 50+ products from the actual BLEND menu
- 3 coupon codes (BLEND20, FIRST50, SWEET10)
- Admin user: `admin@blend.com` / `admin123`

### 4. Run the Application

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## API Endpoints

**Auth:** POST `/api/auth/register`, POST `/api/auth/login`, GET `/api/auth/me`

**Products:** GET `/api/products`, GET `/api/products/featured`, GET `/api/products/categories`, GET `/api/products/:id`, POST/PUT/DELETE (admin)

**Orders:** POST `/api/orders`, GET `/api/orders/my`, GET `/api/orders/analytics` (admin), PUT `/api/orders/:id/status` (admin)

**Users:** PUT `/api/users/profile`, GET/PUT `/api/users/wishlist`, GET `/api/users` (admin)

**Coupons:** POST `/api/coupons/validate`, CRUD (admin)

## Design Theme

- **Primary:** Pastel Pink (#FF8FA3)
- **Secondary:** Cream (#FFF1E6)
- **Accent:** Chocolate Brown (#5A3E36)
- **Font:** Poppins

## Contact

BLEND Dessert & Co
30, Nadi Complex, M.C. Road, Thanjavur - 613 007
Phone: 96777 71981 | Instagram: @BLENDTNJ
