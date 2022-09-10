import * as trpc from '@trpc/server';
import { z } from 'zod';

import { prisma, wrapSuccess } from '../utils';

export const ratingRouter = trpc.router().mutation('rate-pokemon', {
  input: z.object({
    id: z.number(),
    rate: z.union([z.literal('like'), z.literal('dislike')])
  }),
  resolve: async ({ input }) => {
    const updateDpokemon = await prisma.pokemons.update({
      where: { id: input.id },
      data: {
        ...(input.rate === 'like' && {
          likes: {
            increment: 1
          }
        }),
        ...(input.rate === 'dislike' && {
          dislikes: {
            increment: 1
          }
        })
      }
    });

    return wrapSuccess(updateDpokemon);
  }
});
