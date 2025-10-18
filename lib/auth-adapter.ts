import { Adapter } from 'next-auth/adapters'
import connectDB from './mongodb'
import User from '../models/User'
import Account from '../models/Account'
import Session from '../models/Session'

export const MongoDBAdapter: Adapter = {
  async createUser(user) {
    await connectDB()
    
    const newUser = new User({
      name: user.name,
      email: user.email,
      image: user.image,
      provider: 'credentials', // Default for direct signup
      providerId: user.id || user.email,
      role: 'user',
      isActive: true
    })
    
    const savedUser = await newUser.save()
    
    return {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      image: savedUser.image,
      emailVerified: null
    }
  },

  async getUser(id) {
    await connectDB()
    
    const user = await User.findById(id)
    if (!user) return null
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: null
    }
  },

  async getUserByEmail(email) {
    await connectDB()
    
    const user = await User.findOne({ email })
    if (!user) return null
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: null
    }
  },

  async getUserByAccount({ providerAccountId, provider }) {
    await connectDB()
    
    const account = await Account.findOne({ providerAccountId, provider })
    if (!account) return null
    
    const user = await User.findById(account.userId)
    if (!user) return null
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: null
    }
  },

  async updateUser(user) {
    await connectDB()
    
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        email: user.email,
        image: user.image
      },
      { new: true }
    )
    
    if (!updatedUser) return user
    
    return {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      emailVerified: null
    }
  },

  async linkAccount(account) {
    await connectDB()
    
    const newAccount = new Account({
      userId: account.userId,
      type: account.type,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      refresh_token: account.refresh_token,
      access_token: account.access_token,
      expires_at: account.expires_at,
      token_type: account.token_type,
      scope: account.scope,
      id_token: account.id_token,
      session_state: account.session_state
    })
    
    await newAccount.save()
    return account
  },

  async unlinkAccount({ providerAccountId, provider }) {
    await connectDB()
    
    await Account.findOneAndDelete({ providerAccountId, provider })
  },

  async createSession({ sessionToken, userId, expires }) {
    await connectDB()
    
    const newSession = new Session({
      sessionToken,
      userId,
      expires
    })
    
    await newSession.save()
    
    return {
      sessionToken,
      userId,
      expires
    }
  },

  async getSessionAndUser(sessionToken) {
    await connectDB()
    
    const session = await Session.findOne({ sessionToken })
    if (!session) return null
    
    const user = await User.findById(session.userId)
    if (!user) return null
    
    return {
      session: {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires
      },
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: null
      }
    }
  },

  async updateSession({ sessionToken, ...data }) {
    await connectDB()
    
    const session = await Session.findOneAndUpdate(
      { sessionToken },
      data,
      { new: true }
    )
    
    if (!session) return null
    
    return {
      sessionToken: session.sessionToken,
      userId: session.userId,
      expires: session.expires
    }
  },

  async deleteSession(sessionToken) {
    await connectDB()
    
    await Session.findOneAndDelete({ sessionToken })
  }
}
