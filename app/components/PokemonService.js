import Pokemon from "../models/Pokemon.js";

let pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let bcwAPI = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Darryl/'
})

let _state = {
    pokemon: [],
    selectedPokemon: [],
    myPokemon: []
}

let _subscribers = {
    pokemon: [],
    selectedPokemon: [],
    myPokemon: []
}

function setState(propName, data) {
    _state[propName] = data
    _subscribers[propName].forEach(fn => fn())
}

export default class PokemonService {

    get Pokemon() {
        return _state.pokemon.map(p => p)
    }

    get MyPokemon() {
        return _state.myPokemon.map(p => new Pokemon(p))
    }

    get SelectedPokemon() {
        return new Pokemon(_state.selectedPokemon)
    }

    deletePokemon(id) {
        bcwAPI.delete('pokemon/' + id)
            .then((res) => {
                this.getMyPokemon()
            }).catch((err) => {
                console.error(err)
            });
    }

    savePokemon() {
        bcwAPI.post('pokemon', this.SelectedPokemon)
            .then(res => {
                this.getMyPokemon()
            })
    }

    getMyPokemon() {
        bcwAPI.get('pokemon')
            .then(res => {
                console.log(res.data.data)
                setState('myPokemon', res.data.data)
            })
    }

    getDetails(name) {
        pokeAPI.get(name)
            .then(res => {
                console.log(res.data)
                setState("selectedPokemon", res.data)
            })
            .catch(err => console.error(err))
    }

    getPokemon() {
        pokeAPI.get()
            .then(res => {
                console.log(res.data)
                setState("pokemon", res.data.results)
            })
            .catch(err => console.error(err))
    }

    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

}