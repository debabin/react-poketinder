import type { NextPage } from 'next';
import Image from 'next/image';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components';

const Home: NextPage = () => {
  const getPokemonQuery = trpc.useQuery(['pokemons.get-pokemon', { id: 1 }], {
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  const ratePokemonQuery = trpc.useMutation(['rating.rate-pokemon']);
  console.log('getPokemonQuery', getPokemonQuery.isLoading)
  if (!getPokemonQuery.data?.success) {
    return <div>Loading...</div>;
  }

  return (
    <section className='flex h-screen flex-col items-center justify-center'>
      <div className='mb-2'>
        <h1 className='text-xl font-bold'>Do you like them all ?</h1>
      </div>
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
        <h2 className='text-lg font-medium'>{getPokemonQuery.data.data.name}</h2>

        {getPokemonQuery.data.data.sprites.front_default && (
          <Image
            src={getPokemonQuery.data.data.sprites.front_default}
            width={256}
            height={256}
            layout='fixed'
            className='animate-fade-in'
          />
        )}

        <div className='flex gap-3'>
          <Button onClick={() => ratePokemonQuery.mutate({ id: 1, rate: 'like' })}>LIKE</Button>
          <Button onClick={() => ratePokemonQuery.mutate({ id: 1, rate: 'dislike' })}>DISLIKE</Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
