import { MAX_POKEMON_COUNTS } from '@/server/constants';

export const getRandomPokemonId = () => Math.round(Math.random() * MAX_POKEMON_COUNTS);
