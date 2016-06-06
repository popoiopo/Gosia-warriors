var margin = {top: 20, bottom: 50, left: 60, right: 20};
var width = 1100 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var dateFormat = d3.time.format("%Y-%m-%d %X");

var svg = {
    general: d3.select("#general-div").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
};

var x = {
    general: d3.time.scale()
                .range([0, width])
};

var y = {
    general: d3.scale.linear()
                .range([height, 0])
};

var xAxis = {
    general: d3.svg.axis()
                .scale(x.general)
                .orient("bottom")
                .ticks(14)
};

var yAxis = {
    general: d3.svg.axis()
                .scale(y.general)
                .orient("left")
};

var line = {
    general: d3.svg.line()
                .x(function(d) {return x.general(d.timestamp);})
                .y(function(d) {return y.general(d.val);})
};
