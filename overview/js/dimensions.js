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
    f1: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de ranges van de data
            x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Bereken ook de domeinen van de brush
            brushX.f1.domain(x.f1.domain());
            brushY.f1.domain(y.f1.domain());

            // Bepaal waar de lijnen mogen verschijnen op de linechart
            focus.f1.append("defs").append("clipPath")
            .attr("id", "clip-f1")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f1.append("g")
                .attr("id", "f1-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f1);

            focus.f1.append("g")
                .attr("id", "f1-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f1)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f1-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f1-sensors :selected").text());

            // De lijn tekenen van de geselecteerde data
            focus.f1.append("path")
                .datum(dataVariable)
                .attr("id", "f1-line")
                .attr("class", "lines-f1 f1-general")
                .attr("d", line.f1)
                .attr("clip-path", "url(#clip-f1)");

            // Maak de brushlijnen in hun eigen plekje
            var contextLine = context.f1.append("path")
                .datum(dataVariable)
                .attr("id", "f1-brush-line")
                .attr("class", "lines-f1 f1-general")
                .attr("d", brushLine.f1);

            // Geef de brush zijn eigen x as
            context.f1.append("g")
                .attr("id", "f1-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f1);

            // Maak de brush zelf aan
            context.f1.append("g")
                .attr("class", "x brush")
                .call(brush.f1)
                .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            for (var i = 0; i < f1zones.length; i++) {
                var zone = "zone" + f1zones[i];
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f1Zone" + f1zones[i] + "Checkbox.disabled = true");

                // Bind de verdiepingsdata aan de zonelijnen, maar maak ze onzichtbaar
                focus.f1.append("path")
                    .datum(dataVariable)
                    .attr("id", "f1-zone" + f1zones[i] + "-line")
                    .attr("class", "lines-f1 f1-" + zone)
                    .attr("d", line.f1)
                    .attr("clip-path", "url(#clip-f1)")
                    .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f1.append("path")
                    .datum(dataVariable)
                    .attr("id", "f1-" + zone + "-brush")
                    .attr("class", "lines-f1 f1-" + zone)
                    .attr("d", brushLine.f1)
                    .style("display", "none");
            }
        } else {
            // Data betreft meerdere zones
            // Bereken de ranges van de data
            x.f1.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f1.domain([0, yMax]).nice();

            // Bereken de domeinen van de brush
            brushX.f1.domain(x.f1.domain());
            brushY.f1.domain(y.f1.domain());

            focus.f1.append("defs").append("clipPath")
            .attr("id", "clip-f1")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f1.append("g")
                .attr("id", "f1-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f1);

            focus.f1.append("g")
                .attr("id", "f1-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f1)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f1-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f1-sensors :selected").text());

            // De lijn tekenen van de geselecteerde data
            focus.f1.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f1-line")
                .attr("class", "lines-f1 f1-general")
                .attr("d", line.f1)
                .attr("clip-path", "url(#clip-f1)")
                .style("display", "none");

            // Maak de brush lijn maar maak deze onzichtbaar
            var contextLine = context.f1.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f1-brush-line")
                .attr("class", "lines-f1 f1-general")
                .attr("d", brushLine.f1)
                .style("display", "none");

            // x as van de brush
            context.f1.append("g")
                .attr("id", "f1-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f1);

            // De brush zelf aanmaken
            context.f1.append("g")
                .attr("class", "x brush")
                .call(brush.f1)
                .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            // Loop elke zone af
            for (var i = 0; i < f1zones.length; i++) {
                var zone = "zone" + f1zones[i];
                // Maak een lijn voor elke zone en bind data aan die lijnen
                focus.f1.append("path")
                    .datum(dataVariable[zone])
                    .attr("id", "f1-" + zone + "-line")
                    .attr("class", "lines-f1 f1-" + zone)
                    .attr("clip-path", "url(#clip-f1)")
                    .attr("d", line.f1);

                // En doe hetzelfde voor de brush
                context.f1.append("path")
                    .datum(dataVariable[zone])
                    .attr("id", "f1-" + zone + "-brush")
                    .attr("class", "lines-f1 f1-" + zone)
                    .attr("d", brushLine.f1);
            }
        }
        // Breng een lijn naar voren als er over gehoverd wordt
        $(".lines-f1").mouseover(function() {
            $(".lines-f1").not(this).each(function() {
                $(this).css("opacity", "0.2");
            });
        });

        $(".lines-f1").mouseout(function() {
            $(".lines-f1").each(function() {
                $(this).css("opacity", "1");
            });
        });
    },
    f2: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de ranges van de data
            x.f2.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f2.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Bereken de brushdomeinen
            brushX.f2.domain(x.f2.domain());
            brushY.f2.domain(y.f2.domain());

            // Definieer het canvas waar de lijnen op mogen verschijnen
            focus.f2.append("defs").append("clipPath")
            .attr("id", "clip-f2")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f2.append("g")
                .attr("id", "f2-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f2);

            focus.f2.append("g")
                .attr("id", "f2-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f2)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f2-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f2-sensors :selected").text());

            // De lijn tekenen van de geselecteerde data
            focus.f2.append("path")
                .datum(dataVariable)
                .attr("id", "f2-line")
                .attr("class", "lines-f2 f2-general")
                .attr("d", line.f2)
                .attr("clip-path", "url(#clip-f2)");

            // Maak de brushlijn over de gehele verdieping
            var contextLine = context.f2.append("path")
                .datum(dataVariable)
                .attr("id", "f2-brush-line")
                .attr("class", "lines-f2 f2-general")
                .attr("d", brushLine.f2);

            // Brush x as
            context.f2.append("g")
                .attr("id", "f2-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f2);

            // De brush zelf maken
            context.f2.append("g")
                .attr("class", "x brush")
                .call(brush.f2)
                    .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            for (var i = 0; i < f2zones.length; i++) {
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f2Zone" + f2zones[i] + "Checkbox.disabled = true");

                var zone = "zone" + f2zones[i];

                // Bind de verdiepingsdata aan de zonelijnen maar maak deze onzichtbaar
                focus.f2.append("path")
                    .datum(dataVariable)
                    .attr("id", "f2-zone" + f2zones[i] + "-line")
                    .attr("class", "lines-f2 f2-" + zone)
                    .attr("d", line.f2)
                    .attr("clip-path", "url(#clip-f2)")
                    .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f2.append("path")
                    .datum(dataVariable)
                    .attr("id", "f2-" + zone + "-brush")
                    .attr("class", "lines-f2 f2-" + zone)
                    .attr("d", brushLine.f2)
                    .style("display", "none");
            }
        } else {
            // Data betreft meerdere zones
            // Bereken de ranges van de data
            x.f2.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f2.domain([0, yMax]).nice();

            // Bereken de brushdomeinen
            brushX.f2.domain(x.f2.domain());
            brushY.f2.domain(y.f2.domain());

            // Definieer het canvas waar de lijnen op mogen verschijnen
            focus.f2.append("defs").append("clipPath")
            .attr("id", "clip-f2")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f2.append("g")
                .attr("id", "f2-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f2);

            focus.f2.append("g")
                .attr("id", "f2-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f2)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f2-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f2-sensors :selected").text());

            // Teken de verdiepingslijn met zone1 data (willekeurig) maar maak deze onzichtbaar
            focus.f2.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f2-line")
                .attr("class", "lines-f2 f2-general")
                .attr("d", line.f2)
                .attr("clip-path", "url(#clip-f2)")
                .style("display", "none");

            // En doe hetzelfde voor de brushlijn
            var contextLine = context.f2.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f2-brush-line")
                .attr("class", "lines-f2 f2-general")
                .attr("d", brushLine.f2)
                .style("display", "none");

            // Brush x as
            context.f2.append("g")
                .attr("id", "f2-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f2);

            // Maak de brush zelf
            context.f2.append("g")
                .attr("class", "x brush")
                .call(brush.f2)
                .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            for (var i = 0; i < f2zones.length; i++) {
                // Bind zonedata aan de zonelijnen en laat deze zien
                var zone = "zone" + f2zones[i];

                // Maak een lijn voor elke zone en bind data aan die lijnen
                focus.f2.append("path")
                    .datum(dataVariable[zone])
                    .attr("id", "f2-" + zone + "-line")
                    .attr("class", "lines-f2 f2-" + zone)
                    .attr("clip-path", "url(#clip-f2)")
                    .attr("d", line.f2);

                // En doe hetzelfde voor de brushlijnen
                context.f2.append("path")
                    .datum(dataVariable[zone])
                    .attr("id", "f2-" + zone + "-brush")
                    .attr("class", "lines-f2 f2-" + zone)
                    .attr("d", brushLine.f2);
            }
        }
        // Breng een lijn naar voren als er over gehoverd wordt
        $(".lines-f2").mouseover(function() {
            $(".lines-f2").not(this).each(function() {
                $(this).css("opacity", "0.2");
            });
        });

        $(".lines-f2").mouseout(function() {
            $(".lines-f2").each(function() {
                $(this).css("opacity", "1");
            });
        });
    },
    f3: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de ranges van de data
            x.f3.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f3.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Bereken de brushdomeinen
            brushX.f3.domain(x.f3.domain());
            brushY.f3.domain(y.f3.domain());

            // Definieer het canvas waar de lijnen op mogen verschijnen
            focus.f3.append("defs").append("clipPath")
            .attr("id", "clip-f3")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f3.append("g")
                .attr("id", "f3-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f3);

            focus.f3.append("g")
                .attr("id", "f3-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f3)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f3-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f3-sensors :selected").text());

            // De lijn tekenen van de geselecteerde data
            focus.f3.append("path")
                .datum(dataVariable)
                .attr("id", "f3-line")
                .attr("class", "lines-f3 f3-general")
                .attr("d", line.f3)
                .attr("clip-path", "url(#clip-f3)");

            // Maak de brushlijn voor de gehele verdieping
            var contextLine = context.f3.append("path")
                .datum(dataVariable)
                .attr("id", "f3-brush-line")
                .attr("class", "lines-f3 f3-general")
                .attr("d", brushLine.f3);

            // x as voor de brush
            context.f3.append("g")
                .attr("id", "f3-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f3);

            // Maak de brush zelf
            context.f3.append("g")
                .attr("class", "x brush")
                .call(brush.f3)
                .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            for (var i = 0; i < f3zones.length; i++) {
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f3Zone" + f3zones[i] + "Checkbox.disabled = true");
                var zone = "zone" + f3zones[i];

                // Bind de verdiepingsdata aan de zonelijnen maar maak deze onzichtbaar
                focus.f3.append("path")
                    .datum(dataVariable)
                    .attr("id", "f3-zone" + f3zones[i] + "-line")
                    .attr("class", "lines-f3 f3-" + zone)
                    .attr("d", line.f3)
                    .attr("clip-path", "url(#clip-f3)")
                    .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f3.append("path")
                    .datum(dataVariable)
                    .attr("id", "f3-" + zone + "-brush")
                    .attr("class", "lines-f3 f3-" + zone)
                    .attr("d", brushLine.f3)
                    .style("display", "none");
            }
        } else {
            // Data betreft meerdere zones
            // Bereken de ranges van de data
            x.f3.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f3.domain([0, yMax]).nice();

            // Update de brushdomeinen
            brushX.f3.domain(x.f3.domain());
            brushY.f3.domain(y.f3.domain());

            // Definieer het canvas waar de lijnen op mogen verschijnen
            focus.f3.append("defs").append("clipPath")
            .attr("id", "clip-f3")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Assen toevoegen
            focus.f3.append("g")
                .attr("id", "f3-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis.f3);

            focus.f3.append("g")
                .attr("id", "f3-y-axis")
                .attr("class", "y axis")
                .call(yAxis.f3)
                // Een naam aan de y-as hangen
                .append("text")
                    .attr("id", "f3-y-label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    // Maak de label tekst de geselecteerde data uit de dropdown
                    .text($("#f3-sensors :selected").text());

            // De lijn tekenen met data van zone1 (willekeurig) maar maak deze onzichtbaar
            focus.f3.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f3-line")
                .attr("class", "lines-f3 f3-general")
                .attr("d", line.f3)
                .attr("clip-path", "url(#clip-f3)")
                .style("display", "none");

            // En doe hetzelfde voor de brushlijn
            var contextLine = context.f3.append("path")
                .datum(dataVariable.zone1)
                .attr("id", "f3-brush-line")
                .attr("class", "lines-f3 f3-general")
                .attr("d", brushLine.f3)
                .style("display", "none");

            // x as voor de brush
            context.f3.append("g")
                .attr("id", "f3-context-x-axis")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + brushHeight + ")")
                .call(brushXAxis.f3);

            // De brush zelf maken
            context.f3.append("g")
                .attr("class", "x brush")
                .call(brush.f3)
                .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", brushHeight + 7);

            for (var i = 0; i < f3zones.length; i++) {
                var zone = "zone" + f3zones[i];

                // Bind de zonedata aan de zonelijnen maar check goed voor welke zone welke sensordata er beschikbaar is
                // En doe hetzelfde voor de brushlijnen
                if (zone !== "zone12" && zone !== "zone9") {
                    focus.f3.append("path")
                        .datum(dataVariable[zone])
                        .attr("id", "f3-" + zone + "-line")
                        .attr("class", "lines-f3 f3-" + zone)
                        .attr("clip-path", "url(#clip-f3)")
                        .attr("d", line.f3);

                    context.f3.append("path")
                        .datum(dataVariable[zone])
                        .attr("id", "f3-" + zone + "-brush")
                        .attr("class", "lines-f3 f3-" + zone)
                        .attr("d", brushLine.f3);
                } else if (zone === "zone9") {
                    // Er is voor zone 9 geen REHEAT COIL Power data beschikbaar
                    if ($("#f3-sensors").val() !== "f3reheatCoilPower") {
                        focus.f3.append("path")
                            .datum(dataVariable[zone])
                            .attr("id", "f3-" + zone + "-line")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("clip-path", "url(#clip-f3)")
                            .attr("d", line.f3);

                        context.f3.append("path")
                            .datum(dataVariable[zone])
                            .attr("id", "f3-" + zone + "-brush")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("d", brushLine.f3);
                    } else {
                        f3Zone9Checkbox.disabled = true;
                        focus.f3.append("path")
                            .datum(dataVariable.zone1)
                            .attr("id", "f3-" + zone + "-line")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("d", line.f3)
                            .attr("clip-path", "url(#clip-f3)")
                            .style("display", "none");

                        context.f3.append("path")
                            .datum(dataVariable.zone1)
                            .attr("id", "f3-" + zone + "-brush")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("d", brushLine.f3);
                    }
                } else if (zone === "zone12") {
                    // Er is voor zone 12 alleen REHEAT COIL Power data beschikbaar
                    if ($("#f3-sensors").val() === "f3reheatCoilPower") {
                        focus.f3.append("path")
                            .datum(dataVariable[zone])
                            .attr("id", "f3-" + zone + "-line")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("clip-path", "url(#clip-f3)")
                            .attr("d", line.f3);

                        context.f3.append("path")
                            .datum(dataVariable[zone])
                            .attr("id", "f3-" + zone + "-brush")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("d", brushLine.f3);
                    } else {
                        f3Zone12Checkbox.disabled = true;
                        focus.f3.append("path")
                            .datum(dataVariable.zone1)
                            .attr("id", "f3-" + zone + "-line")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("clip-path", "url(#clip-f3)")
                            .attr("d", line.f3)
                            .style("display", "none");

                        context.f3.append("path")
                            .datum(dataVariable.zone1)
                            .attr("id", "f3-" + zone + "-brush")
                            .attr("class", "lines-f3 f3-" + zone)
                            .attr("d", brushLine.f3);
                    }
                }
            }
        }
        // Breng een lijn naar voren als er over gehoverd wordt
        $(".lines-f3").mouseover(function() {
            $(".lines-f3").not(this).each(function() {
                $(this).css("opacity", "0.2");
            });
        });

        $(".lines-f3").mouseout(function() {
            $(".lines-f3").each(function() {
                $(this).css("opacity", "1");
            });
        });
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
    f1: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de nieuwe ranges van de data
            x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Update de domeinen van de brushes
            brushX.f1.domain(x.f1.domain());
            brushY.f1.domain(y.f1.domain());

            // Verander de assen adhv de nieuwe ranges
            svg.f1.select("#f1-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f1);

            svg.f1.select("#f1-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f1);

            // Update de label adhv de gekozen data
            svg.f1.select("#f1-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f1-sensors :selected").text());

            // Maak de lijn die over de gehele verdieping gaat weer zichtbaar
            svg.f1.select("#f1-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.f1)
                    .style("display", "");

            // Maak de brush lijn over de gehele verdieping weer zichtbaar
            var contextLine = context.f1.select("#f1-brush-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f1)
                    .style("display", "");

            // Transitie op de x as
            context.f1.select("#f1-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f1);

            for (var i = 0; i < f1zones.length; i++) {
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f1Zone" + f1zones[i] + "Checkbox.disabled = true");

                // Bind de verdiepingsdata aan de zonelijnen maar maak deze onzichtbaar
                var zone = "zone" + f1zones[i];
                svg.f1.select("#f1-" + zone + "-line")
                    .datum(dataVariable)
                    .transition()
                        .duration(1000)
                        .attr("d", line.f1)
                        .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f1.select("#f1-" + zone + "-brush")
                    .datum(dataVariable)
                    .transition()
                        .duration(1000)
                        .attr("d", brushLine.f1)
                        .style("display", "none");
            }
        } else {
            // Data betreft meerdere zones
            // Bereken de nieuwe ranges
            x.f1.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f1.domain([0, yMax]).nice();

            // Update de brushdomeinen
            brushX.f1.domain(x.f1.domain());
            brushY.f1.domain(y.f1.domain());

            // Update de assen adhv de nieuwe ranges
            svg.f1.select("#f1-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f1);

            svg.f1.select("#f1-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f1);

            // Update de label adhv de nieuwe data
            svg.f1.select("#f1-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f1-sensors :selected").text());

            // Bind zone1 data (willekeurig) aan de verdiepingslijn maar maak deze onzichtbaar
            svg.f1.select("#f1-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", line.f1)
                    .style("display", "none");

            // En doe hetzelfde voor de brushlijn
            var contextLine = context.f1.select("#f1-brush-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f1)
                    .style("display", "none");

            // Transitie op de brush x as
            context.f1.select("#f1-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f1);

            for (var i = 0; i < f1zones.length; i++) {
                // De checkboxes moeten weer werken als de data over meerdere zones
                eval("f1Zone" + f1zones[i] + "Checkbox.disabled = false");

                // Bind de zonedata aan de zonelijnen
                var zone = "zone" + f1zones[i];
                svg.f1.select("#f1-" + zone + "-line")
                    .datum(dataVariable[zone])
                    .transition()
                        .duration(1000)
                        .attr("d", line.f1)
                        // Check of de checkboxes zijn aangevinkt om te kijken of de lijn zichtbaar moet worden
                        .style("display", function() {
                            if (eval("f1Zone" + f1zones[i] + "Checkbox.checked")) {
                                return "";
                            } else {
                                return "none";
                            }
                        });

                // En doe hetzelfde voor de brushlijnen
                context.f1.select("#f1-" + zone + "-brush")
                    .datum(dataVariable[zone])
                    .transition()
                        .duration(1000)
                        .attr("d", brushLine.f1)
                        .style("display", function() {
                            if (eval("f1Zone" + f1zones[i] + "Checkbox.checked")) {
                                return "";
                            } else {
                                return "none";
                            }
                        });
            }
        }
    },
    f2: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de nieuwe ranges
            x.f2.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f2.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Update de brushdomeinen
            brushX.f2.domain(x.f2.domain());
            brushY.f2.domain(y.f2.domain());

            // Pas de assen aan adhv de nieuwe ranges
            svg.f2.select("#f2-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f2);

            svg.f2.select("#f2-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f2);

            // Update de label tekst adhv de dropdown
            svg.f2.select("#f2-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f2-sensors :selected").text());

            // Update de verdiepingslijn adhv de nieuwe data
            svg.f2.select("#f2-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.f2)
                    .style("display", "");

            // Update de brushlijn
            var contextLine = context.f2.select("#f2-brush-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f2)
                    .style("display", "");

            // Transitie op de brush x as
            context.f2.select("#f2-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f2);

            for (var i = 0; i < f2zones.length; i++) {
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f2Zone" + f2zones[i] + "Checkbox.disabled = true");

                // Bind de verdiepingsdata aan de zonelijnen maar maak deze onzichtbaar
                var zone = "zone" + f2zones[i];
                svg.f2.select("#f2-" + zone + "-line")
                    .datum(dataVariable)
                    .transition()
                    .duration(1000)
                    .attr("d", line.f2)
                    .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f2.select("#f2-" + zone + "-brush")
                    .datum(dataVariable)
                    .transition()
                        .duration(1000)
                        .attr("d", brushLine.f2)
                        .style("display", "none");
            }
        } else {
            // Data betreft meerdere zones
            // Bereken de nieuwe ranges
            x.f2.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f2.domain([0, yMax]).nice();

            // Update de brushdomeinen
            brushX.f2.domain(x.f2.domain());
            brushY.f2.domain(y.f2.domain());

            // Update de assen adhv de nieuwe ranges
            svg.f2.select("#f2-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f2);

            svg.f2.select("#f2-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f2);

            // Update de label adhv de dropdown
            svg.f2.select("#f2-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f2-sensors :selected").text());

            // Bind zone1 data (willekeurig) aan de verdiepingslijn maar maak deze onzichtbaar
            svg.f2.select("#f2-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", line.f2)
                    .style("display", "none");

            // En doe hetzelfde voor de brushlijnen
            var contextLine = context.f2.select("#f2-brush-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f2)
                    .style("display", "none");

            // Transitie op de brush x as
            context.f2.select("#f2-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f2);

            for (var i = 0; i < f2zones.length; i++) {
                // De checkboxes moeten weer werken als de data over meerdere zones
                eval("f2Zone" + f2zones[i] + "Checkbox.disabled = false");

                // Bind zonedata aan de zonelijnen en laat deze wel/niet zien adhv of de checkboxes aangevinkt zijn
                var zone = "zone" + f2zones[i];
                svg.f2.select("#f2-" + zone + "-line")
                    .datum(dataVariable[zone])
                    .transition()
                        .duration(1000)
                        .attr("d", line.f2)
                        .style("display", function() {
                            if (eval("f2Zone" + f2zones[i] + "Checkbox.checked")) {
                                return "";
                            } else {
                                return "none";
                            }
                        });

                // En doe hetzelfde voor de brushlijnen
                context.f2.select("#f2-" + zone + "-brush")
                    .datum(dataVariable[zone])
                    .transition()
                        .duration(1000)
                        .attr("d", brushLine.f2)
                        .style("display", function() {
                            if (eval("f2Zone" + f2zones[i] + "Checkbox.checked")) {
                                return "";
                            } else {
                                return "none";
                            }
                        });
            }
        }
    },
    f3: function(dataVariable) {
        if (isArray(dataVariable)) {
            // Data betreft de gehele verdieping
            // Bereken de nieuwe ranges
            x.f3.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
            y.f3.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

            // Update de brushdomeinen
            brushX.f3.domain(x.f3.domain());
            brushY.f3.domain(y.f3.domain());

            // Pas de assen aan adhv de nieuwe ranges
            svg.f3.select("#f3-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f3);

            svg.f3.select("#f3-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f3);

            // Update de label tekst adhv de dropdown
            svg.f3.select("#f3-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f3-sensors :selected").text());

            // Update de verdiepingslijn adhv de nieuwe data
            svg.f3.select("#f3-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", line.f3)
                    .style("display", "");

            // En doe dat bij de brushlijn ook
            var contextLine = context.f3.select("#f3-brush-line")
                .datum(dataVariable)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f3)
                    .style("display", "");

            // Transitie op de brush x as
            context.f3.select("#f3-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f3);

            for (var i = 0; i < f3zones.length; i++) {
                // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
                eval("f3Zone" + f3zones[i] + "Checkbox.disabled = true");

                // Bind verdiepingsdata aan de zonelijnen maar maak deze onzichtbaar
                var zone = "zone" + f3zones[i];
                svg.f3.select("#f3-" + zone + "-line")
                    .datum(dataVariable)
                    .transition()
                    .duration(1000)
                    .attr("d", line.f3)
                    .style("display", "none");

                // En doe hetzelfde voor de brushlijnen
                context.f3.select("#f3-" + zone + "-brush")
                    .datum(dataVariable)
                    .transition()
                        .duration(1000)
                        .attr("d", brushLine.f3)
                        .style("display", "none");
            }
        } else {
            // Data gaat over meerdere zones
            // Bereken de nieuwe ranges
            x.f3.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
            var yMax = 0;
            for (var zone in dataVariable) {
                if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                    yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
                }
            }
            y.f3.domain([0, yMax]).nice();

            // Update de brushdomeinen
            brushX.f3.domain(x.f3.domain());
            brushY.f3.domain(y.f3.domain());

            // Update de assen adhv de nieuwe ranges
            svg.f3.select("#f3-x-axis")
                .transition()
                    .duration(1000)
                    .call(xAxis.f3);

            svg.f3.select("#f3-y-axis")
                .transition()
                    .duration(1000)
                    .call(yAxis.f3);

            // Update de label adhv de dropdown
            svg.f3.select("#f3-y-label")
                .transition()
                    .duration(1000)
                    .text($("#f3-sensors :selected").text());

            // Bind zone1 data (willekeurig) aan de verdiepingslijn maar maak deze onzichtbaar
            svg.f3.select("#f3-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", line.f3)
                    .style("display", "none");

            // En doe hetzelfde voor de brushlijn
            var contextLine = context.f3.select("#f3-brush-line")
                .datum(dataVariable.zone1)
                .transition()
                    .duration(1000)
                    .attr("d", brushLine.f3)
                    .style("display", "none");

            // Transitie op de brush x as
            context.f3.select("#f3-context-x-axis")
                .transition()
                .duration(1000)
                    .call(brushXAxis.f3);

            for (var i = 0; i < f3zones.length; i++) {
                // De checkboxes moeten weer werken als de data over meerdere zones
                eval("f3Zone" + f3zones[i] + "Checkbox.disabled = false");

                // Bind zonedata aan de zonelijnen maar check goed voor welke zones welke sensordata beschikbaar is
                // En doe hetzelfde voor de brushlijnen
                var zone = "zone" + f3zones[i];
                if (zone !== "zone9" && zone !== "zone12") {
                    svg.f3.select("#f3-" + zone + "-line")
                        .datum(dataVariable[zone])
                        .transition()
                            .duration(1000)
                            .attr("d", line.f3)
                            .style("display", function() {
                                // Laat de lijn alleen zien als de checkbox aangevinkt is
                                if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                    return "";
                                } else {
                                    return "none";
                                }
                            });

                    context.f3.select("#f3-" + zone + "-brush")
                        .datum(dataVariable[zone])
                        .transition()
                            .duration(1000)
                            .attr("d", brushLine.f3)
                            .style("display", function() {
                                if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                    return "";
                                } else {
                                    return "none";
                                }
                            });
                } else if (zone === "zone9") {
                    // Zone 9 heeft geen REHEAT COIL Power data
                    if ($("#f3-sensors").val() !== "f3reheatCoilPower") {
                        svg.f3.select("#f3-" + zone + "-line")
                            .datum(dataVariable[zone])
                            .transition()
                                .duration(1000)
                                .attr("d", line.f3)
                                .style("display", function() {
                                    // Laat de lijn alleen zien als de checkbox aangevinkt is
                                    if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                        return "";
                                    } else {
                                        return "none";
                                    }
                                });

                        context.f3.select("#f3-" + zone + "-brush")
                            .datum(dataVariable[zone])
                            .transition()
                                .duration(1000)
                                .attr("d", brushLine.f3)
                                .style("display", function() {
                                    if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                        return "";
                                    } else {
                                        return "none";
                                    }
                                });
                    } else {
                        f3Zone9Checkbox.disabled = true;
                        svg.f3.select("#f3-" + zone + "-line")
                            .datum(dataVariable.zone1)
                            .transition()
                                .duration(1000)
                                .attr("d", line.f3)
                                .style("display", "none");

                        context.f3.select("#f3-" + zone + "-brush")
                            .datum(dataVariable.zone1)
                            .transition()
                                .duration(1000)
                                .attr("d", brushLine.f3)
                                .style("display", "none");
                    }
                } else if (zone === "zone12") {
                    // Zone 12 heeft alleen REHEAT COIL Power data
                    if ($("#f3-sensors").val() === "f3reheatCoilPower") {
                        svg.f3.select("#f3-" + zone + "-line")
                            .datum(dataVariable[zone])
                            .transition()
                                .duration(1000)
                                .attr("d", line.f3)
                                .style("display", function() {
                                    // Laat de lijn alleen zien als de checkbox aangevinkt is
                                    if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                        return "";
                                    } else {
                                        return "none";
                                    }
                                });

                        context.f3.select("#f3-" + zone + "-brush")
                            .datum(dataVariable[zone])
                            .transition()
                                .duration(1000)
                                .attr("d", brushLine.f3)
                                .style("display", function() {
                                    if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                        return "";
                                    } else {
                                        return "none";
                                    }
                                });
                    } else {
                        f3Zone12Checkbox.disabled = true;
                        svg.f3.select("#f3-" + zone + "-line")
                            .datum(dataVariable.zone1)
                            .transition()
                                .duration(1000)
                                .attr("d", line.f3)
                                .style("display", "none");

                        context.f3.select("#f3-" + zone + "-brush")
                            .datum(dataVariable.zone1)
                            .transition()
                                .duration(1000)
                                .attr("d", brushLine.f3)
                                .style("display", "none");
                    }
                }
            }
        }
    }
};
