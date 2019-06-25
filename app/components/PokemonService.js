import Pokemon from "../models/Pokemon.js";

let pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

let bcwApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Darryl/pokemon'
})

let _state = {
    pokemon: [],
    myPokemon: [],
    selectedPokemon: {}
}

let _subscribers = {
    pokemon: [],
    myPokemon:[],
    selectedPokemon: []
}

function setState(propName, data) {
    _state[propName] = data
    _subscribers[propName].forEach(fn => fn())
}

export default class PokemonService {
    
    get Pokemon() {
        return _state.pokemon.map(p => p)
    }

    get SelectedPokemon(){
        return new Pokemon(_state.selectedPokemon)
    }

    get MyPokemon(){
        return _state.myPokemon.map(p => new Pokemon(p))
    }

    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    deletePokemon(id) {
        bcwApi.delete(id)
        .then(res=>{
            console.log(res.data.message)
            this.getMyPokemon()
        })
        .catch(err => console.error(err))
    }

    savePokemon() {
        bcwApi.post('', this.SelectedPokemon)
            .then(res=>{
                console.log(res.data.message)
                this.getMyPokemon()
            })
            .catch(err => console.error(err))
    }

    getSelectedPokemon(name) {
        pokeAPI.get(name)
            .then(res=>{
                console.log("selected request",res)
                setState('selectedPokemon', res.data)
            })
            .catch(err=> console.error(err))

    }

    getMyPokemon(){
        bcwApi.get()
            .then(res=>{
                console.log("gets my pokemon", res.data.data)
                setState('myPokemon', res.data.data)
            })
            .catch(err=> console.error(err))
    }


    getPokemon() {
        pokeAPI.get()
            .then(res => {
                console.log("all pokemon request",res.data)
                setState("pokemon", res.data.results)
            })
            .catch(err => console.error(err))
    }


}