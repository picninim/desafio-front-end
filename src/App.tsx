import React from "react";
import { Provider } from 'react-redux';
import stores from './stores'
import Pokdex from "./components/Pokedex/Pokdex";

export const AppContext = React.createContext({test: 2});


export default class App extends React.Component {
    public render() {
        return (
                <Provider store={stores}>
                    <Pokdex/>
                </Provider>
        )
    }
}
