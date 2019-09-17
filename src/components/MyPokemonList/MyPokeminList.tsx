// tslint:disable: no-nested-template-literals
import React from "react";
import "./MyPokemonList.scss";
import { connect } from "react-redux";
import { IApplicationState } from "../../stores";
import { IMyPokemonStore } from "../../stores/myPokemon/types";
import PokemonItem from "../PokemonItem/PokemonItem";


interface IProps {
  filter?: string,
  myPokemonStore: IMyPokemonStore
}


class MyPokemonList extends React.Component<IProps>{

  public render() {
         return  (
      <div className="pokemon-list">
        { 
           this.fitlerPokemon().length > 0 ?
           this.fitlerPokemon().sort( (a, b) =>  a.id - b.id ).map( p => <PokemonItem key={p.id + p.sprites.front_default} pokemon={p} />) :
           <>
            <p style={{padding: 20}}> { `You Don't have any Pokemon ${ this.props.filter ? `of ${this.props.filter} type` : ''}`  }</p> 
            <p style={{padding: 20}}> Click at the button "My Pokemon" to switch between All pokemon and My Pokemon</p>
           </>
        }
      </div>
    );
  }

  private fitlerPokemon() {
    const { filter, myPokemonStore } = this.props
    if (filter) {
        return myPokemonStore.pokemon.filter( p => p.types.find((e) => e.type.name === filter))
    }
    return myPokemonStore.pokemon;
  }
}


const mapStateToProps = ({ myPokemonStore }: IApplicationState) => ({
  myPokemonStore,
});

export default connect(mapStateToProps)(MyPokemonList);