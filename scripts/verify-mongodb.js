#!/usr/bin/env node

/**
 * MongoDB Verification Script for Adal AI Community
 * 
 * This script verifies that your MongoDB collections are properly set up
 * and tests the connection to ensure everything is working correctly.
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'adal-ai-community';

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set');
  process.exit(1);
}

async function verifyMongoDB() {
  let client;
  
  try {
    console.log('🔍 Verifying MongoDB setup for Adal AI Community...');
    console.log('='.repeat(60));
    
    // Test connection
    console.log('\n1. Testing MongoDB connection...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db(DB_NAME);
    console.log(`✅ Connected to database: ${DB_NAME}`);
    
    // Check collections
    console.log('\n2. Checking required collections...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    const requiredCollections = ['users', 'accounts', 'sessions'];
    const results = {};
    
    for (const collectionName of requiredCollections) {
      const exists = collectionNames.includes(collectionName);
      results[collectionName] = exists;
      
      if (exists) {
        console.log(`✅ ${collectionName} collection exists`);
      } else {
        console.log(`❌ ${collectionName} collection missing`);
      }
    }
    
    // Check indexes
    console.log('\n3. Verifying collection indexes...');
    
    for (const collectionName of requiredCollections) {
      if (results[collectionName]) {
        const collection = db.collection(collectionName);
        const indexes = await collection.indexes();
        
        console.log(`\n   ${collectionName} indexes (${indexes.length}):`);
        indexes.forEach(index => {
          const keys = Object.keys(index.key).join(', ');
          const unique = index.unique ? ' (unique)' : '';
          const ttl = index.expireAfterSeconds !== undefined ? ' (TTL)' : '';
          console.log(`     - ${index.name}: ${keys}${unique}${ttl}`);
        });
      }
    }
    
    // Collection statistics
    console.log('\n4. Collection statistics...');
    for (const collectionName of requiredCollections) {
      if (results[collectionName]) {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`   ${collectionName}: ${count} documents`);
      }
    }
    
    // Test basic operations
    console.log('\n5. Testing basic operations...');
    
    // Test user operations
    const usersCollection = db.collection('users');
    const testUser = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      provider: 'test',
      providerId: `test-${Date.now()}`,
      role: 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert test user
    const insertResult = await usersCollection.insertOne(testUser);
    console.log('✅ Test user insert successful');
    
    // Find test user
    const foundUser = await usersCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Test user query successful');
    
    // Update test user
    await usersCollection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { updatedAt: new Date() } }
    );
    console.log('✅ Test user update successful');
    
    // Delete test user
    await usersCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test user deletion successful');
    
    // Overall status
    console.log('\n' + '='.repeat(60));
    const allCollectionsExist = Object.values(results).every(exists => exists);
    
    if (allCollectionsExist) {
      console.log('🎉 MongoDB setup verification PASSED!');
      console.log('\n✅ All systems ready:');
      console.log('   - MongoDB connection: Working');
      console.log('   - Required collections: Present');
      console.log('   - Indexes: Configured');
      console.log('   - Basic operations: Functional');
      
      console.log('\n🚀 Your Adal AI Community database is ready!');
      console.log('\nNext steps:');
      console.log('1. Start your application: npm run dev');
      console.log('2. Test user registration/login');
      console.log('3. Monitor your MongoDB collections for new data');
      
    } else {
      console.log('❌ MongoDB setup verification FAILED!');
      console.log('\n🔧 Issues found:');
      
      const missingCollections = Object.entries(results)
        .filter(([name, exists]) => !exists)
        .map(([name]) => name);
        
      if (missingCollections.length > 0) {
        console.log(`   - Missing collections: ${missingCollections.join(', ')}`);
        console.log('\n💡 To fix: Run the initialization script:');
        console.log('   node scripts/init-mongodb.js');
      }
    }
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Connection troubleshooting:');
      console.log('- Verify MONGODB_URI in .env.local');
      console.log('- Check if MongoDB server is running');
      console.log('- Test network connectivity');
    }
    
    process.exit(1);
    
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

verifyMongoDB().catch(console.error);