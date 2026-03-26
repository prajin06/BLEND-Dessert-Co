# Backend Deployment - Quick Guide

## Step 1: Go to Render.com
1. Visit https://render.com
2. Sign up/login with GitHub

## Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Select the repository: `blend-dessert-co`

## Step 3: Configure Settings
- **Name**: `blend-dessert-co-api`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

## Step 4: Add Environment Variables
Add these in the "Environment" section:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://blend-admin:blend12345@cluster0.mongodb.net/blend-dessert-co?retryWrites=true&w=majority
JWT_SECRET=blend_super_secret_jwt_key_for_production_256_bits_long_minimum
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
RAZORPAY_KEY_ID=demo
RAZORPAY_KEY_SECRET=demo
```

## Step 5: Deploy
Click "Create Web Service" - it will automatically deploy!

## Step 6: Get Your Backend URL
After deployment, Render will give you a URL like:
`https://blend-dessert-co-api.onrender.com`

## Step 7: Update Frontend
1. Go to your Vercel project settings
2. Add Environment Variable:
   ```
   VITE_API_URL=https://blend-dessert-co-api.onrender.com
   ```
3. Redeploy your frontend

## That's it! Your site will work!

### Alternative: Use MongoDB Atlas Free Tier
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Replace MONGO_URI above with your actual connection string

### Test Your Backend
Visit your backend URL, you should see:
`{"message": "BLEND Dessert & Co API is running 🍰"}`
