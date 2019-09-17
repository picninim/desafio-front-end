import { action } from 'typesafe-actions';
import { PokemonViewTypes } from './types';
import { IPokemon } from '../models/pokemon.model';

export function setToView(pokemon: IPokemon) { return action(PokemonViewTypes.SET, { pokemon })}
export function removeFromView() { return action(PokemonViewTypes.REMOVE)}