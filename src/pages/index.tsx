import type { NextPage } from 'next';
import Image from 'next/image';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components';

import { getPokemonId } from '../utils';

const Home: NextPage = () => {
  const getPokemonQuery = trpc.useQuery(['pokemons.get-pokemon', { id: 1 }], {
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  const ratePokemonQuery = trpc.useMutation(['rating.rate-pokemon']);

  if (!getPokemonQuery.data?.success || !getPokemonQuery.data.data?.name) {
    return (
      <section className='flex h-screen flex-col items-center justify-center'>
        <div className='flex h-[60px] w-[60px] items-center justify-center'>
          <div className='inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75' />
        </div>
      </section>
    );
  }

  const pokemon = getPokemonQuery.data.data;
  return (
    <section className='flex h-screen flex-col items-center justify-center'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold'>Do you like them all ?</h1>
      </div>
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
        <div className='flex justify-between'>
          <h2 className='text-lg font-medium'>{pokemon.name}</h2>
          <span>{getPokemonId(pokemon.id)}</span>
        </div>

        <Image
          src={pokemon.image}
          width={300}
          height={300}
          layout='fixed'
          className='animate-fade-in'
        />

        <div className='flex gap-3'>
          <Button onClick={() => ratePokemonQuery.mutate({ id: 1, rate: 'like' })}>LIKE</Button>
          <Button onClick={() => ratePokemonQuery.mutate({ id: 1, rate: 'dislike' })}>
            DISLIKE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
