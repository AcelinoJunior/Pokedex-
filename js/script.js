
//variavel global 
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


//let que armazena o numero inicial
let searchPokemon = 1;


//fetch  buscar recursos de forma assíncrona através da rede
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
//o await faz com quem espere um tempo para que o fetch se desenvolva somente em função assincrona
  

//fazer a validação 
if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}
//função para redenrizar o pokemon atras do API 
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
//fazer validação para mostrar o pokemon somente se existir
  if (data) {

    
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    //para continuar o botao de onde parou
    searchPokemon = data.id;
  } else {
      //para quando mudar a imagem nao selecionar a imagem
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());//to lower case para quando inicar agora
});
//validação para nao voltar em numero negativo no botao prev
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  //para renderezin o proximo pokemon
});
//quando executar a tela
renderPokemon(searchPokemon);