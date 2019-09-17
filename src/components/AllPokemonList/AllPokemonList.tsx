import React from "react";
import "./AllPokemonList.scss";
import { connect } from "react-redux";
import { IApplicationState } from "../../stores";
import PokemonItem from "../PokemonItem/PokemonItem";
import { IPokemon } from "../../stores/models/pokemon.model";
import { IAllPokemonStore } from "../../stores/allPokemon/types";
import { Dispatch, bindActionCreators } from "redux";
import * as AllPokemonStoreActions from '../../stores/allPokemon/actions';
import PokemonApi from "../../api/pokemon.api";



interface IProps {
  filter?: string,
  allPokemonStore: IAllPokemonStore
}

interface IState {
  pokemon: IPokemon[],
  loading: boolean,
  gotAll: boolean,
  filter?: string;
}

interface IDispatchProps {
  addToList(pokemon: Array<IPokemon | Promise<IPokemon>>): void;
  upDateScrollPositon(scorllPosition: number): void;
  upDatePromise(promise: Promise<IPokemon>, pokemon: IPokemon): void;
  upDateOffet(offset: number): void;
  resetList() : void
}



class AllPokemonList extends React.Component<(IProps & IDispatchProps)>{

  public state:IState = {
    filter: undefined,
    gotAll: false,
    loading: false,
    pokemon: [],
  }

  public render() {
    const {  pokemon } = this.state;
    return  (
      <div className="pokemon-list" id="all-list" onScroll={this.scrollHandle.bind(this)}>
        { 
           pokemon.map( (p, i) => <PokemonItem key={i} pokemon={p} />)
        }
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { filter } = nextProps;
    if (filter !== this.props.filter) {
      this.setState({filter, pokemon: []}, () => {
        this.props.resetList();
        setTimeout(this.request.bind(this));
      })
    }
  }

  public  componentDidMount() {
    if ( this.props.allPokemonStore.pokemon.length <= 0 ) {
       this.request();
    } else {
      this.setState({pokemon:  this.props.allPokemonStore.pokemon}, () => {
        (document.getElementById('all-list') as HTMLDivElement).scrollTo({top: this.props.allPokemonStore.scorllPosition, behavior: 'auto'})
      });
      
    }
  }

  private async request() {
    const { allPokemonStore, addToList, upDatePromise, upDateOffet, filter } = this.props;
    this.setState({loading: true});
    try {
      const pokemon = filter ?  await PokemonApi.getByType(filter, allPokemonStore.offset) : await PokemonApi.getAll(allPokemonStore.offset);
      const pokemonPromises = pokemon.map( e => {
        const p = PokemonApi.getOne(e.name);
        p.then( pokemonRes => {
          upDatePromise(p, pokemonRes);
        });
        return p;
      });
      addToList(pokemonPromises);
      upDateOffet(allPokemonStore.offset + 20);
      this.setState({pokemon:  this.props.allPokemonStore.pokemon, loading: false, gotAll: filter ? true: pokemon.length < 20})
    } finally {
      this.setState({loading: false});
    }



  }

  private scrollHandle(e: React.UIEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const totalHeight = target.scrollHeight;
    const height = target.offsetHeight;
    const percent = Math.round((scrollTop) / (totalHeight - height) *100);

    this.props.upDateScrollPositon(scrollTop);

    if(!this.state.loading && percent > 80 && !this.state.gotAll) {
      this.request();
    }
  }


}


const mapStateToProps = ({ allPokemonStore }: IApplicationState) => ({
  allPokemonStore,
});


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AllPokemonStoreActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllPokemonList);