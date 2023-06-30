const pokeApiThen = {};

function transferPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types;
    pokemon.mainType = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApiThen.getPokemonDetail = async (pokemon) => {
    const pokeApiDetail = await (await fetch(pokemon.url)).json()
    return transferPokeApiDetailToPokemon(pokeApiDetail);
}

pokeApiThen.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
            .then ((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApiThen.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
            .catch((error) => console.error(error))
}