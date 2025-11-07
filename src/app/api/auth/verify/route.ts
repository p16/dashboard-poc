import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Get the required password from environment variables
    const requiredPassword = process.env.APP_PASSWORD;

    // If no password is set in environment, reject authentication attempt
    if (!requiredPassword) {
      return NextResponse.json(
        { error: 'Password protection not configured' },
        { status: 500 }
      );
    }

    // Check if provided password matches
    const isValid = password === requiredPassword;

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
