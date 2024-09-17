const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTypes = document.querySelector('.pokemon__types');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const shinyButton = document.querySelector('.shinybutton'); 

let searchPokemon = 1;
let isShiny = false; 

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    let imageUrl = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    if (isShiny) {
      if (data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']) {
        imageUrl = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
      } else {
        alert(`Shiny version not available for ${data.name}`);
      }
    }

    pokemonImage.src = imageUrl;

    input.value = '';
    searchPokemon = data.id;

    let typeList = '';
    data.types.forEach((type) => {
      typeList += `<div class="type-box ${type.type.name}">${type.type.name}</div>`;
    });
    pokemonTypes.innerHTML = typeList;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not Found :(';
    pokemonNumber.innerHTML = '';
    input.value = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

shinyButton.addEventListener('mousedown', () => {
  isShiny = true;
  renderPokemon(searchPokemon); // Re-render with shiny flag
});

shinyButton.addEventListener('mouseup', () => {
  isShiny = false;
  renderPokemon(searchPokemon); // Re-render with normal flag
});

renderPokemon(searchPokemon);