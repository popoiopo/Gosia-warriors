/*
proxExtended.js

Wessel de Jong
10206620

Programmeerproject
Prox data 
*/

function proxGrapher(data, id) {
	var margin = {top: 10, right: 10, bottom: 250, left: 40},
	    margin2 = {top: 430, right: 10, bottom: 170, left: 40},
		width = 960 - margin.left - margin.right,
	    width2 = 960 - margin2.left - margin2.right,
	    height = 650 - margin.top - margin.bottom,
	    height2 = 650- margin2.top - margin2.bottom;

	var parseDate = d3.time.format("%a %b %d %Y %H:%M:%S").parse;

	var color = d3.scale.category10();

	color.domain(Object.keys(data));

	var floors = color.domain().map(function(floor) {
	return {
	  floor: floor,
	  values: data[floor]
	};
	});

	xDomain = [
				d3.min(floors, function(a) { return d3.min(a.values, function(b) {return b.date}); }),
				d3.max(floors, function(a) { return d3.max(a.values, function(b) {return b.date}); })
			];

	x2Domain = xDomain;

	yDomain = [
				d3.min(floors, function(c) { return d3.min(c.values, function(v) { return v.frequency; }); }),
				d3.max(floors, function(c) { return d3.max(c.values, function(v) { return v.frequency; }); })
			];

	y2Domain = yDomain;

	var x = d3.time.scale()
			.range([0, width])
			.domain(xDomain),
	    x2 = d3.time.scale()
	    	.range([0, width2])
	    	.domain(x2Domain);

	var y = d3.scale.linear()
			.range([height, 0])
			.domain(yDomain),
	    y2 = d3.scale.linear()
	    	.range([height2, 0])
	    	.domain(y2Domain);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var xAxis2 = d3.svg.axis()
	    .scale(x2)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var brush = d3.svg.brush()
	    .x(x2)
	    .on("brush", brushed);

	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.frequency); });

	var line2 = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return x2(d.date); })
	    .y(function(d) { return y2(d.frequency); });

	var svg = d3.select("body").append("svg")
		.attr("id", id)
		.attr("class", "svg")
		.attr("display", "none")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom);

	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  .append("rect")
	    .attr("width", width)
	    .attr("height", height);

	var focus = svg.append("g")
	    .attr("class", "focus")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var context = svg.append("g")
	    .attr("class", "context")
	    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

	var legend = svg.append("g")
	    .attr("class", "legend")
	    .attr("transform", "translate(" + margin2.left + 8 + "," + (height - margin2.bottom - 200) + ")");

	focus.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	focus.append("g")
	  .attr("class", "y axis")
	  .call(yAxis)
	.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .text("Detections");

	context.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height2 + ")")
	  .call(xAxis2);

	context.append("g")
	  .attr("class", "x brush")
	  .call(brush)
	.selectAll("rect")
	  .attr("y", -6)
	  .attr("height", height2 + 7);

	var floor = focus.selectAll(".floor")
	  .data(floors)
	.enter().append("g")
	  .attr("class", "floor");

	floor.append("path")
	  .attr("class", "line")
	  .attr("id", function(d) { return id + "_" + d.floor; })
	  .attr("clip-path", "url(#clip)")
	  .attr("d", function(d) { return line(d.values); })
	  .style("stroke", function(d) { return color(d.floor); });

	floor.append("text")
	  .datum(function(d) { return {floor: d.floor, value: d.values[d.values.length - 1]}; })
	  .attr("class", "label")
	  .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.frequency) + ")"; })
	  .attr("x", 3)
	  .attr("dy", ".35em")
	  .text(function(d) { return d.floor; });

	var floor2 = context.selectAll(".floor")
	  .data(floors)
	.enter().append("g")
	  .attr("class", "floor");

	floor2.append("path")
	  .attr("class", "line")
	  .attr("id", function(d) { return id + "_" + d.floor + "_slider"; })
	  .attr("d", function(d) { return line2(d.values); })
	  .style("stroke", function(d) { return color(d.floor); });

	legendItem = legend.selectAll('.floor')
	  .data(floors.map(function(d) { return d.floor; }).sort())
	.enter().append("g")
	  .attr("transform", function(d, i) { return "translate(0," + i*18 + ")"; })
	  .attr("class", "floor legend")
	  
	legendItem.append("rect")
	  .attr("width", 13)
	  .attr("height", 13)
	  .attr("fill", function(d) { return color(d); });

	legendItem.append("text")
	  .attr("x", 15)
	  .attr("y", 10.5)
	  .text(function(d) { return d; });

	function brushed() {
	  x.domain(brush.empty() ? x2.domain() : brush.extent());
	  focus.selectAll("path.line").attr("d", function(d) { return line(d.values); }); 
	  focus.select(".x.axis").call(xAxis);
	};

};











