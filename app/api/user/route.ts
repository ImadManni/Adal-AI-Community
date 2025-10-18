import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      bio: user.bio,
      location: user.location,
      website: user.website,
      github: user.github,
      twitter: user.twitter,
      linkedin: user.linkedin,
      modelsCreated: user.modelsCreated,
      datasetsShared: user.datasetsShared,
      spacesBuilt: user.spacesBuilt,
      followers: user.followers,
      following: user.following,
      preferences: user.preferences,
      createdAt: user.createdAt
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    await connectDB()
    
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        bio: body.bio,
        location: body.location,
        website: body.website,
        github: body.github,
        twitter: body.twitter,
        linkedin: body.linkedin,
        preferences: body.preferences
      },
      { new: true }
    )
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      bio: user.bio,
      location: user.location,
      website: user.website,
      github: user.github,
      twitter: user.twitter,
      linkedin: user.linkedin,
      modelsCreated: user.modelsCreated,
      datasetsShared: user.datasetsShared,
      spacesBuilt: user.spacesBuilt,
      followers: user.followers,
      following: user.following,
      preferences: user.preferences,
      createdAt: user.createdAt
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
