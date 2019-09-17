import React from "react";
import "./PokemonItem.scss";
import { IPokemon } from "../../stores/models/pokemon.model";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as PokemonViewStoreActions from '../../stores/pokemonView/actions';
import { IApplicationState } from "../../stores";
import { IPokemonViewStore } from "../../stores/pokemonView/types";
import { IMyPokemonStore } from "../../stores/myPokemon/types";


interface IProps {
  pokemon: IPokemon | Promise<IPokemon>,
  pokemonViewStore: IPokemonViewStore,
  myPokemonStore: IMyPokemonStore
}

interface IDispatchProps {
  setToView(pokemon: IPokemon): void;
}

interface IState {
  pokemon?: IPokemon,
}

class PokemonItem extends React.Component<(IProps & IDispatchProps), IState>{


  public state: IState = {
    pokemon: undefined,
  }

  public render() {
    const { setToView, pokemonViewStore } = this.props;
    const { pokemon } = this.state;
    return  (
      <div className="pokemon">
       {
         pokemon && !(pokemon instanceof Promise) ?
         <div onClick={() => setToView(pokemon)} className={`${pokemonViewStore.pokemon && pokemonViewStore.pokemon.id === (pokemon).id ? 'selected' : '' }`}>
          <div className="image" style={{backgroundImage: `url(${(pokemon).sprites.front_default}`}}/>
          <div className="name">{(pokemon).name}</div>
          {this.isCapatured(pokemon) && <div className="captured"/>}
        </div> :
        <p>Loading...</p>
       }

      </div>
    );
  }

  public async componentDidMount() {

    const { pokemon } = this.props;
    if ( pokemon instanceof Promise ) {
      const pokemonToBe = await pokemon;
      this.setState({pokemon: pokemonToBe});
    } else {
      this.setState({pokemon});
    }
  }

  private isCapatured(pokemom: IPokemon): IPokemon {
    return this.props.myPokemonStore.pokemon.find( p => p.id === pokemom.id ) as IPokemon;
  }
}


const mapStateToProps = ({ myPokemonStore, pokemonViewStore }: IApplicationState) => ({
  myPokemonStore,
  pokemonViewStore
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PokemonViewStoreActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PokemonItem);