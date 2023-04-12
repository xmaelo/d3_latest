// La version qu'on veut utiliser de d3 (ici la v3)
const d3 = window.d3v3;
// d pour data

import * as d2 from "../../data/titles.csv";


let countries = {}
for (let i = d2.length - 1; i >= 0; i--) {
  const line = d2[i]
  const countrieArr = line.production_countries.slice(2, line.production_countries.length-2).split("', '").filter(a => a != '')

  for (let j = countrieArr.length - 1; j >= 0; j--) {
    const country = countrieArr[j]
    const countryTab = countries[country] || []
    countryTab.push(line)
    countries = {...countries, [country]: countryTab}
    
  } 
}
let data = [];
for (const [key, value] of Object.entries(countries)) {
  data.push({name: key, value: value.length, movie: value.filter(v=> v.type ==="MOVIE").length, show: value.filter(v=> v.type ==="SHOW").length })
}



data = data.sort((a, b) => b.value - a.value).slice(0, 7);



/*----------- Dimension du graphe et des axes -----------*/
const margin = {
  top: 15,
  right: 40,
  bottom: 15,
  left: 200,
};

const width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

const container = d3
	.select("#doubleBar")

for (let i = data.reverse().length - 1; i >= 0; i--) {
	const countryData = data[i]

	const row = container
		.insert('div')
		.style("padding-top", '10px')
		.attr('class', 'row')

	const span = row.insert('span')
		.attr('class', 'pr-50')
		.text(countryData.name)

	const bar2 = row.insert('div')
		.attr('class', 'row bar2')

	bar2.insert('div')
		.attr('class', 'char1 row')
		.style("width", (countryData.movie * 100)/countryData.value +'%')
		.text(countryData.movie)

	bar2.insert('div')
		.attr('class', 'char2 row')
		.style("width", (countryData.show * 100)/countryData.value +'%')
		.text(countryData.show)

	row.insert('span')
		.attr('class', 'pl-50')
		.text(countryData.value)
}
