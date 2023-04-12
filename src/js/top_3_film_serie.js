// La version qu'on veut utiliser de d3 (ici la v3)
const d3 = window.d3v3;
// d pour data

import * as d2 from "../../data/titles.csv";


const container = d3.select("#classment")

function draw(){
  const y =  d3.select("#year").property("value") || 2000
  if(String(y).length !=4) return
  let datayear = d2.filter(val => parseInt(val.release_year) == y);
  datayear = datayear.sort((a, b) => {
    if(b.imdb_score - a.imdb_score > 0){  
      return 1
    }
    if(b.imdb_score - a.imdb_score == 0 &&  (b.imdb_votes > a.imdb_votes)){  
      return 1
    }else{
      return -1
    }
    return -1
  })
  let films = datayear.filter(val => val.type === "MOVIE")
  let series = datayear.filter(val => val.type === "SHOW")
  console.log('films films', films)
  console.log('series series', series)
  films = films.slice(0, 3)
  series = series.slice(0, 3)

  d3.select("#topFims").remove()
  d3.select("#topShow").remove()



  const global_1 = container
      .insert('div') 
      .style("padding-top", '20px')
      .attr('id', 'topFims')

  global_1
      .insert('h4') 
      .attr("class", 'titre')
      .text('Films')

  const fims_row = global_1
      .insert('div')
      .attr('class', 'row')


  const global_2 = container
      .insert('div') 
      .style("padding-top", '20px')
      .attr('id', 'topShow')

  global_2
    .insert('h4') 
    .attr("class", 'titre')
    .text('Serries')

  const show_row = global_2
      .insert('div') 
      .attr('class', 'row')


  for (let i = 0; i < films.length; i++) {
    const film = films[i]

    const item = fims_row
      .insert('div')
      .attr("class", ' item')
      .style("margin-right", '30px')

    item
      .insert('div')
       .style("margin-bottom", '10px')
      .text(film.title)

    item
      .insert('div')
      .attr("class", 'topcard row')
      .text(i+1)
  }



  for (let i = 0; i < series.length; i++) {
    const film = series[i]

    const item = show_row
      .insert('div')
      .attr("class", ' item')
      .style("margin-right", '30px')

    item
      .insert('div')
       .style("margin-bottom", '10px')
      .text(film.title)

    item
      .insert('div')
      .attr("class", 'topcard row')
      .text(i+1)
  }

}


draw()

d3.select("#year")
      .on("change", function(e){
        console.log('change e', e)
        draw();
      })