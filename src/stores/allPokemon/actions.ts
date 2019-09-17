import { action } from 'typesafe-actions';
import { IAllPokemonTypes } from './types';
import {  IPokemon } from '../models/pokemon.model';

export function addToList(pokemon: Array<IPokemon | Promise<IPokemon>>) { return action(IAllPokemonTypes.ADD, { pokemon })}
export function upDateScrollPositon(scorllPosition: number) { return action(IAllPokemonTypes.UPDATE_SCROLL, { scorllPosition })}
export function upDateOffet(offset: number) { return action(IAllPokemonTypes.UPDATE_OFFESET, { offset })}
export function upDatePromise(promise: Promise<IPokemon>, pokemon: IPokemon) { return action(IAllPokemonTypes.UPDATE_PROMISE, { promise, pokemon })}
export function resetList() { return action(IAllPokemonTypes.RESET)}


