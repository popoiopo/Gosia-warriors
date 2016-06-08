/*
* Javascript file bij general.html
* Tekent de visualisatie voor data die gaat over het gehele gebouw.
*/

// Lege arrays die worden gevuld met de ingelezen data
var loopTempSchedule = [], supplySideOutletTemperature = [], waterHeaterGasRate = [], deliFanPower = [], supplySideInletMassFlowRate = [], hvacElectricDemandPower = [], heatScheduleValue = [],
    pumpPower = [], waterHeaterTankTemperature = [], supplySideInletTemperature = [], windDirection = [], totalElectricDemandPower = [], drybulbTemperature = [], waterHeaterSetpoint = [],
    windSpeed = [], coolScheduleValue = [];

// Print header tekst adhv de dropdown keuze
d3.select("#general-vis-info").text($("#general-dropdown :selected").text());

// Event listener als de dropdown veranderd wordt
$("#general-dropdown").change(changeGeneralHeader);

function changeGeneralHeader() {
    // Update de header tekst
    d3.select("#general-vis-info").text($("#general-dropdown :selected").text());
    // Update de chart
    updateGeneralChart(eval($("#general-dropdown").val()));
}

// Lees de data in
d3.json("json/general-MC2.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        // Sla de timestamp en offset op om later te gebruiken
        var datetime = new Date(dateFormat.parse(data[i].message["Date/Time"])/* - new Date().getTimezoneOffset() * 60 * 1000*/);
        var timeoffset = data[i].offset;

        // Vul de eerder gedefinieerde arrays met de ingelezen data
        loopTempSchedule.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Loop Temp Schedule"]
        });

        supplySideOutletTemperature.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Supply Side Outlet Temperature"]
        });

        waterHeaterGasRate.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Water Heater Gas Rate"]
        });

        deliFanPower.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["DELI-FAN Power"]
        });

        supplySideInletMassFlowRate.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Supply Side Inlet Mass Flow Rate"]
        });

        hvacElectricDemandPower.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["HVAC Electric Demand Power"]
        });

        heatScheduleValue.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["HEAT Schedule Value"]
        });

        pumpPower.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Pump Power"]
        });

        waterHeaterTankTemperature.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Water Heater Tank Temperature"]
        });

        supplySideInletTemperature.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Supply Side Inlet Temperature"]
        });

        windDirection.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Wind Direction"]
        });

        totalElectricDemandPower.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Total Electric Demand Power"]
        });

        drybulbTemperature.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Drybulb Temperature"]
        });

        waterHeaterSetpoint.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Water Heater Setpoint"]
        });

        windSpeed.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["Wind Speed"]
        });

        coolScheduleValue.push({
            timestamp: datetime,
            offset: timeoffset,
            val: +data[i].message["COOL Schedule Value"]
        });
    }
    // Initialiseer de chart
    initGeneralChart(eval($("#general-dropdown").val()));
});

// Functie om de chart te maken (als de data geladen is)
function initGeneralChart(dataArray) {
    // Bereken de ranges van de data
    x.general.domain(d3.extent(dataArray, function(d) {return d.timestamp;})).nice();
    y.general.domain([0, d3.max(dataArray, function(d) {return d.val;})]).nice();

    brushX.general.domain(x.general.domain());
    brushY.general.domain(y.general.domain());

    focus.general.append("defs").append("clipPath")
    .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);
    // Assen toevoegen
    focus.general.append("g")
        .attr("id", "general-x-axis")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.general)
        // Zet de labels aan de x-as schuin
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)" );

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
        .datum(dataArray)
        .attr("id", "general-line")
        .attr("class", "lines-general")
        .attr("d", line.general)
        .attr("clip-path", "url(#clip)");

    var contextLine = context.general.append("path")
        .datum(dataArray)
        .attr("id", "general-brush-line")
        .attr("class", "lines-general")
        .attr("d", brushLine.general);
        // .attr("clip-path", "url(#clip)");

    context.general.append("g")
        .attr("id", "general-context-x-axis")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + brushHeight + ")")
        .call(brushXAxis.general);

    context.general.append("g")
        .attr("class", "x brush")
        .call(brush.general)
      .selectAll("rect")
        .attr("y", -6)
        .attr("height", brushHeight + 7);
}

// Functie die wordt aangeroepen nadat de chart gemaakt die de data in de chart updatet
function updateGeneralChart(dataArray) {
    // Bereken de nieuwe ranges van de data
    x.general.domain(d3.extent(dataArray, function(d) {return d.timestamp;})).nice();
    y.general.domain([0, d3.max(dataArray, function(d) {return d.val;})]).nice();

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
        .datum(dataArray)
        .transition()
            .duration(1000)
            .attr("d", line.general);

    var contextLine = context.general.select("#general-brush-line")
        .datum(dataArray)
        .transition()
            .duration(1000)
            .attr("d", brushLine.general);
        // .attr("clip-path", "url(#clip)");

    context.general.select("#general-context-x-axis")
        .transition()
        .duration(1000)
            .call(brushXAxis.general);
}
