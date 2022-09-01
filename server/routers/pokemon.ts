import * as trpc from '@trpc/server';
import { z } from 'zod';
import { wrapSuccess } from '../utils';

export const pokemonsRouter = trpc.router().query('get-pokemon', {
  input: z.object({
    id: z.number()
  }),
  async resolve({ input }) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.id}/`).then(
      (data) => data.json() as Promise<Pokemon>
    );

    console.log('here request');
    return wrapSuccess(pokemon);
  }
});
