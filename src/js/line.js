
const d3 = window.d3v3;
import * as data1 from "../../data/titles.csv";
import * as disney from "../../data/disney_plus_titles.csv";
import * as amazon from "../../data/amazon_prime_titles.csv";

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
   .ticks(1);

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10000);

var svg = d3.select("#verticalBar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("../../data/titles.csv", function(error, data) {

const data = [
  {value: disney.length, label: 'Disney', xAxis: 1},
  {value: amazon.length, label: 'Amazon', xAxis: 3},
  {value: data1.length, label: 'Netflix', xAxis: 2},
]
    
  
x.domain(data.map(function(d) { return d.xAxis; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis)
//   .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em")
//     .style("visibility", "hidden")
//     .text("Value ($)");

svg.selectAll("bar")
    .data(data)
  .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d) { return x(d.xAxis); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .html(' <text x="20" y="35" class="small">My</text>')
   

