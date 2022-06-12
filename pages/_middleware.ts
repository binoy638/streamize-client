import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  //   req.headers.set('sec-fetch-site', 'cross-site');
  const cookie = req.headers.get('cookie');
  const pathname = req.nextUrl.pathname;
  console.log(req.headers);
  console.log({ cookie });
  //   //   console.log(res);
  const url = req.nextUrl.clone();
  if (pathname !== '/signin' && !cookie) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
