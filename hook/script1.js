const pokemonListElement = document.getElementById('pokemons-list');
const loadMoreButton = document.getElementById('load-more-btn');
const searchInput = document.getElementById('search-input');
let limit = 20;
let offset = 0;
let allPokemons = []; // Armazenar todos os Pokémons carregados para filtrar na pesquisa

// Função para buscar Pokémons da API
const fetchPokemons = async () => {
    try {
        // URL da PokéAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        // Adiciona os Pokémons ao array allPokemons
        allPokemons = [...allPokemons, ...data.results];

        // Cria a lista de Pokémons
        displayPokemons(allPokemons);

        // Atualiza o offset para carregar mais Pokémons
        offset += limit;

    } catch (error) {
        console.error('Erro ao buscar Pokémons:', error);
        pokemonListElement.innerHTML = '<p style="color: red;">Erro ao carregar Pokémons. Tente novamente.</p>';
    }
};

// Função para exibir os Pokémons
const displayPokemons = (pokemons) => {
    pokemonListElement.innerHTML = ''; // Limpa a lista antes de renderizar

    pokemons.forEach(pokemon => {
        const pokemonItem = document.createElement('li');
        const pokemonLink = document.createElement('a');
        pokemonLink.href = pokemon.url;
        pokemonLink.textContent = pokemon.name;
        pokemonItem.appendChild(pokemonLink);
        pokemonListElement.appendChild(pokemonItem);
    });
};

// Função para filtrar Pokémons com base na pesquisa
const filterPokemons = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm)
    );
    displayPokemons(filteredPokemons);
};

// Carrega os Pokémons iniciais
fetchPokemons();

// Adiciona a funcionalidade do botão "Carregar mais"
loadMoreButton.addEventListener('click', () => {
    fetchPokemons();
});

// Adiciona a funcionalidade de busca ao digitar
searchInput.addEventListener('input', filterPokemons);
