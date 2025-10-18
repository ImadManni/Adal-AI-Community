#!/usr/bin/env ts-node

/**
 * Database Initialization Script
 * 
 * This script initializes the MongoDB collections for the Adal AI Community platform:
 * - users: User profiles with authentication and platform data
 * - accounts: OAuth provider connections (Google, GitHub)
 * - sessions: Active user sessions for NextAuth
 * 
 * Run this script to ensure your MongoDB database has the proper collections
 * with indexes and validation rules set up.
 */

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import User from '../models/User'
import Account from '../models/Account'
import Session from '../models/Session'

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing MongoDB database...')
    
    // Connect to MongoDB
    await connectDB()
    console.log('✅ Connected to MongoDB')
    
    // Get database instance
    const db = mongoose.connection.db
    
    // Initialize collections by creating indexes
    console.log('\n📊 Setting up collections and indexes...')
    
    // Users collection
    console.log('👤 Setting up users collection...')
    await User.createIndexes()
    console.log('  ✅ Users indexes created')
    
    // Accounts collection  
    console.log('🔐 Setting up accounts collection...')
    await Account.createIndexes()
    console.log('  ✅ Accounts indexes created')
    
    // Sessions collection
    console.log('🎫 Setting up sessions collection...')
    await Session.createIndexes()
    console.log('  ✅ Sessions indexes created')
    
    // Verify collections exist
    console.log('\n🔍 Verifying collections...')
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    
    const requiredCollections = ['users', 'accounts', 'sessions']
    
    for (const collectionName of requiredCollections) {
      if (collectionNames.includes(collectionName)) {
        console.log(`  ✅ ${collectionName} collection exists`)
      } else {
        console.log(`  ⚠️  ${collectionName} collection will be created on first use`)
      }
    }
    
    // Display collection stats
    console.log('\n📈 Collection Statistics:')
    for (const collectionName of requiredCollections) {
      if (collectionNames.includes(collectionName)) {
        const collection = db.collection(collectionName)
        const count = await collection.countDocuments()
        const indexes = await collection.indexes()
        console.log(`  ${collectionName}:`)
        console.log(`    📄 Documents: ${count}`)
        console.log(`    🔍 Indexes: ${indexes.length}`)
      }
    }
    
    console.log('\n🎉 Database initialization completed successfully!')
    console.log('\n📋 Your MongoDB collections are ready:')
    console.log('   • users - User profiles and authentication data')
    console.log('   • accounts - OAuth provider connections')  
    console.log('   • sessions - Active user sessions')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n🔌 Database connection closed')
    process.exit(0)
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase()
}

export default initializeDatabase