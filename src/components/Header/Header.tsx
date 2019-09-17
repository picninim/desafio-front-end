import React, { ChangeEvent } from "react";
import "./Header.scss";
import { connect } from "react-redux";
import { IApplicationState } from "../../stores";
import { IPokemonViewStore } from "../../stores/pokemonView/types";
import Button from "../Button/Button";
import { Dispatch, bindActionCreators } from "redux";
import { IPokemon } from "../../stores/models/pokemon.model";
import * as MyPokemonStoreActions from '../../stores/myPokemon/actions';
import * as PokemonViewStoreActions from '../../stores/pokemonView/actions';

import { IMyPokemonStore } from "../../stores/myPokemon/types";


interface IProps {
  pokemonViewStore: IPokemonViewStore,
  myPokemonStore: IMyPokemonStore
}

interface IDispatchProps {
  addToPokedex(pokemon: IPokemon): void;
  setToView(pokemon: IPokemon): void;
  updatePokemon(pokemon: IPokemon): void;
}

class Header extends React.Component<(IProps & IDispatchProps)>{

  public render() {
    const { pokemonViewStore } = this.props;
    return  (
    <div className="header">
      <div className="view">
        {pokemonViewStore.pokemon && <div className="pokemon-image" style ={ { backgroundImage: `url('${pokemonViewStore.pokemon.sprites.front_default}')` } }/>}
      </div>
      <div className="side">
        {
          pokemonViewStore.pokemon &&
          <>
            <div className="pokemon-name">{pokemonViewStore.pokemon.name}</div>
            {!this.isCapatured(pokemonViewStore.pokemon) && <Button onClick={() => this.addToPokedex(pokemonViewStore.pokemon as IPokemon)}> Capture </Button>}
            {this.isCapatured(pokemonViewStore.pokemon) && 
            <Button onClick={() => (document.getElementById('file') as HTMLInputElement ).click() }> Change Picture 
              <input accept="image/*" onChange={ event => {this.updateImage(event, pokemonViewStore.pokemon as IPokemon)}} id="file" style={{display: 'none'}} type="file"/> 
            </Button>}
          </>
        }
      </div>
    </div>
    );
  }

  private isCapatured(pokemon: IPokemon): IPokemon {
    return this.props.myPokemonStore.pokemon.find( p => p.id === pokemon.id ) as IPokemon;
  }

  private addToPokedex(pokemon: IPokemon): void {
    this.props.addToPokedex(pokemon);
    this.props.setToView(this.isCapatured(pokemon));
  }

  private async updateImage(event: ChangeEvent, pokemon: IPokemon) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      try {
        const image = await this.convertToBase64(target.files[0]) as string;
        this.props.updatePokemon({...pokemon, sprites: {front_default: image}});
        this.props.setToView(this.isCapatured(pokemon));
      // tslint:disable-next-line: no-useless-catch
      } catch(err) {
        throw err;
      }
    } 
    
  }

  private convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

const mapStateToProps = ({ myPokemonStore, pokemonViewStore }: IApplicationState) => ({
  myPokemonStore,
  pokemonViewStore
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({...MyPokemonStoreActions, ...PokemonViewStoreActions}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Header);
