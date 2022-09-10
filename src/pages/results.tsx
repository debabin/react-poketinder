import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { trpc, getPokemonId } from '@/utils';
import { Ping } from '@/components';

const Results = () => {
  const getPokemonsQuery = trpc.useQuery(['pokemons.get-pokemons'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    cacheTime: 0
  });

  if (!getPokemonsQuery.data?.success || !getPokemonsQuery.data.data?.length) {
    return <Ping />;
  }

  const pokemons = getPokemonsQuery.data.data.map((pokemon) => {
    const votes = pokemon.likes + pokemon.dislikes || 1;
    const precent = Math.round((pokemon.likes / votes) * 100);

    return (
      <div key={pokemon.id} className='flex flex-col gap-4 rounded-lg bg-slate-600 p-3'>
        <div className='flex justify-between'>
          <h2 className='text-lg font-medium'>{pokemon.name}</h2>
          <span>{getPokemonId(pokemon.id)}</span>
        </div>

        <div className='item-center flex justify-center'>
          <Image
            src={pokemon.image}
            width={140}
            height={140}
            layout='fixed'
            className='animate-fade-in'
          />
        </div>

        <div>
          <div>
            likes: <span className='text-lg font-bold'>{pokemon.likes}</span>
          </div>
          <div>
            dislikes: <span className='text-lg font-bold'>{pokemon.dislikes}</span>
          </div>
          <div>
            precent: <span className='text-lg font-bold'>{precent}%</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='my-4'>
        <h1 className='text-xl font-bold'>Results ❤️</h1>
      </div>
      <Link href='/'>Home</Link>
      <div className='gird-cols-1 grid w-full gap-3 px-5 sm:w-[800px] sm:grid-cols-3'>
        {pokemons}
      </div>
    </section>
  );
};

export default Results;
