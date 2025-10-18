#!/usr/bin/env node

/**
 * MongoDB Collection Initialization Script for Adal AI Community
 * 
 * This script creates the necessary MongoDB collections for authentication:
 * - users: User profiles and account information
 * - accounts: OAuth provider connections (Google, GitHub)
 * - sessions: Active user sessions
 * 
 * Run this script to set up your MongoDB collections with proper indexes.
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'adal-ai-community';

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set');
  console.log('Please add MONGODB_URI to your .env.local file');
  process.exit(1);
}

async function initializeCollections() {
  let client;
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    console.log(`✅ Connected to database: ${DB_NAME}`);
    
    // Create Users Collection
    console.log('\n📝 Creating users collection...');
    const usersCollection = db.collection('users');
    
    // Create indexes for users collection
    await usersCollection.createIndexes([
      { key: { email: 1 }, unique: true, name: 'email_unique' },
      { key: { provider: 1, providerId: 1 }, name: 'provider_compound' },
      { key: { createdAt: -1 }, name: 'created_desc' },
      { key: { isActive: 1 }, name: 'active_status' }
    ]);
    
    console.log('✅ Users collection created with indexes:');
    console.log('   - email (unique)');
    console.log('   - provider + providerId (compound)');
    console.log('   - createdAt (descending)');
    console.log('   - isActive');
    
    // Create Accounts Collection
    console.log('\n🔐 Creating accounts collection...');
    const accountsCollection = db.collection('accounts');
    
    // Create indexes for accounts collection
    await accountsCollection.createIndexes([
      { key: { userId: 1 }, name: 'user_id' },
      { key: { provider: 1, providerAccountId: 1 }, unique: true, name: 'provider_account_unique' },
      { key: { provider: 1 }, name: 'provider' }
    ]);
    
    console.log('✅ Accounts collection created with indexes:');
    console.log('   - userId');
    console.log('   - provider + providerAccountId (unique compound)');
    console.log('   - provider');
    
    // Create Sessions Collection
    console.log('\n🎫 Creating sessions collection...');
    const sessionsCollection = db.collection('sessions');
    
    // Create indexes for sessions collection
    await sessionsCollection.createIndexes([
      { key: { sessionToken: 1 }, unique: true, name: 'session_token_unique' },
      { key: { userId: 1 }, name: 'user_id' },
      { key: { expires: 1 }, expireAfterSeconds: 0, name: 'expires_ttl' }
    ]);
    
    console.log('✅ Sessions collection created with indexes:');
    console.log('   - sessionToken (unique)');
    console.log('   - userId');
    console.log('   - expires (TTL for automatic cleanup)');
    
    // Verify collections exist
    console.log('\n🔍 Verifying collections...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    const requiredCollections = ['users', 'accounts', 'sessions'];
    const missingCollections = requiredCollections.filter(name => !collectionNames.includes(name));
    
    if (missingCollections.length === 0) {
      console.log('✅ All required collections exist:');
      requiredCollections.forEach(name => {
        console.log(`   ✓ ${name}`);
      });
    } else {
      console.log('⚠️  Missing collections:', missingCollections);
    }
    
    // Show collection stats
    console.log('\n📊 Collection Statistics:');
    for (const collectionName of requiredCollections) {
      if (collectionNames.includes(collectionName)) {
        const stats = await db.collection(collectionName).stats();
        console.log(`   ${collectionName}:`);
        console.log(`     - Documents: ${stats.count || 0}`);
        console.log(`     - Indexes: ${stats.nindexes || 0}`);
        console.log(`     - Size: ${(stats.size || 0)} bytes`);
      }
    }
    
    console.log('\n🎉 MongoDB collections initialized successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start your Next.js application: npm run dev');
    console.log('2. Test authentication with Google or GitHub');
    console.log('3. Check your MongoDB database for new user records');
    
  } catch (error) {
    console.error('❌ Error initializing MongoDB collections:', error);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Troubleshooting:');
      console.log('- Check your MONGODB_URI in .env.local');
      console.log('- Ensure your MongoDB server is running');
      console.log('- Verify network connectivity to MongoDB');
    }
    
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

// Add sample data function
async function addSampleData() {
  let client;
  
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    
    console.log('\n🌱 Adding sample data...');
    
    // Check if sample user already exists
    const existingUser = await db.collection('users').findOne({ email: 'demo@adal.ai' });
    
    if (!existingUser) {
      // Create sample user
      const sampleUser = {
        name: 'Demo User',
        email: 'demo@adal.ai',
        image: '/placeholder-user.jpg',
        provider: 'credentials',
        providerId: 'demo-user-001',
        role: 'user',
        isActive: true,
        bio: 'Welcome to Adal AI Community! This is a demo account.',
        location: 'AI Community',
        website: 'https://adal.ai',
        modelsCreated: 0,
        datasetsShared: 0,
        spacesBuilt: 0,
        followers: 0,
        following: 0,
        preferences: {
          theme: 'system',
          notifications: true,
          emailUpdates: true
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.collection('users').insertOne(sampleUser);
      console.log('✅ Sample user created: demo@adal.ai');
    } else {
      console.log('ℹ️  Sample user already exists');
    }
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Adal AI Community - MongoDB Initialization');
  console.log('='.repeat(50));
  
  await initializeCollections();
  
  // Ask if user wants to add sample data
  const args = process.argv.slice(2);
  if (args.includes('--sample') || args.includes('-s')) {
    await addSampleData();
  }
  
  console.log('\n✨ Setup complete! Your MongoDB is ready for Adal AI Community.');
}

main().catch(console.error);