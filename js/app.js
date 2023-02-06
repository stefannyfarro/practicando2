const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F'
};

 
const inputTexto = document.getElementById("pokemon");
const btnBuscar = document.getElementById("btnBuscar")


inputTexto.addEventListener("keypress",(event)=>{
        if(event.which==13){
            if(inputTexto.value===""){
                mostrarAlerta("Ingrese el nombre de un pokemón","error")
                return;
              }
              obtenerData();
        }                  
})


btnBuscar.onclick = function(){
    if(inputTexto.value===""){
      mostrarAlerta("Ingrese el nombre de un pokemón","error")
      return;
    }
    obtenerData();
};

function obtenerData(){
       let valor = inputTexto.value.toLowerCase();
       let url = `https://pokeapi.co/api/v2/pokemon/${valor}`;

       pintarSpinner(document.querySelector(".contenedor-input"));
       
       fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            setTimeout(() => {
                pintarPokemon(datos);
            }, 3000);
        })
        .catch(err => {
            setTimeout(() => {
                pokemonNoEncontrado();
            }, 1500);
        });
}



function pintarPokemon(datos){
        const {id,name,types,base_experience,weight,height,sprites:{other:{home:{front_default}}}} = datos;
        let nombreParseado = name.slice(0,1).toUpperCase().concat(name.slice(1,name.length));
        
        let pokemon = `
               <h3>${nombreParseado}</h3>
               <div class="card-img">
                   <img src="${front_default}" alt="${name}">
               </div>
               <div class="card-content">
                  <p>N-°<span>${id}</span></p>
                  <p>Exp: <span>${base_experience}</span></p>
                  <p>Peso: <span>${weight}</span></p>
                  <p>Alto: <span>${height}</span></p>
              </div>
        `;

        document.querySelector(".card").innerHTML = pokemon;
        pintarTipo(types);

}




function pintarTipo(tipos){

     const divTipo = document.createElement("div");
     divTipo.classList.add("card-tipo")

     tipos.forEach((tipo)=>{
           const {type:{name}} = tipo;
           const tipoSpan = document.createElement("span");
           tipoSpan.textContent = name;
           tipoSpan.style.background = typeColors[name]?typeColors[name]:typeColors.default;
           divTipo.appendChild(tipoSpan);
           document.querySelector(".card").appendChild(divTipo);
     });
}

function pokemonNoEncontrado(){   
            let texto = `  
               <h3 id="bp">Pokemon no encontrado</h3>
             <div class="card-inner">
                 <div class="card-img">
                    <img src="../img/pokeShadow.png"alt="">
                </div>
                <div class="card-content">
                     <img src="../img/pokemon-what.gif" alt="">
                </div>
             </div>`;

             document.querySelector(".card").innerHTML = texto;
}

function pintarSpinner(elemento){
    let existeSpinner = document.querySelector(".spinner");
    if(!existeSpinner){
        const divSpin = document.createElement("div");
        divSpin.classList.add("spinner"); 
        let texto = `<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>`
        divSpin.innerHTML = texto;
        elemento.appendChild(divSpin);

        setTimeout(()=>{
            document.querySelector(".spinner").remove();
        },3000)
    }   
}

function mostrarAlerta(mensaje,tipo){

    const existeParrafo = document.querySelector(".ps");

    if(!existeParrafo){
        const parrafo = document.createElement("p");
        parrafo.classList.add("ps");
        if(tipo==="error"){
           parrafo.classList.add("error");
           parrafo.textContent = mensaje;
           document.querySelector(".contenedor-input").appendChild(parrafo);
        }

        if(tipo==="success"){
           parrafo.classList.add("success");
           parrafo.textContent = mensaje;
           document.querySelector(".contenedor-input").appendChild(parrafo);
        }  
       
        setTimeout(() => {
            parrafo.remove();
        }, 3000);
    }
  
}
