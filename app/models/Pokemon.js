export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
        this.user = data.user
        this._id = data._id
    }


    get Template() {
        let button = this._id ? `<button class="btn btn-danger" onclick="app.controllers.pokemonController.deletePokemon('${this._id}')">Delete</button>` : '<button class="btn btn-info" onclick="app.controllers.pokemonController.savePokemon()">Save</button>'
        let subtemplate = ''
        this.types.forEach(t => subtemplate += '<li>' + t.type.name + '</li>')
        return `
        <div class="col-3 border rounded border-info text-info p-3 text-center">
        <p>${this.name}</p>
        <img style="height: 150px" src="${this.img}">
        <div class="text-left">
            <p>Weight: ${this.weight}</p>
            <p>Height: ${this.height}</p>
            <ul>
            ${subtemplate}
            </ul>
        </div>
        ${button}
        </div>
        `
    }
}