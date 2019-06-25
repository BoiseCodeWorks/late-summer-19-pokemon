import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService()


function drawPokemon() {
    let pokemonElem = document.querySelector('#pokemon')
    let pokemon = _pokemonService.Pokemon
    let template = ''
    pokemon.forEach(p => template += `
        <button class="col-2 btn btn-outline-info m-3" onclick="app.controllers.pokemonController.getSelectedPokemon('${p.name}')">${p.name}</button>
        `
    )
    pokemonElem.innerHTML = template
}

function drawMyPokemon(){
    let myPokemonElem = document.querySelector("#my-pokemon")
    let myPokemon = _pokemonService.MyPokemon
    let template = ''
    myPokemon.forEach(p =>{
        template += p.Template
    })
    myPokemonElem.innerHTML = template
}

function drawSelectedPokemon(){
    let selectedElem = document.querySelector("#selected-pokemon")
    let selectedPokemon = _pokemonService.SelectedPokemon
    selectedElem.innerHTML = selectedPokemon.Template
    // console.log('draw selected',selectedPokemon)
}



export default class PokemonController {
    constructor() {
        _pokemonService.addSubscriber("pokemon", drawPokemon)
        _pokemonService.addSubscriber('selectedPokemon', drawSelectedPokemon)
        _pokemonService.addSubscriber('myPokemon', drawMyPokemon)
        _pokemonService.getPokemon()
        _pokemonService.getMyPokemon()
    }

    getSelectedPokemon(name){
        _pokemonService.getSelectedPokemon(name)
    }

    savePokemon(){
        _pokemonService.savePokemon()
    }

    deletePokemon(id){
        _pokemonService.deletePokemon(id)
    }
}