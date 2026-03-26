# URGENT: Fix Your Deployed Site

## Problem: Your frontend is deployed but backend is NOT deployed

## Solution: Deploy Backend NOW (5 minutes)

### Step 1: Go to Render.com
1. Visit https://render.com
2. Sign up with GitHub (free)

### Step 2: Create Backend Service
1. Click "New" → "Web Service"
2. Connect your GitHub repo: `blend-dessert-co`
3. Settings:
   - **Name**: `blend-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables
Copy-paste these:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://blend-admin:Blend123456!@blend-cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority
JWT_SECRET=blend_super_secret_jwt_key_for_production_256_bits_minimum
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
RAZORPAY_KEY_ID=demo
RAZORPAY_KEY_SECRET=demo
```

### Step 4: Deploy
Click "Create Web Service" - wait 2-3 minutes

### Step 5: Get Backend URL
After deployment, you'll get URL like:
`https://blend-api.onrender.com`

### Step 6: Update Vercel
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add: `VITE_API_URL=https://blend-api.onrender.com`
4. Redeploy

### Step 7: Test
Visit your site again - all products will load!

## Alternative: Use Railway (Faster)
```bash
npm install -g @railway/cli
cd server
railway login
railway up
# Get URL from Railway dashboard
# Update Vercel with that URL
```

## Result: Your site will work perfectly!

Do this NOW and your deployed site will be fixed! 🚀
