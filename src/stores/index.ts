import { createStore, Store } from 'redux';
import rootReducer from './rootReducer';
import { IPokemonViewStore } from './pokemonView/types';
import { IMyPokemonStore } from './myPokemon/types';
import { IAllPokemonStore } from './allPokemon/types';

export interface IApplicationState {
    allPokemonStore: IAllPokemonStore,
    pokemonViewStore: IPokemonViewStore,
    myPokemonStore: IMyPokemonStore
}


const ApplicationState: Store<IApplicationState> = createStore(rootReducer);

export default ApplicationState;