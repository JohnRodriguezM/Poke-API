"use strict";

import { registerImage } from "./lazyLoading.mjs";

console.log(registerImage);

const d = document;

const $main = d.querySelector("main");
const $links = d.querySelector(".links");
const cards = d.querySelector(".cards");
const btn = d.getElementById("btnpaginacion");
const btnOcultar = d.getElementById("btnOcultar");
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
      let imgPokemonFront = datos.sprites.front_default;
      let imgPokemonBack = datos.sprites.back_default;
      let imgPokemonShiny = datos.sprites.front_shiny;

      let contenido = `
      <div class = "imgs" >
      <p style = "font-size: 20px">${
        datos.name.charAt(0).toUpperCase() + datos.name.slice(1)
      }</p>
        <div class="card">
        <figure >
        <img src="${imgPokemonFront}" alt=""> 
        </figure>
        <figure><img src="${imgPokemonBack}" alt=""></figure>
        <figure> <img src="${imgPokemonShiny}" alt=""></figure>
            </div>
        </div>
      `;
      cards.innerHTML += contenido;
     
    }
    d.addEventListener("click", (e) => {
      if (e.target === btnOcultar) {
        let cards = [...d.querySelectorAll(".card")];
        for (let el of cards) {
          el.style.display = "none";
        }
        getDataPokemon();
        location.reload();
      }
    });
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
    res.forEach((el, index) => {
      cards.innerHTML += `
     <div class = "names">
     <li class = "liPokeName">Pokemón ${index + 1}:</li>
     <li class = "li">${el.name.charAt(0).toUpperCase() + el.name.slice(1)}</li>
     </div>

        `;
    });

    // se ejecuta funcion que me trae la data de las url de cada pokemon
    d.addEventListener(
      "click",
      (e) => {
        if (e.target === btn) {
          getDatasPokemonesResults(res);
          let names = [...d.querySelectorAll(".names")];
          console.log(names);
          for (let el of names) {
            el.style.display = "none";
          }
        }
      },
      {
        once: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// activador de evento en el navegador

d.addEventListener("DOMContentLoaded", getDataPokemon, {
  once: true,
});


