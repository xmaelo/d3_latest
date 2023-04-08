// La version qu'on veut utiliser de d3 (ici la v3)
const d3 = window.d3v3;
// d pour data
import * as d from "../../data/Video_Games_Sales_as_at_22_Dec_2016.csv";


import * as d2 from "../../data/titles.csv";


let genres = {}
for (let i = d2.length - 1; i >= 0; i--) {
  const line = d2[i]
  const genreArr = line.genres.slice(2, line.genres.length-2).split("', '").filter(a => a != '')

  for (let j = genreArr.length - 1; j >= 0; j--) {
    const genre = genreArr[j]
    const genresTab = genres[genre] || []
    genresTab.push(line)
    genres = {...genres, [genre]: genresTab}
    
  }
}
let data = [];
for (const [key, value] of Object.entries(genres)) {
  data.push({name: key, value: value.length})
}


console.log('data data', data)


data = data.sort((a, b) => a.value - b.value);



/*----------- Dimension du graphe et des axes -----------*/
const margin = {
  top: 15,
  right: 0,
  bottom: 15,
  left: 200,
};

const width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

const svg = d3
  .select("#histogram")
  .append("svg")
  .attr("width", '80%')
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "coverH")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scale
  .linear()
  .range([0, width])
  .domain([
    0,
    d3.max(data, function (d) {
      return d.value;
    }),
  ]);

const y = d3.scale
  .ordinal()
  .rangeRoundBands([height, 0], 0.3)
  .domain(
    data.map(function (d) {
      return d.name;
    })
  );

let yAxis = d3.svg.axis().scale(y).tickSize(0).orient("left");
svg.append("g").attr("class", "yAxis").call(yAxis).style("stroke", "black");

/*----------- Création des barres -----------*/
const bars = svg.selectAll(".bar").data(data).enter().append("g");

bars
  .append("rect")
  .attr("class", "bar")
  .attr("y", function (d) {
    return y(d.name);
  })
  .style("stroke", "black")
  .attr("height", y.rangeBand())
  .attr("x", 0)
  .attr("width", function (d) {
    return x(d.value);
  });

// Chiffres de vente sur la droite des barres
bars
  .append("text")
  .attr("class", "label")
  .style("stroke", "black")
  .attr("y", function (d) {
    return y(d.name) + y.rangeBand() / 2 + 4;
  })

  .attr("x", function (d) {
    return x(d.value) + 3;
  })
  .text(function (d) {
    return d.value;
  });

// Animation
svg
  .selectAll("bar")
  .transition()
  .duration(800)
  .attr("y", function (d) {
    return yAxis(d.Value);
  })
  .attr("height", function (d) {
    return height - yAxis(d.Value);
  })
  .delay(function (d, i) {
    console.log(i);
    return i * 100;
  });
