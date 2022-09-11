import { PokemonClient } from 'pokenode-ts';

import { prisma } from './prisma';

export const fillDataBase = async () => {
  const pokeApi = new PokemonClient();

  const pokemons = await pokeApi.listPokemons(0, 800);

  const pokemonsWithImages = pokemons.results.map((pokemon, index) => ({
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
    ...pokemon
  }));

  const pokemonsCount = await prisma.pokemons.count();
  if (pokemonsCount) return;

  await prisma.pokemons.createMany({ data: pokemonsWithImages });
};
