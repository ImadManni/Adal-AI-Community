import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

// GET current user info
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
      },
    }, { status: 200 })
  } catch (error: any) {
    console.error('User API Error:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch user data', details: error.message },
      { status: 500 }
    )
  }
}

// Prevent static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
