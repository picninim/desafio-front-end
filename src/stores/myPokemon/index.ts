import { IMyPokemonStore, MyPokeonViewTypes } from "./types";
import { Reducer } from "redux";



const INITAL_STATE: IMyPokemonStore = {
    pokemon: [],
}

const reducer: Reducer<IMyPokemonStore> = (state = INITAL_STATE, action) => {
    const { pokemon } = state;
    switch (action.type) {
        case MyPokeonViewTypes.ADD:
            pokemon.push(action.payload.pokemon);
            return { pokemon }
        case MyPokeonViewTypes.REMOVE:
            pokemon.splice(pokemon.indexOf(action.payload.pokemon), 1);
            return { pokemon }

        case MyPokeonViewTypes.UPDATE_POKEMON:
            const index = pokemon.findIndex((p) => p.id === action.payload.pokemon.id);
            pokemon.splice(index, 1, action.payload.pokemon);
            return { pokemon }
        default:
            return state
    }
}

export default reducer;