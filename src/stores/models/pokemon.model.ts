export interface IAbility {
    ability: {name: string, url: string},
}

export interface IStat {
    base_stat: string;
    effort: string,
    stat: {name: string}
}
export interface IPokemonShallow {
    name: string,
    url: string
}

export interface IPokemon {
    id: number
    abilities: IAbility[],
    name: string
    height: number,
    weight: number,
    stats: IStat[],
    sprites: {front_default: string},
    types: Array<{slot: number, type: {name: string, url: string}}>
}

export interface IPrepStat {
    name: string,
    value: string
}