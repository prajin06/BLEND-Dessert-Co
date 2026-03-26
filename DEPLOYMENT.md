# BLEND Dessert & Co - Deployment Guide

## Overview
This guide will help you deploy the BLEND Dessert & Co full-stack application to production.

## Architecture
- **Frontend**: React + Vite (Deployed to Vercel/Netlify)
- **Backend**: Node.js + Express (Deployed to Render/Heroku)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

## Deployment Options

### Option 1: Render + Vercel (Recommended)

#### Backend Deployment (Render)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` directory as root
   - Use these settings:
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Environment Variables** (in Render dashboard)
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd client
   vercel --prod
   ```

3. **Environment Variables** (in Vercel dashboard)
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### Option 2: Netlify + Render

1. **Backend**: Follow Render steps above
2. **Frontend**: 
   - Push to GitHub
   - Connect repository to Netlify
   - Use `netlify.toml` configuration

### Option 3: Railway (All-in-One)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free cluster (M0)
   - Choose region closest to your users

2. **Configure Network Access**
   - Add IP: `0.0.0.0/0` (allows all access)
   - Or add specific deployment IPs

3. **Create Database User**
   - Username: `blend-admin`
   - Password: Generate strong password
   - Permissions: Read and Write

4. **Get Connection String**
   ```
   mongodb+srv://blend-admin:password@cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority
   ```

## Cloudinary Setup

1. **Create Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free tier

2. **Get Credentials**
   - Dashboard → Cloud Name
   - Account → API Keys
   - Account → API Secret

## Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blend-dessert-co
JWT_SECRET=your_super_secret_key_256_bits_long
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Pre-deployment Checklist

### Backend
- [ ] All dependencies in package.json
- [ ] Start command uses `npm start`
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Error handling implemented
- [ ] CORS configured for frontend domain

### Frontend
- [ ] Build process tested (`npm run build`)
- [ ] Environment variables set
- [ ] API URL configured for production
- [ ] Router configured for SPA
- [ ] Assets optimized

## Deployment Commands

### Test Build Locally
```bash
# Backend
cd server
npm install
npm start

# Frontend
cd client
npm run build
npm run preview
```

### Production Deployment
```bash
# Backend to Render
git push origin main  # Auto-deploys if connected

# Frontend to Vercel
cd client
vercel --prod
```

## Post-deployment Testing

1. **Backend Health Check**
   - Visit `https://your-backend.onrender.com/`
   - Should see: `{"message": "BLEND Dessert & Co API is running 🍰"}`

2. **Frontend Functionality**
   - Visit `https://your-frontend.vercel.app`
   - Test product browsing
   - Test user registration/login
   - Test cart functionality
   - Test admin dashboard

3. **API Endpoints**
   ```bash
   # Test products
   curl https://your-backend.onrender.com/api/products
   
   # Test auth
   curl -X POST https://your-backend.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","password":"123456"}'
   ```

## Monitoring and Maintenance

### Render (Backend)
- Auto-deploys on git push
- Logs available in dashboard
- Metrics and monitoring built-in
- Free tier: 750 hours/month

### Vercel (Frontend)
- Auto-deploys on git push
- Analytics and performance metrics
- Edge caching globally
- Free tier: 100GB bandwidth/month

### MongoDB Atlas
- Real-time performance metrics
- Automated backups
- Free tier: 512MB storage

## Troubleshooting

### Common Issues

1. **CORS Errors**
   ```javascript
   // In server.js, add your frontend domain
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:3000']
   }));
   ```

2. **Database Connection**
   - Check MongoDB Atlas IP whitelist
   - Verify connection string format
   - Ensure database user has correct permissions

3. **Environment Variables**
   - Double-check spelling and formatting
   - Ensure no trailing spaces
   - Verify secrets are correct

4. **Build Failures**
   - Check package.json scripts
   - Verify all dependencies are installed
   - Review build logs for specific errors

### Performance Optimization

1. **Backend**
   - Enable gzip compression
   - Implement caching headers
   - Use MongoDB indexes

2. **Frontend**
   - Enable code splitting
   - Optimize images
   - Use lazy loading

## Cost Summary (Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| Render (Backend) | Free | 750 hours/month, 512MB RAM |
| Vercel (Frontend) | Free | 100GB bandwidth, 100 builds/month |
| MongoDB Atlas | Free | 512MB storage |
| Cloudinary | Free | 25GB storage, 25GB bandwidth/month |

**Total Monthly Cost: $0** (within free tier limits)

## Next Steps

1. **Deploy to staging** first
2. **Test thoroughly** before production
3. **Set up monitoring** alerts
4. **Configure custom domains**
5. **Set up SSL certificates** (auto-provided)
6. **Backup strategy** for database

Your BLEND Dessert & Co application will be live and ready for customers!
