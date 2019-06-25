import Pokemon from "../models/Pokemon.js";

let pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _state = {
    pokemon: []
}

let _subscribers = {
    pokemon: []
}

function setState(propName, data) {
    _state[propName] = data
    _subscribers[propName].forEach(fn => fn())
}

export default class PokemonService {

    get Pokemon() {
        return _state.pokemon.map(p => p)
    }

    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    getPokemon() {
        pokeAPI.get()
            .then(res => {
                console.log(res.data)
                setState("pokemon", res.data.results)
            })
            .catch(err => console.error(err))
    }


}