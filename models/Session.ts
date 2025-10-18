import mongoose, { Document, Schema } from 'mongoose'

export interface ISession extends Document {
  sessionToken: string
  userId: string
  expires: Date
}

const SessionSchema: Schema = new Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

// Indexes
SessionSchema.index({ sessionToken: 1 })
SessionSchema.index({ userId: 1 })
SessionSchema.index({ expires: 1 })

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema)
