import { IPokemon, IPokemonShallow } from "../models/pokemon.model";

export enum IAllPokemonTypes {
    ADD = '@AllPokemon/ADD',
    UPDATE_SCROLL = '@AllPokemon/UPDATE_SCROLL',
    UPDATE_OFFESET = '@AllPokemon/UPDATE_OFFESET',
    UPDATE_PROMISE = '@AllPokemon/UPDATE_PROMISE',
    RESET = '@AllPokemon/RESET',
}



export interface IAllPokemonStore {
    readonly pokemon: Array<IPokemonShallow | Promise<IPokemon>>;
    readonly scorllPosition: number;
    readonly offset: number
}