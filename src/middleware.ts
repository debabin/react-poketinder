import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '10 s')
});

const middleware = async (request: NextRequest) => {
  const ip = request.ip ?? 'localhost';
  const blockedUrl = '/api/blocked';

  if (request.url === blockedUrl) {
    return NextResponse.next(request);
  }

  const ratelimitResponse = await ratelimit.limit(`user_${ip}`);

  //   await event.waitUntil(pending);

  if (ratelimitResponse.success) {
    return NextResponse.next();
  }

  const res = NextResponse.rewrite(new URL(blockedUrl, request.url));

  res.headers.set('X-RateLimit-Limit', ratelimitResponse.limit.toString());
  res.headers.set('X-RateLimit-Remaining', ratelimitResponse.remaining.toString());
  res.headers.set('X-RateLimit-Reset', ratelimitResponse.reset.toString());

  NextResponse.json({ data: null });

  return res;
};

export const config = {
  matcher: '/api/:path*'
};

export default middleware;
