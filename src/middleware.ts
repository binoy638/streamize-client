import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const ua = request.headers.get('user-agent');
    const { ip, geo } = request;

    const payload = { ua, ip, geo };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/:path'],
};
