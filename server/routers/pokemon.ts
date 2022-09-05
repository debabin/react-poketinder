import * as trpc from '@trpc/server';
import { z } from 'zod';
import { MAX_POKEMON_COUNTS } from '../constants';

import { wrapSuccess, prisma } from '../utils';

export const pokemonsRouter = trpc.router().query('get-pokemon', {
  input: z.object({
    id: z.number()
  }),
  async resolve() {
    const randomId = Math.round(Math.random() * MAX_POKEMON_COUNTS);
    const pokemon = await prisma.pokemons.findFirst({ where: { id: randomId } });

    return wrapSuccess(pokemon);
  }
});
