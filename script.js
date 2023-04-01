const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEB00',
    normal: '#2B2B29',
    fire: '#FF0000',
    water: '#00A9FF',
    ice: '#9ED9F7',
    rock: '#4B5D66',
    flying: '#99ABB5',
    grass: '#11AE19',
    psychic: '#581845',
    ghost: '#A9095C',
    bug: '#E4752B',
    poison: '#0C0907',
    ground: '#3C1901',
    dragon: '#16A96F',
    steel: '#6F7D78',
    fighting: '#002EF8',
    default: '#513939',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
    }


const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `No. ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 30%, ${colorOne} 30%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
       const typeTextElement = document.createElement("div"); 
       typeTextElement.style.color = typeColors[type.type.name];
       typeTextElement.textContent = type.type.name;    
       pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
       const statElement = document.createElement("div");
       const statElementName = document.createElement("div");
       const statElementAmount = document.createElement("div");
       statElementName.textContent = stat.stat.name;
       statElementAmount.textContent = stat.base_stat;
       statElement.appendChild(statElementName);
       statElement.appendChild(statElementAmount);
       pokeStats.appendChild(statElement);

    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute = ('src', 'pokeshadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}