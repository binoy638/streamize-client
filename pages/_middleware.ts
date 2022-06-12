import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get('cookie');

  const pathname = req.nextUrl.pathname;

  const url = req.nextUrl.clone();
  if (pathname !== '/signin' && !cookie) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
