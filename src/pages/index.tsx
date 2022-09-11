import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';

import { trpc, getPokemonId } from '@/utils';
import { Button, Ping } from '@/components';

const Home: NextPage = () => {
  const getPokemonQuery = trpc.useQuery(['pokemons.get-random-pokemon'], {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false
  });

  const ratePokemonQuery = trpc.useMutation(['rating.rate-pokemon'], {
    onSuccess: () => {
      getPokemonQuery.refetch();
    }
  });

  if (!getPokemonQuery.data?.success || !getPokemonQuery.data.data?.name) {
    return <Ping />;
  }

  const pokemon = getPokemonQuery.data.data;
  return (
    <section className='flex h-screen flex-col items-center justify-center'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold'>Do you like them all ☄️ ?</h1>
      </div>
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
        <Link href={`/pokemon/${pokemon.id}`}>
          <a>
            <div>
              <div className='flex justify-between'>
                <h2 className='text-lg font-medium'>{pokemon.name}</h2>
                <span>{getPokemonId(pokemon.id)}</span>
              </div>

              <div className='item-center flex justify-center'>
                <Image
                  alt={`pokemon ${pokemon.name}`}
                  src={pokemon.image}
                  width={300}
                  height={300}
                  layout='fixed'
                  className='animate-fade-in'
                />
              </div>
            </div>
          </a>
        </Link>

        <div className='flex gap-3'>
          <Button
            onClick={() => ratePokemonQuery.mutate({ id: pokemon.id, rate: 'like' })}
            disabled={ratePokemonQuery.isLoading}
          >
            LIKE
          </Button>
          <Button
            onClick={() => ratePokemonQuery.mutate({ id: pokemon.id, rate: 'dislike' })}
            disabled={ratePokemonQuery.isLoading}
          >
            DISLIKE
          </Button>
        </div>
      </div>

      <div className='mt-10 text-blue-500'>
        <Link href='/results'>Results</Link> / <Link href='/about'>About</Link>
      </div>
      <ReactQueryDevtools />
    </section>
  );
};

export default Home;
