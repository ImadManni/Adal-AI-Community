import mongoose, { Document, Schema } from 'mongoose'

export interface IAccount extends Document {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

const AccountSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  providerAccountId: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    default: null
  },
  access_token: {
    type: String,
    default: null
  },
  expires_at: {
    type: Number,
    default: null
  },
  token_type: {
    type: String,
    default: null
  },
  scope: {
    type: String,
    default: null
  },
  id_token: {
    type: String,
    default: null
  },
  session_state: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

// Indexes
AccountSchema.index({ userId: 1 })
AccountSchema.index({ provider: 1, providerAccountId: 1 })

export default mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema)
