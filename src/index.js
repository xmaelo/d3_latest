import  "./js/nombre_fils_serie_produit_par_pays"
import  "./js/top_3_film_serie"
import  "./js/les_genres_les_plus_populaire"
import  "./js/quantite_film_disponible"


const d3 = window.d3v3;

d3.select(window).on("load", () => {
	setTimeout(() => {
		d3.select("#animted").classed("go", true);
		onCome()
	}, 2000)

	d3.select("#zero").on("click", function() {
		onShwoCarousel(true)
	})
	d3.select("#one").on("click", function() {
		const dom = document.getElementsByClassName("next")
  		onShwoCarousel(true)
  		dom[0].click();
	})
	d3.select("#two").on("click", function() {
		const dom = document.getElementsByClassName("next")
		onShwoCarousel(true)
  		dom[0].click();
  		dom[0].click();
	})

	d3.select("#choix").on("click", function() {
		onShwoCarousel(false)
	})
	d3.select("#tree").on("click", function() {
		const dom = document.getElementsByClassName("next")
		onShwoCarousel(true)
  		dom[0].click();
  		dom[0].click();
  		dom[0].click();
	})
});

function onCome(){
	setTimeout(() => {
		d3.select("#animted").classed("height-0", true);
		d3.select("#choice").classed("height-0", false);
		d3.select("#choice").classed("h-full", true);
		d3.select("#choice").classed("come", true);
	}, 4000)
}

function onShwoCarousel(state){
	d3.select("#choice").classed("h-full", !state);
	d3.select("#choice").classed("transition", state);
	d3.select("#choice").classed("height-0", state);
	d3.select("#choice").classed("come", !state);
	d3.select("#choice").classed("opacity-0", state);

	d3.select("#carousel").classed("height-0", !state);
	d3.select("#carousel").classed("h-full", state);
	d3.select("#carousel").classed("go2", !state);
	d3.select("#carousel").classed("come", state);
}