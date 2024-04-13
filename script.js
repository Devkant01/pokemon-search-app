// 3rd page values
const id = document.querySelector('#pokemon-id');
const types = document.querySelector('#types');
const img = document.querySelector('#sprite');
const pName = document.querySelector('#pokemon-name');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const hp = document.querySelector('#hp');
const speed = document.querySelector('#speed');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const sAttack = document.querySelector('#special-attack');
const sDefense = document.querySelector('#special-defense');

const firstPage = document.querySelector('#front-page');
const secondPage = document.querySelector('#middle-page');
const thirdPage = document.querySelector("#last-page");
const keyForFirstPage = document.querySelector('.fa-arrow-left-long');
const keyForSecondPage = document.querySelector('.searchbtn');
const keyForThirdPage = document.querySelector('#search-button');
const searchPoke = document.querySelector('#search-input');
const searchPokebtn = document.querySelector('#search-button');
const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`

// onclick pageChage effects
keyForFirstPage.addEventListener('click', () => {
    firstPage.style.display = "block";
    secondPage.style.display = "none";
    thirdPage.style.display = "none";
})

keyForSecondPage.addEventListener('click', () => {
    firstPage.style.display = "none";
    secondPage.style.display = "block";
    thirdPage.style.display = "none";
})

function goToThirdPage() {
    firstPage.style.display = "none";
    secondPage.style.display = "none";
    thirdPage.style.display = "block";
}

// by entering into searchbox
searchPoke.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        const pokeId = searchPoke.value;
        if (pokeId == '') {
            alert("enter Pokémon's name or id number.");
        }
        else {
            dataCall(pokeId.toLowerCase());

        }
    }

})

// async/await function
async function dataCall(PokeId) {
    const api = `${url}${PokeId}`;
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new error("Error Occured While fetching API");
        }
        const data = await response.json();
        console.log(data);
        // data updation on 3rd page
        id.innerHTML = `<span class="hideIt">#</span>${data.id}`;
        types.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('/');
        img.src = `${data.sprites.front_default}`;
        pName.innerHTML = data.name;

        // box values
        weight.innerHTML = data.weight;
        height.innerHTML = data.height;
        hp.innerHTML = data.stats[0].base_stat;
        speed.innerHTML = data.stats[5].base_stat;
        attack.innerHTML = data.stats[1].base_stat;
        defense.innerHTML = data.stats[2].base_stat;
        sAttack.innerHTML = data.stats[3].base_stat;
        sDefense.innerHTML = data.stats[4].base_stat;


        goToThirdPage();
    }
    catch (error) {
        console.log("Some error occured: ", error.message);
        alert("Pokémon not found");

    }

}

// actual functions
searchPokebtn.addEventListener('click', (e) => {
    e.preventDefault();
    const pokeId = searchPoke.value;
    if (pokeId == '') {
        alert("enter Pokémon's name or id number.");
    }
    else {
        dataCall(pokeId.toLowerCase());

    }
})