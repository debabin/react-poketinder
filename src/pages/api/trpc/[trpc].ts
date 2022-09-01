import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { AppRouter, appRouter } from '@/server/routers';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
});
