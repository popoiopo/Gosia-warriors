/*
* Team Gosia Warriors
* Gedeelde file voor general.html, floor1.html, floor2.html en floor3.html
*/

// Redirect bij druk op de knop
$(".button").click(function() {
    window.location = this.value;
});

// Maak eerst alle divs onzichtbaar, want
$(".floor-graphs-div").css("display", "none");

// maak ze alleen zichtbaar bij een druk op een van de floor knoppen
$(".floor-button").click(function() {
    // Geef aan welke knop is aangeklikt
    $(".floor-button").not(this).each(function() {
        $(this).css("background-color", "blue");
    });
    $(this).css("background-color", "red");

    $(".floor-graphs-div").css("display", "none");
    $("#floor-graphs-" + this.value).css("display", "");

    // Houd bij in een onzichtbare paragraph welke verdieping geshowd wordt
    $("#current-visible-floor").html($(this).attr("number"));
});

// Afmetingen van de svg op de pagina
var margin = {top: 10, bottom: 175, left: 60, right: 20};
var width = 1100 - margin.left - margin.right;
var height = 550 - margin.top - margin.bottom;

var brushMargin = {top: 430, right: 20, bottom: 50, left: 60};
var brushHeight = 550 - brushMargin.top - brushMargin.bottom;

// Functie om de datum van de JSON om te zetten naar javascript Date
var dateFormat = d3.time.format("%Y-%m-%d %X");
var csvDateFormat = d3.time.format("%d-%m-%Y %H:%M");

// svg elementen voor elk van de vier pagina's
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

// x schalen voor elk van de vier pagina's
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

// x schalen voor de brush op elke pagina
var brushX = {
    general: d3.time.scale()
                .range([0, width]),
    f1: d3.time.scale()
            .range([0, width]),
    f2: d3.time.scale()
            .range([0, width]),
    f3: d3.time.scale()
            .range([0, width])
};

// y schalen voor elk van de vier pagina's
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

// y schalen voor de brush op elke pagina
var brushY = {
    general: d3.scale.linear()
                .range([brushHeight, 0]),
    f1: d3.scale.linear()
            .range([brushHeight, 0]),
    f2: d3.scale.linear()
            .range([brushHeight, 0]),
    f3: d3.scale.linear()
            .range([brushHeight, 0])
};

// x assen voor elk van de vier pagina's
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

// x as voor de brush op elke pagina
var brushXAxis = {
    general: d3.svg.axis()
                .scale(brushX.general)
                .orient("bottom")
                .ticks(14),
    f1: d3.svg.axis()
            .scale(brushX.f1)
            .orient("bottom")
            .ticks(14),
    f2: d3.svg.axis()
            .scale(brushX.f2)
            .orient("bottom")
            .ticks(14),
    f3: d3.svg.axis()
            .scale(brushX.f3)
            .orient("bottom")
            .ticks(14)
};

// y assen voor elk van de vier pagina's
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

// Lijnen voor elk van de vier pagina's adhv hun schalen
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

// Lijnen van de brush op elke pagina
var brushLine = {
    general: d3.svg.line()
                .x(function(d) {return brushX.general(d.timestamp);})
                .y(function(d) {return brushY.general(d.val);}),
    f1: d3.svg.line()
            .x(function(d) {return brushX.f1(d.timestamp);})
            .y(function(d) {return brushY.f1(d.val);}),
    f2: d3.svg.line()
            .x(function(d) {return brushX.f2(d.timestamp);})
            .y(function(d) {return brushY.f2(d.val);}),
    f3: d3.svg.line()
            .x(function(d) {return brushX.f3(d.timestamp);})
            .y(function(d) {return brushY.f3(d.val);})
};

// Callback functie voor als de brush wordt gebruikt
var brushed = {
    general: function() {
        x.general.domain(brush.general.empty() ? brushX.general.domain() : brush.general.extent());
        focus.general.selectAll("path.lines-general").attr("d", line.general);
        focus.general.select("#general-x-axis").call(xAxis.general);
    },
    f1: function() {
        x.f1.domain(brush.f1.empty() ? brushX.f1.domain() : brush.f1.extent());
        focus.f1.selectAll("path.lines-f1").attr("d", line.f1);
        focus.f1.select("#f1-x-axis").call(xAxis.f1);
    },
    f2: function() {
        x.f2.domain(brush.f2.empty() ? brushX.f2.domain() : brush.f2.extent());
        focus.f2.selectAll("path.lines-f2").attr("d", line.f2);
        focus.f2.select(".x.axis").call(xAxis.f2);
    },
    f3: function() {
        x.f3.domain(brush.f3.empty() ? brushX.f3.domain() : brush.f3.extent());
        focus.f3.selectAll("path.lines-f3").attr("d", line.f3);
        focus.f3.select(".x.axis").call(xAxis.f3);
    }
};

