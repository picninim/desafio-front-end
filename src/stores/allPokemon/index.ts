import {  IAllPokemonTypes, IAllPokemonStore } from "./types";
import { Reducer } from "redux";



const INITAL_STATE: IAllPokemonStore = {
    offset: 0,
    pokemon: [],
    scorllPosition: 0,
}

const reducer: Reducer<IAllPokemonStore> = (state = INITAL_STATE, action) => {
    const { pokemon } = state;
    switch (action.type) {
        case IAllPokemonTypes.ADD:
            return { ...state, pokemon: pokemon.concat(action.payload.pokemon) }
        case IAllPokemonTypes.UPDATE_SCROLL:
            return { ...state, scorllPosition: action.payload.scorllPosition }
        case IAllPokemonTypes.UPDATE_OFFESET:
            return { ...state, offset: action.payload.offset }
        case IAllPokemonTypes.UPDATE_PROMISE:
            const index = pokemon.indexOf(action.payload.promise);
            pokemon.splice(index, 1,action.payload.pokemon )
            return { ...state, pokemon }
        case IAllPokemonTypes.RESET:
                return { ...INITAL_STATE }
        default:
            return state
    }
}

export default reducer;