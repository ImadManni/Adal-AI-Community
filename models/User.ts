import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  image?: string
  provider: string
  providerId: string
  role: 'user' | 'admin' | 'moderator'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  // Additional fields for Adal platform
  bio?: string
  location?: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
  // Platform statistics
  modelsCreated: number
  datasetsShared: number
  spacesBuilt: number
  followers: number
  following: number
  // Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    emailUpdates: boolean
  }
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'github', 'credentials']
  },
  providerId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Additional profile fields
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  // Platform statistics
  modelsCreated: {
    type: Number,
    default: 0
  },
  datasetsShared: {
    type: Number,
    default: 0
  },
  spacesBuilt: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  // User preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
})

// Indexes for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ provider: 1, providerId: 1 })
UserSchema.index({ createdAt: -1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