// De brush zelf op elke pagina
var brush = {
    general: d3.svg.brush()
                .x(brushX.general)
                .on("brush", brushed.general),
    f1: d3.svg.brush()
            .x(brushX.f1)
            .on("brush", brushed.f1),
    f2: d3.svg.brush()
            .x(brushX.f2)
            .on("brush", brushed.f2),
    f3: d3.svg.brush()
            .x(brushX.f3)
            .on("brush", brushed.f3)
};

// Het canvas waarop de lijnen getekend worden
var focus = {
    general: svg.general.append("g")
                .attr("transform", "translate(0," + margin.top + ")"),
    f1: svg.f1.append("g")
                .attr("transform", "translate(0," + margin.top + ")"),
    f2: svg.f2.append("g")
                .attr("transform", "translate(0," + margin.top + ")"),
    f3: svg.f3.append("g")
                .attr("transform", "translate(0," + margin.top + ")")
};

// Het canvas waar de brush lijnen op komen
var context = {
    general: svg.general.append("g")
                .attr("class", "context")
                .attr("transform", "translate(0," + brushMargin.top + ")"),
    f1: svg.f1.append("g")
            .attr("class", "context")
            .attr("transform", "translate(0," + brushMargin.top + ")"),
    f2: svg.f2.append("g")
        .attr("class", "context")
        .attr("transform", "translate(0," + brushMargin.top + ")"),
    f3: svg.f3.append("g")
            .attr("class", "context")
            .attr("transform", "translate(0," + brushMargin.top + ")")
};

// Gedeelde functies
// Check of een variabele een array is
// Bron: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
function isArray(variable) {
    return (!!variable) && (variable.constructor === Array);
}

// Check een string met een wildcard character *
// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

// Events binden voor de prox graphs
function bindProxEvents() {
    $(".prox-lines").mouseover(function() {
        $(".prox-lines").not(this).each(function() {
            $(this).css("opacity", "0.2");
        });
    });

    $(".prox-lines").mouseout(function() {
        $(".prox-lines").each(function() {
            $(this).css("opacity", "1");
        });
    });

    $(".prox-checkbox").change(function() {
        $("#prox-" + this.value).toggle();
        $("#prox-" + this.value + "_slider").toggle();
    });
}

