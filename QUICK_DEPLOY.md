# Quick Deploy Backend to Fix Connection

## Step 1: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set these settings:
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

## Step 2: Set Environment Variables in Render

Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/blend-dessert-co
JWT_SECRET=your_super_secret_key_make_it_long_and_random
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Step 3: Update Vercel Environment Variables

In your Vercel dashboard:
1. Go to your project settings
2. Add environment variable:
   ```
   VITE_API_URL=https://your-app-name.onrender.com
   ```
3. Redeploy your frontend

## Step 4: Test

After deployment, visit your Vercel site and it should show products!

## Alternative: Use Railway (Faster)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend only
cd server
railway init
railway up

# Get your backend URL from Railway dashboard
# Update Vercel env var with that URL
```

The backend URL will look like: `https://your-app-name.up.railway.app`
