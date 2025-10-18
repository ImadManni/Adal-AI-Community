# 🗄️ MongoDB Setup Guide for Adal AI Community

This guide will help you set up MongoDB collections for your Adal AI Community authentication system.

## 📋 Required Collections

Your application needs these 3 MongoDB collections:

1. **`users`** - User profiles and account information
2. **`accounts`** - OAuth provider connections (Google, GitHub)  
3. **`sessions`** - Active user sessions

## 🚀 Quick Setup

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your MongoDB connection details:
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/adal-ai-community
   
   # OR for MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adal-ai-community
   
   # Add your OAuth credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   
   # NextAuth secret
   NEXTAUTH_SECRET=your-secret-key-here
   ```

### Step 2: Install Dependencies

Make sure you have the required dependencies:
```bash
npm install mongodb dotenv
# or
pnpm install mongodb dotenv
```

### Step 3: Initialize Collections

Run the initialization script to create collections with proper indexes:

```bash
# Initialize collections only
npm run db:init

# Initialize collections with sample data
npm run db:sample
```

### Step 4: Verify Setup

Verify that everything is working correctly:

```bash
npm run db:verify
```

## 📊 Collection Schemas

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  image: String,
  provider: String, // 'google', 'github', 'credentials'
  providerId: String,
  role: String, // 'user', 'admin', 'moderator'
  isActive: Boolean,
  bio: String,
  location: String,
  website: String,
  github: String,
  twitter: String,
  linkedin: String,
  modelsCreated: Number,
  datasetsShared: Number,
  spacesBuilt: Number,
  followers: Number,
  following: Number,
  preferences: {
    theme: String, // 'light', 'dark', 'system'
    notifications: Boolean,
    emailUpdates: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Accounts Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  type: String,
  provider: String, // 'google', 'github'
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Sessions Collection
```javascript
{
  _id: ObjectId,
  sessionToken: String (unique),
  userId: String,
  expires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔍 Indexes Created

The initialization script creates these indexes for optimal performance:

### Users Collection
- `email` (unique)
- `provider + providerId` (compound)
- `createdAt` (descending)
- `isActive`

### Accounts Collection
- `userId`
- `provider + providerAccountId` (unique compound)
- `provider`

### Sessions Collection
- `sessionToken` (unique)
- `userId`
- `expires` (TTL for automatic cleanup)

## 🧪 Testing Your Setup

1. **Start your application:**
   ```bash
   npm run dev
   ```

2. **Test authentication:**
   - Visit `http://localhost:3000`
   - Try signing in with Google or GitHub
   - Check your MongoDB collections for new records

3. **Monitor collections:**
   ```bash
   # Verify collections exist and have data
   npm run db:verify
   ```

## 🛠️ Manual Collection Creation

If you prefer to create collections manually, you can use MongoDB Compass or the MongoDB shell:

```javascript
// Connect to your database
use adal-ai-community

// Create users collection with indexes
db.createCollection("users")
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "provider": 1, "providerId": 1 })
db.users.createIndex({ "createdAt": -1 })
db.users.createIndex({ "isActive": 1 })

// Create accounts collection with indexes
db.createCollection("accounts")
db.accounts.createIndex({ "userId": 1 })
db.accounts.createIndex({ "provider": 1, "providerAccountId": 1 }, { unique: true })
db.accounts.createIndex({ "provider": 1 })

// Create sessions collection with indexes
db.createCollection("sessions")
db.sessions.createIndex({ "sessionToken": 1 }, { unique: true })
db.sessions.createIndex({ "userId": 1 })
db.sessions.createIndex({ "expires": 1 }, { expireAfterSeconds: 0 })
```

## 🔧 Troubleshooting

### Connection Issues
- Verify your `MONGODB_URI` in `.env.local`
- Ensure MongoDB server is running (for local installations)
- Check network connectivity for MongoDB Atlas

### Permission Issues
- Ensure your MongoDB user has read/write permissions
- For MongoDB Atlas, check IP whitelist settings

### Index Creation Failures
- Check if collections already exist with conflicting data
- Ensure unique constraints are not violated

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth.js MongoDB Adapter](https://next-auth.js.org/adapters/mongodb)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🎉 Success!

Once setup is complete, your Adal AI Community will have:
- ✅ Proper MongoDB collections
- ✅ Optimized indexes for performance
- ✅ OAuth authentication ready
- ✅ User session management
- ✅ Scalable database structure

Your authentication system is now ready to handle user registrations, logins, and session management!