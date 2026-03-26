# MongoDB Atlas Complete Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Atlas Account & Cluster
1. Go to https://cloud.mongodb.com
2. Sign up/login
3. Click "Build a Database"
4. Choose **M0 Sandbox** (FREE)
5. **Cloud Provider**: AWS
6. **Region**: Mumbai (or closest to you)
7. **Cluster Name**: `blend-cluster`
8. Click "Create Cluster"

### Step 2: Create Database User
1. Go to "Database Access" tab
2. Click "Add New Database User"
3. **Username**: `blend-admin`
4. **Password**: `Blend123456!`
5. Click "Add User"

### Step 3: Network Access
1. Go to "Network Access" tab
2. Click "Add IP Address"
3. Select "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Go to "Database" tab
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

### Step 5: Update Railway Environment

Replace the connection string in Railway with:
```
mongodb+srv://blend-admin:Blend123456!@blend-cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority
```

## 🔧 Update Railway Variables

```bash
railway variables set MONGO_URI="mongodb+srv://blend-admin:Blend123456!@blend-cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority"
```

## 🎯 Seed Database

Once connected, run:
```bash
cd server
npm run seed
```

## ✅ Benefits
- ✅ Free 512MB storage
- ✅ Automatic backups
- ✅ Global CDN
- ✅ Production ready
- ✅ Perfect for BLEND Dessert & Co

## 🎉 Result
Your backend will be fully connected to MongoDB Atlas and ready for production!

The connection string will look like:
`mongodb+srv://blend-admin:Blend123456!@blend-cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority`
