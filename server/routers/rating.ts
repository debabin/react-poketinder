import * as trpc from '@trpc/server';
import { z } from 'zod';
import { wrapSuccess } from '../utils';

export const ratingRouter = trpc.router().mutation('rate-pokemon', {
  input: z.object({
    id: z.number(),
    rate: z.union([z.literal('like'), z.literal('dislike')])
  }),
  resolve({ input }) {
    console.log('@here', input);

    return wrapSuccess(input);
  }
});
