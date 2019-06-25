import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService()


function drawPokemon() {
    let pokemonElem = document.querySelector('#pokemon')
    let pokemon = _pokemonService.Pokemon
    let template = ''
    pokemon.forEach(p => template += `
        <button class="col-2 btn btn-outline-info m-3">${p.name}</button>
        `
    )
    pokemonElem.innerHTML = template
}

export default class PokemonController {
    constructor() {
        _pokemonService.addSubscriber("pokemon", drawPokemon)
        _pokemonService.getPokemon()
    }
}