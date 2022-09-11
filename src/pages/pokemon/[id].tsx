import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import type Prisma from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';

import { getPokemonId } from '@/utils';
import { prisma } from '@/server/utils';

interface PokemonPageProps {
  pokemon: Prisma.pokemons;
}

export const getStaticPaths = async () => {
  const pokemons = await prisma.pokemons.findMany();

  const paths = pokemons.map((pokemon) => ({
    params: { id: pokemon.id.toString() }
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{ id: string }>): Promise<GetStaticPropsResult<PokemonPageProps>> => {
  if (params?.id) {
    const pokemon = await prisma.pokemons.findFirst({ where: { id: +params.id } });

    if (!pokemon)
      return {
        redirect: {
          destination: '/',
          permanent: true
        }
      };

    return {
      props: {
        pokemon
      }
    };
  }

  throw new Error('no id');
};

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => (
  <section className='flex h-screen flex-col items-center justify-center'>
    <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
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

    <div className='mt-10 text-blue-500'>
      <Link href='/'>Home</Link> / <Link href='/results'>Results</Link> /{' '}
      <Link href='/about'>About</Link>
    </div>
  </section>
);

export default PokemonPage;
