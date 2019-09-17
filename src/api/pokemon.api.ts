import axios from 'axios';
import { IPokemon, IPokemonShallow } from '../stores/models/pokemon.model';

const API = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export default class PokemonApi {
    static async getAll(offset?: number): Promise<IPokemonShallow[]> {
        const call = await API.get(`pokemon?limit=20&offset=${offset}`);
        return call.data.results;
    }
    static async getOne(identificator: number | string): Promise<IPokemon> {
        const call = await API.get(`pokemon/${identificator}`);
        return call.data;
    }
    static async getByType(name: string, offset?: number): Promise<IPokemonShallow[]> {
        const call = await API.get(`type/${name}??limit=20&offset=${offset}`)
        return call.data.pokemon.map( (e: any) => e.pokemon );
    }

    static async getShortEffectFor(name: string) {
        const call = await API.get(`ability/${name}`)
        return call.data.effect_entries[0].short_effect;
    }
}