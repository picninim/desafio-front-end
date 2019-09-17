import { IPokemonViewStore, PokemonViewTypes } from "./types";
import { Reducer } from "redux";



const INITAL_STATE: IPokemonViewStore = {
    pokemon: undefined,
}

const reducer: Reducer<IPokemonViewStore> = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case PokemonViewTypes.SET:
            return { pokemon: action.payload.pokemon }
        case PokemonViewTypes.REMOVE:
            return { pokemon: undefined }
        default:
            return state
    }
}

export default reducer;