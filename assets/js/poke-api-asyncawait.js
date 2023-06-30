const pokeApiAsync = {};

pokeApiAsync.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    //const response = await (await fetch(url)).json();
    //const listaDePokemon = response.results;
    return await (await fetch(url)).json();
}