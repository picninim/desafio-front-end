import { IPokemon } from "../models/pokemon.model";

export enum PokemonViewTypes {
    SET = '@pokemonView/SET',
    REMOVE = '@pokemonView/REMOVE',
}

export interface IPokemonViewStore {
    readonly pokemon?: IPokemon
}