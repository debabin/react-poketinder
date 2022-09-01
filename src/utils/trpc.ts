import { createReactQueryHooks } from '@trpc/react';

import type { AppRouter } from '@/server/routers';

export const trpc = createReactQueryHooks<AppRouter>();
