

 // define dimensions of chart
var margin = {top: 40, right: 30, bottom: 100, left: 100};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

 // define format of date data
var date_format = d3.time.format("%d-%m-%y %H:%M").parse;

// date format for tooltip
var tooltip_format = d3.time.format("%a %d %b %H:%M");

var color = d3.scale.category10();

// create linegraph
var graph = d3.select("#linegraph")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("MCBuildingProxSensorData/csv/hazium_data.csv", function(error, data) {
  if (error) alert("Error loading data!");


  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Time"; }));

   // convert data
  data.forEach(function(d){
    d.Time = date_format(d.Time);
    d.F_2_Z_2 = + d.F_2_Z_2;
    d.F_1_Z_8A = + d.F_1_Z_8A;
    d.F_2_Z_4 = + d.F_2_Z_4;
    d.F_3_Z_1 = + d.F_3_Z_1;
  })

  var zones = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.Time, Hazium: +d[name]};
      })
    };
  });
 
  // get min and max of axis
  xDomain = d3.extent(data, function(d) { return d.Time; });
  yDomain =  [
                d3.min(zones, function(c) { return d3.min(c.values, function(v) { return v.Hazium; }); }),
                d3.max(zones, function(c) { return d3.max(c.values, function(v) { return v.Hazium; }); })
              ];

  // define x-scale
  var x = d3.time.scale()
   .range([0, width])
   .domain(xDomain);

// define y-scale
  var y = d3.scale.linear()
    .range([height, 0])
    .domain(yDomain);

   // define x-axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.time.format("%a %d"))
    .orient("bottom");

  // define y-axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .outerTickSize(0);

  // define line in line graph
  var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {  return x(d.date); })
    .y(function(d) {  return y(d.Hazium); });

  // add x-axis
  graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-40)" 
                });

  // add y-axis
  graph.append("g")
   	.attr("class", "y axis")
   	.call(yAxis)
    // add y-axis title
	.append("text")
   	.attr("transform", "rotate(-90)")
   	.attr("y", 6)
   	.attr("dy", ".71em")
   	.style("text-anchor", "end")
   	.text("Hazium concentration");

  var zone = graph.selectAll(".zone")
      .data(zones)
    .enter().append("g")
      .attr("class", "zone");

  zone.append("path")
      .attr("class", "line")
      .attr("d", function(d) {return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  zone.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.Hazium) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

    // add interactivity
    var crosshair = graph.append('g').style('display', 'none');
    
    // define crosshair and tooltip
      crosshair.append('line')
          .attr('id', 'focusLineX')
          .attr('class', 'focusLine');
      crosshair.append('line')
          .attr('id', 'focusLineY')
          .attr('class', 'focusLine');
      crosshair.append('circle')
          .attr('id', 'focusCircle_F_2_Z_2')
          .attr('r', 3)
          .attr('class', 'circle focusCircle');
      crosshair.append('circle')
          .attr('id', 'focusCircle_F_2_Z_4')
          .attr('r', 3)
          .attr('class', 'circle focusCircle');
      crosshair.append('circle')
          .attr('id', 'focusCircle_F_1_Z_8A')
          .attr('r', 3)
          .attr('class', 'circle focusCircle');
      crosshair.append('circle')
          .attr('id', 'focusCircle_F_3_Z_1')
          .attr('r', 3)
          .attr('class', 'circle focusCircle');
      crosshair.append("div")
          .attr("id", "tooltip")
          .style("stroke", "white")
          .style("stroke-width", "3.5px")
          .style("visibility", "hidden")
          .attr("dx", 8)
          .attr("dy", "-.3em");

    var bisectDate = d3.bisector(function(d) { return d.Time; }).left;

    // add tooltip
    var tooltip = d3.select("body")
    	.append('div')
    		.style("visibility", "hidden")
    	.attr("id", "tooltip");
    	
    graph.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', function() { crosshair.style('display', null); })
            .on('mouseout', function() { 
            	crosshair.style('display', 'none');
            	tooltip.style("visibility", "hidden") 
            })
            .on('mousemove', function() { 
                var mouse = d3.mouse(this);
                var mouseDate = x.invert(mouse[0]);
                var i = bisectDate(data, mouseDate); // returns the index to the current data item

                var d0 = data[i - 1]
                var d1 = data[i];
                // work out which date value is closest to the mouse
                var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;

                // coordinates of
                var x_coor = x(d.Time);
                var y_F_2_Z_2 = y(d.F_2_Z_2);
                var y_F_2_Z_4 = y(d.F_2_Z_4);
                var y_F_1_Z_8A = y(d.F_1_Z_8A);
                var y_F_3_Z_1 = y(d.F_3_Z_1);

                crosshair.select('#focusCircle_F_2_Z_2')
                      .attr('cx', x_coor)
                      .attr('cy', y_F_2_Z_2);
                  crosshair.select('#focusCircle_F_2_Z_4')
                      .attr('cx', x_coor)
                      .attr('cy', y_F_2_Z_4);
                  crosshair.select('#focusCircle_F_1_Z_8A')
                      .attr('cx', x_coor)
                      .attr('cy', y_F_1_Z_8A);
                  crosshair.select('#focusCircle_F_3_Z_1')
                      .attr('cx', x_coor)
                      .attr('cy', y_F_3_Z_1);
                  crosshair.select('#focusLineX')
                      .attr('x1', x_coor).attr('y1', y(yDomain[0]))
                      .attr('x2', x_coor).attr('y2', y(yDomain[1]));
                  crosshair.select('#focusLineY')
                      .attr('x1', x(xDomain[0])).attr('y1', y_F_2_Z_2)
                      .attr('x2', x(xDomain[1])).attr('y2', y_F_2_Z_2);

                // show tooltip	
	            tooltip.style("visibility", "visible");		
	         	// text in tooltip
	            tooltip.html("<b> Date: </b>" + tooltip_format(d.Time) + "<br/> <b> Floor 1 Zone 8A: </b>" + d.F_1_Z_8A + "<br/> <b> Floor 2 Zone 2: </b>" + d.F_2_Z_2 + "<br/> <b> Floor 2 Zone 4: </b>" + d.F_2_Z_4 + "<br/> <b> Floor 3 Zone 1: </b>" + d.F_3_Z_1)	
	                   .style("left", (d3.event.pageX) + 20 + "px")		
	                   .style("top", 150 + "px");   

            });

});
