"use strict";

const d = document;

const $main = d.querySelector("main");
const $links = d.querySelector(".links");
const cards = d.querySelector(".cards");
const btn = d.getElementById("btn-paginacion");
// hago el proceso desde la primera api que es la basica
let urll = "https://pokeapi.co/api/v2/pokemon/";
let pokeForm = "https://pokeapi.co/api/v2/pokemon-form/";

// nivel de profundidad = 3

// añadir más, grado de profundidad super detallado
const getData_forImg = async (dataDeData) => {
  try {
    for (let j = 1; j < dataDeData.length; j++) {
      let peticion = await fetch(`${pokeForm}${j}`);
      let datos = await peticion.json();
      console.log(datos);
      console.log(datos.name);
      let imgPokemon = datos.sprites.front_default;
      cards.innerHTML += `
        <div class="card">
        <li>${datos.name}</li>
            <img src="${imgPokemon}" alt="">
            </div>
        </div>
        `;
    }
  } catch (err) {
    console.log(err);
  }
};

// nivel de profundidad = 1

// añadir mas cosas, segundo grado de profundidad para mostrar paginación
const getDatasPokemonesResults = async (data) => {
  try {
    for (let i = 1; i < data.length; i++) {
      let pokemones = `${urll}${i}`;
      let peticion = await fetch(pokemones);
      let datos = await peticion.json();
      console.log(datos.forms);
    }
    getData_forImg(data);
  } catch (err) {}
};

// nivel de profundidad = 0

// primer grado para mostrar paginación ----
const getDataPokemon = async () => {
  try {
    let peticion = await fetch(urll);
    let data = await peticion.json();
    // variable para guardar la data
    let res = data.results;
    console.log(res);
    res.forEach((el) => {
      cards.innerHTML += `
     <div class = "names">
     <li class = "li">${el.name} -----</li></div> 

        `;
    });

    
    // se ejecuta funcion que me trae la data de las url de cada pokemon
    getDatasPokemonesResults(res);
} catch (err) {
    console.log(err);
}
};

// activador de evento en el navegador
d.addEventListener("DOMContentLoaded", getDataPokemon);

