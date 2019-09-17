import { combineReducers } from 'redux';
import pokemonViewStore from './pokemonView';
import myPokemonStore from './myPokemon';
import allPokemonStore from './allPokemon';


export default combineReducers({
    allPokemonStore,
    myPokemonStore,
    pokemonViewStore
})