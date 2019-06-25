import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService()


function drawPokemon() {
    let pokemonElem = document.querySelector('#pokemon')
    let pokemon = _pokemonService.Pokemon
    let template = ''
    pokemon.forEach(p => template += `
        <button class="col-2 btn btn-outline-info m-3" onclick="app.controllers.pokemonController.getDetails('${p.name}')">${p.name}</button>
        `
    )
    pokemonElem.innerHTML = template
}

function drawMyPokemon() {
    let pokemonElem = document.querySelector('#my-pokemon')
    let pokemon = _pokemonService.MyPokemon
    let template = ''
    pokemon.forEach(p => template += p.Template
    )
    pokemonElem.innerHTML = template
}

function drawDetails() {
    document.querySelector('#selected-pokemon').innerHTML = _pokemonService.SelectedPokemon.Template
}


export default class PokemonController {
    constructor() {
        _pokemonService.addSubscriber("pokemon", drawPokemon)
        _pokemonService.addSubscriber("selectedPokemon", drawDetails)
        _pokemonService.addSubscriber("myPokemon", drawMyPokemon)
        _pokemonService.getPokemon()
        _pokemonService.getMyPokemon()
    }

    deletePokemon(id) {
        _pokemonService.deletePokemon(id)
    }

    getDetails(name) {
        _pokemonService.getDetails(name)
    }

    savePokemon() {
        _pokemonService.savePokemon()
    }
}