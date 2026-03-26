# MongoDB Atlas Connection Setup

## Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com
2. Sign up for free account
3. Verify your email

## Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose **M0 Sandbox** (Free)
3. Select cloud provider and region (choose closest to you)
4. Cluster name: `blend-cluster`
5. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access" tab
2. Click "Add New Database User"
3. Username: `blend-admin`
4. Password: `Blend123456!`
5. Click "Add User"

## Step 4: Whititelist IP Address
1. Go to "Network Access" tab
2. Click "Add IP Address"
3. Select "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" tab
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Your .env File
Replace the connection string with your actual one:

```
MONGO_URI=mongodb+srv://blend-admin:Blend123456!@blend-cluster.mongodb.net/blend-dessert-co?retryWrites=true&w=majority
```

## Step 7: Test Connection
1. Restart your backend server
2. You should see: `MongoDB Connected: blend-cluster.mongodb.net`

## Step 8: Seed Database
Run the seeder to populate with products:
```bash
cd server
npm run seed
```

## Benefits of MongoDB Atlas:
- ✅ Free 512MB storage
- ✅ Automatic backups
- ✅ Global CDN
- ✅ Easy to scale
- ✅ Perfect for production

Your backend will now be connected to a cloud database!
