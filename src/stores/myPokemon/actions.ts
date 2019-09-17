import { action } from 'typesafe-actions';
import { MyPokeonViewTypes } from './types';
import { IPokemon } from '../models/pokemon.model';

export function addToPokedex(pokemon: IPokemon) { return action(MyPokeonViewTypes.ADD, { pokemon })}
export function removeFromPokedex(pokemon: IPokemon) { return action(MyPokeonViewTypes.REMOVE, {pokemon})}
export function resetPokedex() { return action(MyPokeonViewTypes.RESET)}
export function updatePokemon(pokemon: IPokemon) { return action(MyPokeonViewTypes.UPDATE_POKEMON, { pokemon })}
