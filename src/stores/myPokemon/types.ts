import { IPokemon } from "../models/pokemon.model";

export enum MyPokeonViewTypes {
    ADD = '@MyPokemonView/ADD',
    REMOVE = '@MyPokemonView/REMOVE',
    RESET = '@MyPokemonView/RESET',
    UPDATE_POKEMON = '@MyPokemonView/UPDATE_POKEMON',
}



export interface IMyPokemonStore {
    readonly pokemon: IPokemon[];
}