import React from "react";
import Header from "../Header/Header";
import "./Pokedex.scss";

import { connect } from "react-redux";
import { IApplicationState } from "../../stores";
import PokemonApi from "../../api/pokemon.api";
import { IPokemonViewStore } from "../../stores/pokemonView/types";
import * as PokemonViewStoreActions from '../../stores/pokemonView/actions';
import * as allPokemonStoreActicon from '../../stores/allPokemon/actions';

import { bindActionCreators, Dispatch } from 'redux';
import { IPokemon, IPrepStat } from "../../stores/models/pokemon.model";
import Stats from "../Stats/Stats";
import Button from "../Button/Button";
import MyPokeminList from "../MyPokemonList/MyPokeminList";
import AllPokemonList from "../AllPokemonList/AllPokemonList";
import { TypeSelect } from "../TypeSelect/TypeSelect";
import { IAllPokemonStore } from "../../stores/allPokemon/types";


interface IProps {
  pokemonViewStore: IPokemonViewStore,
  allPokemonStore: IAllPokemonStore
}

interface IDispatchProps {
  setToView(author: IPokemon): void;
  resetList() : void;
}

interface IState {
  mysList: boolean,
  filter?:  string,
  offSet: number,
  showFilter: boolean
}

class Pokedex extends React.Component<(IProps & IDispatchProps), IState> {

  public state: IState  = {
    filter: undefined,
    mysList: true,
    offSet: 0,
    showFilter: false,
  }

  public render() {

    const { pokemonViewStore } = this.props;
    const { mysList, filter, showFilter } = this.state;

    return  (
      <>
        <Header />
        <div className="content">
          <div className="list-container">
            <div className="controller">
              <Button onClick={ () => this.setState({mysList: !mysList})  }> {mysList ? 'My Pokemon' : 'All Pokemon'} </Button>
              <Button onClick={ () => this.setState({showFilter: true})  }> {filter || 'All types'} </Button>
            </div>
            <div className="list">
              {
                mysList ?
                <MyPokeminList filter={filter}/> : <AllPokemonList filter={filter}/> 
              }
            </div>
          </div>
          <div className="stats-container">
            { pokemonViewStore.pokemon &&
              <>
              <Stats stats={this.prepareBaseStats(pokemonViewStore.pokemon)}/>
              <Stats onClickStat={ (e) => this.setState({filter: e.name})} title="Types" stats={this.prepareTypeStats(pokemonViewStore.pokemon)}/>
              <Stats onClickStat={this.showShortEffect} hideImage={true} title="Abilities" stats={this.prepareAbilitiesStats(pokemonViewStore.pokemon)}/>
              </>
            }
          </div>
        </div>
          { showFilter && <TypeSelect onSelect={(e) => this.handleSelect(e)}/> }
      </>
    );
  }

  private prepareBaseStats(pokemon: IPokemon) {
    const { stats, weight, height } = pokemon;
    const prepStats = stats.filter( e => 
      e.stat.name === 'hp' || 
      e.stat.name === 'speed' ||
      e.stat.name === 'defense' ||
      e.stat.name === 'attack'
    ).map( e => ({name: e.stat.name, value: e.base_stat}));

    prepStats.push({name: 'weight', value: weight.toString() }, {name: 'height', value: height.toString() })
    return prepStats;
  }

  private prepareTypeStats(pokemon: IPokemon) {
    const { types } = pokemon;
    return types.map( e => ({name: e.type.name, value: e.type.name}));
  }

  private prepareAbilitiesStats(pokemon: IPokemon) {
    const { abilities } = pokemon;
    return abilities.map( e => ({name: e.ability.name, value: e.ability.name}));
  }


  private async showShortEffect(stat: IPrepStat) {
    const shortEffect = await PokemonApi.getShortEffectFor(stat.name);
    alert(shortEffect);
  }

  private handleSelect(e: string | undefined) {
    this.setState({filter: e, showFilter: false});
    this.props.resetList();
  }
}



const mapStateToProps = ({ allPokemonStore, pokemonViewStore }: IApplicationState) => ({
  allPokemonStore,
  pokemonViewStore
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({...PokemonViewStoreActions, ...allPokemonStoreActicon}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);
