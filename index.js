
let term = require("terminal-kit").terminal();
term.clear()
const fs = require("fs");
const request = require("request").defaults({encoding: null})
const Pokedex = require("pokedex-api");
const pokedex = new Pokedex({
    version: "v1"
})

function Image(name){
    term.drawImage(name, {shrink: { width: (process.stdout.rows * 1.5) / 1, height: (process.stdout.columns * 1.5) / 1}});
}

function NewGame(A) {
    //term.inputField({}, (err, res) => {
        /*
 * It's best practice to use encodeURIComponent() to encode the name
 * string so the API server doesn't respond with 404.
 */
        pokedex.getPokemonByName(encodeURIComponent(A))
            .then((pokemon) => {
                let url;
                for(let x = 0; x < pokemon.length; x++){
                    if (Object.keys(pokemon[x]).includes("sprite")) {
                        url = pokemon[x].sprite;
                    }
                }
                if (url != null){
                    let id = A;
                    let type = url.slice(-4);
                    return request.get(url, (err, response, body) => {
                        if (!err && response.statusCode == 200){
                            process.stdin.on;
                            fs.writeFileSync("Imgs/" + A + type, body);
                            Image("Imgs/" + A + type);
                        }
                    })
                }
            })
            
    //})
}
NewGame("Onix")

/*term.singleColumnMenu(["New Game", "Saved Game"], (err, res) => {
    term("\n").eraseLineAfter.blue("Selected %s", res.selectedText)
    return NewGame();
})
*/
