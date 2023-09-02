/*TRANSICIÓN CLASE ACTIVE BOTÓN BARRA LATERAL*/
const contenedor = document.querySelector("#contenedor");
document.querySelector("#boton-menu").addEventListener("click", () => {
contenedor.classList.toggle("active");
});

/*DETECTAMOS CUANDO EL USUARIO CAMBIA EL TAMAÑO DEL DISPOSITIVO MÓVIL*/
comprobarAncho = () =>{
	if(window.innerWidth <= 768 ){ //Si el ancho interno de la ventana es menor a 768, quitamos la clase active
		contenedor.classList.remove("active")
	}
	else{
		contenedor.classList.add("active") //Si no, colocamos la clase active
	}
}
window.addEventListener("resize", ()=>{ //Cuando la ventana cambie de tamaño
	comprobarAncho();
})
comprobarAncho();

/*FILTRO BOTONES LATERALES*/
const filtrosTipo = document.querySelectorAll(".btnFiltro");
filtrosTipo.forEach(boton => boton.addEventListener("click",(event)=>{
const idBoton = event.currentTarget.id
console.log(idBoton)
const cargarfiltro = async () =>{
	const respuesta = await fetch(url);
	const datos = await respuesta.json();
	let btnCategoria = datos.filter(pokemon=>pokemon.type.some(tipo => tipo.includes(idBoton)))
	
	if(idBoton === "todos") {
		cargarpokemon(datos);
	} else {
		if (btnCategoria) {
			cargarpokemon(btnCategoria)
		}
	}
}
cargarfiltro()
}))


/*BUSQUEDA*/
const url = "https://raw.githubusercontent.com/oicrruf/g15-computer-science/develop/ejercicios/pokedex-registro/json/pokemon.json";
let buscar = document.getElementById("input")
const peticion = async () =>{
	let buscar = document.getElementById("input").value
	const respuesta = await fetch(url);
	const datos = await respuesta.json();
	let filtro = datos.filter(pokemon => pokemon.name.toLowerCase().includes(buscar.toLowerCase()))

	cargarpokemon(filtro)
}		
peticion();		
buscar.addEventListener('keyup', peticion)
	

/*DIBUJAR LAS IMÁGENES */
const cargarpokemon = async (datos) =>{
	try {
		document.getElementById("main").innerHTML = '';
		datos.filter(pokemon =>{
			let tipos = pokemon.type.join(' ')
			let fondo = pokemon.type.slice(0,1)
			let tipos1 = `<p tipo">${fondo}</p>`
			console.log(tipos1)
			let debilidades = pokemon.weakness.join(', ')

			let div = document.createElement("div");
			div.classList.add("elemento");
			div.innerHTML+= `
				<div class="tarjetas ${fondo}" id="tarjetas" href="#" style="background-image: url('${pokemon.ThumbnailImage}')">
					<div class="textos" data_tipo='${tipos.toUpperCase()}'>
						<h3>${pokemon.name.toUpperCase()}</h3>
						<p>${tipos.toUpperCase()}</p>
					</div>
				</div>
			    `
			document.querySelector("#main").appendChild(div);
			div.addEventListener("click", () =>{
			let overlay = document.getElementById('overlay')
			overlay.classList.add('active')
			overlay.innerHTML=`	
			<div class="popup" id="popup">
				<a href="#" class="cerrar-popup" id="cerrar-popup"><i class="fas fa-times"></i></a>
				<div class="titulo">
					<h3>${pokemon.name.toUpperCase()}</h3>
				</div>
				<div class="imagenPokemon ${fondo}" style="background-image: url('${pokemon.ThumbnailImage}')">
					<p>${tipos.toUpperCase()}</p>
					<p># ${pokemon.number}</p>			                  
				</div>  
				<div class="atributos">
					<p><b>Especie:</b> ${pokemon.ThumbnailAltText}</p>
					<hr/>
					<p><b>Altura:</b> ${pokemon.height}</p>
					<hr/>
					<p><b>Peso:</b> ${pokemon.weight}</p>
					<hr/>
					<p><b>Habilidades:</b> ${pokemon.abilities}</p>
					<hr/>
					<p><b>Debilidades:</b> ${debilidades}</p>
				</div>   
			</div>	
			`
			let popup = document.getElementById('popup')
			popup.classList.add('active')

			let btnCerrarPopup = document.getElementById('cerrar-popup')
			btnCerrarPopup.addEventListener('click', function(){
			overlay.classList.remove('active')
			popup.classList.remove('active')
			})
		})					 
	});	
	} catch (error){
		console.log(error)
	}
}


