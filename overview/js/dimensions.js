$(".button").click(function() {
    window.location = this.value;
});

var margin = {top: 20, bottom: 50, left: 60, right: 20};
var width = 1100 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var dateFormat = d3.time.format("%Y-%m-%d %X");

var svg = {
    general: d3.select("#general-div").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    f1: d3.select("#f1-div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    f2: d3.select("#f2-div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    f3: d3.select("#f3-div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
};

var x = {
    general: d3.time.scale()
                .range([0, width]),
    f1: d3.time.scale()
            .range([0, width]),
    f2: d3.time.scale()
            .range([0, width]),
    f3: d3.time.scale()
            .range([0, width])
};

var y = {
    general: d3.scale.linear()
                .range([height, 0]),
    f1: d3.scale.linear()
            .range([height, 0]),
    f2: d3.scale.linear()
            .range([height, 0]),
    f3: d3.scale.linear()
            .range([height, 0])
};

var xAxis = {
    general: d3.svg.axis()
                .scale(x.general)
                .orient("bottom")
                .ticks(14),
    f1: d3.svg.axis()
            .scale(x.f1)
            .orient("bottom")
            .ticks(14),
    f2: d3.svg.axis()
            .scale(x.f2)
            .orient("bottom")
            .ticks(14),
    f3: d3.svg.axis()
            .scale(x.f3)
            .orient("bottom")
            .ticks(14)
};

var yAxis = {
    general: d3.svg.axis()
                .scale(y.general)
                .orient("left"),
    f1: d3.svg.axis()
            .scale(y.f1)
            .orient("left"),
    f2: d3.svg.axis()
            .scale(y.f2)
            .orient("left"),
    f3: d3.svg.axis()
            .scale(y.f3)
            .orient("left")
};

var line = {
    general: d3.svg.line()
                .x(function(d) {return x.general(d.timestamp);})
                .y(function(d) {return y.general(d.val);}),
    f1: d3.svg.line()
            .x(function(d) {return x.f1(d.timestamp);})
            .y(function(d) {return y.f1(d.val);}),
    f2: d3.svg.line()
            .x(function(d) {return x.f2(d.timestamp);})
            .y(function(d) {return y.f2(d.val);}),
    f3: d3.svg.line()
            .x(function(d) {return x.f3(d.timestamp);})
            .y(function(d) {return y.f3(d.val);})
};

// Bron: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
function isArray(variable) {
    return (!!variable) && (variable.constructor === Array);
}

// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}
