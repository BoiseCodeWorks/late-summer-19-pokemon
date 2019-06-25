import PokemonController from "./components/PokemonController.js";

class App {
    constructor() {

        this.controllers = {
            pokemonController: new PokemonController()
        }
    }
}

window['app'] = new App()