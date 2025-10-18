#!/usr/bin/env ts-node

/**
 * Database Utility Script
 * 
 * Provides utilities to manage and inspect your MongoDB collections:
 * - View collection statistics
 * - Create sample data for testing
 * - Clean up test data
 */

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import User from '../models/User'
import Account from '../models/Account'
import Session from '../models/Session'

class DatabaseUtils {
  async connect() {
    await connectDB()
    console.log('✅ Connected to MongoDB')
  }

  async disconnect() {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }

  async showStats() {
    console.log('📊 Database Statistics:')
    console.log('=' .repeat(50))
    
    // Users stats
    const userCount = await User.countDocuments()
    const activeUsers = await User.countDocuments({ isActive: true })
    const adminUsers = await User.countDocuments({ role: 'admin' })
    
    console.log(`👤 Users Collection:`)
    console.log(`   Total users: ${userCount}`)
    console.log(`   Active users: ${activeUsers}`)
    console.log(`   Admin users: ${adminUsers}`)
    
    // Accounts stats
    const accountCount = await Account.countDocuments()
    const googleAccounts = await Account.countDocuments({ provider: 'google' })
    const githubAccounts = await Account.countDocuments({ provider: 'github' })
    
    console.log(`\n🔐 Accounts Collection:`)
    console.log(`   Total accounts: ${accountCount}`)
    console.log(`   Google accounts: ${googleAccounts}`)
    console.log(`   GitHub accounts: ${githubAccounts}`)
    
    // Sessions stats
    const sessionCount = await Session.countDocuments()
    const activeSessions = await Session.countDocuments({ 
      expires: { $gt: new Date() } 
    })
    
    console.log(`\n🎫 Sessions Collection:`)
    console.log(`   Total sessions: ${sessionCount}`)
    console.log(`   Active sessions: ${activeSessions}`)
    
    console.log('=' .repeat(50))
  }

  async createSampleUser() {
    console.log('👤 Creating sample user...')
    
    const sampleUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      provider: 'google',
      providerId: 'google_123456789',
      role: 'user',
      isActive: true,
      bio: 'AI enthusiast and developer passionate about machine learning.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      github: 'johndoe',
      twitter: 'johndoe',
      linkedin: 'johndoe',
      modelsCreated: 5,
      datasetsShared: 3,
      spacesBuilt: 2,
      followers: 42,
      following: 38,
      preferences: {
        theme: 'dark',
        notifications: true,
        emailUpdates: true
      }
    })
    
    try {
      const savedUser = await sampleUser.save()
      console.log(`✅ Sample user created with ID: ${savedUser._id}`)
      return savedUser
    } catch (error) {
      if (error.code === 11000) {
        console.log('⚠️  Sample user already exists')
        return await User.findOne({ email: 'john.doe@example.com' })
      }
      throw error
    }
  }

  async createSampleAccount(userId: string) {
    console.log('🔐 Creating sample account...')
    
    const sampleAccount = new Account({
      userId: userId,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google_123456789',
      access_token: 'sample_access_token',
      token_type: 'Bearer',
      scope: 'openid email profile'
    })
    
    try {
      const savedAccount = await sampleAccount.save()
      console.log(`✅ Sample account created with ID: ${savedAccount._id}`)
      return savedAccount
    } catch (error) {
      if (error.code === 11000) {
        console.log('⚠️  Sample account already exists')
        return await Account.findOne({ providerAccountId: 'google_123456789' })
      }
      throw error
    }
  }

  async createSampleSession(userId: string) {
    console.log('🎫 Creating sample session...')
    
    const sampleSession = new Session({
      sessionToken: `sample_session_${Date.now()}`,
      userId: userId,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    })
    
    const savedSession = await sampleSession.save()
    console.log(`✅ Sample session created with ID: ${savedSession._id}`)
    return savedSession
  }

  async createSampleData() {
    console.log('🎭 Creating sample data for testing...')
    
    const user = await this.createSampleUser()
    await this.createSampleAccount(user._id.toString())
    await this.createSampleSession(user._id.toString())
    
    console.log('✅ Sample data creation completed!')
  }

  async cleanSampleData() {
    console.log('🧹 Cleaning up sample data...')
    
    await User.deleteOne({ email: 'john.doe@example.com' })
    await Account.deleteOne({ providerAccountId: 'google_123456789' })
    await Session.deleteMany({ sessionToken: { $regex: /^sample_session_/ } })
    
    console.log('✅ Sample data cleaned up!')
  }

  async listCollections() {
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    
    console.log('📚 Available Collections:')
    console.log('=' .repeat(30))
    
    for (const collection of collections) {
      const coll = db.collection(collection.name)
      const count = await coll.countDocuments()
      const indexes = await coll.indexes()
      
      console.log(`📁 ${collection.name}:`)
      console.log(`   Documents: ${count}`)
      console.log(`   Indexes: ${indexes.length}`)
      console.log(`   Size: ${collection.options?.size || 'N/A'}`)
      console.log()
    }
  }
}

// CLI interface
async function main() {
  const utils = new DatabaseUtils()
  const command = process.argv[2]
  
  try {
    await utils.connect()
    
    switch (command) {
      case 'stats':
        await utils.showStats()
        break
      case 'collections':
        await utils.listCollections()
        break
      case 'sample':
        await utils.createSampleData()
        break
      case 'clean':
        await utils.cleanSampleData()
        break
      case 'help':
      default:
        console.log('🛠️  Database Utilities')
        console.log('Usage: ts-node scripts/db-utils.ts [command]')
        console.log('')
        console.log('Commands:')
        console.log('  stats       - Show database statistics')
        console.log('  collections - List all collections')
        console.log('  sample      - Create sample data for testing')
        console.log('  clean       - Clean up sample data')
        console.log('  help        - Show this help message')
        break
    }
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await utils.disconnect()
  }
}

if (require.main === module) {
  main()
}

export default DatabaseUtils