var initChart = {
    general: function(dataVariable) {
        // Bereken de ranges van de data
        x.general.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.general.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        // Update ook de domeinen van de brushes
        brushX.general.domain(x.general.domain());
        brushY.general.domain(y.general.domain());

        // Bepaal waar de lijnen mogen verschijnen
        focus.general.append("defs").append("clipPath")
        .attr("id", "clip-general")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        // Assen toevoegen
        focus.general.append("g")
            .attr("id", "general-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.general);

        focus.general.append("g")
            .attr("id", "general-y-axis")
            .attr("class", "y axis")
            .call(yAxis.general)
            // Een naam aan de y-as hangen
            .append("text")
                .attr("id", "general-y-label")
                .attr("transform", "rotate(-90)")
                .attr("y", 3)
                .attr("dy", ".75em")
                .style("text-anchor", "end")
                // Maak de label tekst de geselecteerde data uit de dropdown
                .text($("#general-dropdown :selected").text());

        // De lijn tekenen van de geselecteerde data
        focus.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-line")
            .attr("class", "lines-general")
            .attr("d", line.general)
            .attr("clip-path", "url(#clip-general)");

        // Dit zijn de lijnen voor de hazium data maar zet ze eerst op onzichtbaar
        focus.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-line-1")
            .attr("class", "lines-general")
            .attr("d", line.general)
            .attr("clip-path", "url(#clip-general)")
            .style("display", "none");

        focus.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-line-2")
            .attr("class", "lines-general")
            .attr("d", line.general)
            .attr("clip-path", "url(#clip-general)")
            .style("display", "none");

        focus.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-line-3")
            .attr("class", "lines-general")
            .attr("d", line.general)
            .attr("clip-path", "url(#clip-general)")
            .style("display", "none");

        focus.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-line-4")
            .attr("class", "lines-general")
            .attr("d", line.general)
            .attr("clip-path", "url(#clip-general)")
            .style("display", "none");

        // Plak de brush lijn in zijn eigen plekje
        var contextLine = context.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-brush-line")
            .attr("class", "lines-general")
            .attr("d", brushLine.general);

        // Brushlijnen voor de hazium data maar maak ze eerst onzichtbaar
        context.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-brush-line-1")
            .attr("class", "lines-general")
            .attr("d", brushLine.general)
            .style("display", "none");

        context.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-brush-line-2")
            .attr("class", "lines-general")
            .attr("d", brushLine.general)
            .style("display", "none");

        context.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-brush-line-3")
            .attr("class", "lines-general")
            .attr("d", brushLine.general)
            .style("display", "none");

        context.general.append("path")
            .datum(dataVariable)
            .attr("id", "general-brush-line-4")
            .attr("class", "lines-general")
            .attr("d", brushLine.general)
            .style("display", "none");

        // x as voor de brush slider
        context.general.append("g")
            .attr("id", "general-context-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + brushHeight + ")")
            .call(brushXAxis.general);

        // Maak het oppervlak van de brush
        context.general.append("g")
            .attr("class", "x brush")
            .call(brush.general)
            .selectAll("rect")
                .attr("y", -6)
                .attr("height", brushHeight + 7);

        $(".lines-general").mouseover(function() {
            $(".lines-general").not(this).each(function() {
                $(this).css("opacity", "0.2");
            });
        });

        $(".lines-general").mouseout(function() {
            $(".lines-general").each(function() {
                $(this).css("opacity", "1");
            });
        });
    },
    f1: function() {

    },
    f2: function() {

    },
    f3: function() {

    }
};

var updateChart = {
    general: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Bereken de nieuwe ranges van de data
            x.general.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.general.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Update ook de domeinen van de brush
            brushX.general.domain(x.general.domain());
            brushY.general.domain(y.general.domain());

            // Pas de assen aan adhv de nieuwe ranges
            svg.general.select("#general-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.general);

            svg.general.select("#general-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.general);

            // Verander de labeltekst adhv de nieuwe data
            svg.general.select("#general-y-label")
                .transition()
                    .duration(1000)
                    .text($("#general-dropdown :selected").text());

            // Verander de gebonden data aan de lijn
            svg.general.select("#general-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "");

            // Maak de hazium lijnen onzichtbaar
            svg.general.select("#general-line-1")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "none");

            svg.general.select("#general-line-2")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "none");

            svg.general.select("#general-line-3")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "none");

            svg.general.select("#general-line-4")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "none");

            // Pas de brush analoog aan de linechart aan
            var contextLine = context.general.select("#general-brush-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "");

            // Maak de hazium brush lijnen onzichtbaar
            context.general.select("#general-brush-line-1")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "none");

            context.general.select("#general-brush-line-2")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "none");

            context.general.select("#general-brush-line-3")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "none");

            context.general.select("#general-brush-line-4")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "none");

            // Transition op de brush x as
            context.general.select("#general-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.general);
        } else {
            // Het betreft de hazium concentraties
            var dataVariable = dataVariable;
            // Bepaal de nieuwe ranges
            x.general.domain(d3.extent(dataVariable.F_1_Z_8A, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if(d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.general.domain([0, yMax]).nice();

            // Update de brushdomeinen
            brushX.general.domain(x.general.domain());
            brushY.general.domain(y.general.domain());

            // Pas de assen aan adhv de nieuwe ranges
            svg.general.select("#general-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.general);

            svg.general.select("#general-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.general);

            // Verander de labeltekst adhv de nieuwe data
            svg.general.select("#general-y-label")
                .transition()
                    .duration(1000)
                    .text($("#general-dropdown :selected").text());

            // Verander de gebonden data aan de lijn en maak deze onzichtbaar
            svg.general.select("#general-line")
                .datum(dataVariable.F_1_Z_8A)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", "none");

            // Maak de haziumlijnen zichtbaar adhv de aangevinkte checkboxes
            svg.general.select("#general-line-1")
                .datum(dataVariable.F_1_Z_8A)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", function() {
                        if (checkboxLine1.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            svg.general.select("#general-line-2")
                .datum(dataVariable.F_2_Z_2)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", function() {
                        if (checkboxLine2.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            svg.general.select("#general-line-3")
                .datum(dataVariable.F_2_Z_4)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", function() {
                        if (checkboxLine3.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            svg.general.select("#general-line-4")
                .datum(dataVariable.F_3_Z_1)
                .transition()
                    .duration(1000)
                    .attr("d", line.general)
                    .style("display", function() {
                        if (checkboxLine4.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            // Pas de brush analoog aan de linechart aan en maak deze onzichtbaar
            var contextLine = context.general.select("#general-brush-line")
                .datum(dataVariable.F_1_Z_8A)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", "none");

            // Maak de haziumbrushlijnen zichtbaar adhv de aangevinkte checkboxes
            context.general.select("#general-brush-line-1")
                .datum(dataVariable.F_1_Z_8A)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", function() {
                        if (checkboxLine1.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            context.general.select("#general-brush-line-2")
                .datum(dataVariable.F_2_Z_2)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", function() {
                        if (checkboxLine2.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            context.general.select("#general-brush-line-3")
                .datum(dataVariable.F_2_Z_4)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", function() {
                        if (checkboxLine3.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            context.general.select("#general-brush-line-4")
                .datum(dataVariable.F_3_Z_1)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.general)
                    .style("display", function() {
                        if (checkboxLine4.checked) {
                            return "";
                        } else {
                            return "none";
                        }
                    });

            // Transition op de brush x as
            context.general.select("#general-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.general);
        }
    },
    f1: function() {

    },
    f2: function() {

    },
    f3: function() {

    }
};
