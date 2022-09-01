import * as trpc from '@trpc/server';

import { pokemonsRouter } from './pokemon';
import { ratingRouter } from './rating';

export const appRouter = trpc
  .router()
  .merge('pokemons.', pokemonsRouter)
  .merge('rating.', ratingRouter);
export type AppRouter = typeof appRouter;
