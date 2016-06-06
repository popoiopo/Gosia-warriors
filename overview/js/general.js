var loopTempSchedule = [], supplySideOutletTemperature = [], waterHeaterGasRate = [], deliFanPower = [], supplySideInletMassFlowRate = [], hvacElectricDemandPower = [], heatScheduleValue = [],
    pumpPower = [], waterHeaterTankTemperature = [], supplySideInletTemperature = [], windDirection = [], totalElectricDemandPower = [], drybulbTemperature = [], waterHeaterSetpoint = [],
    windSpeed = [], coolScheduleValue = [];

d3.select("#general-vis-info").text($("#general-dropdown :selected").text());

$("#general-dropdown").change(changeGeneralHeader);

function changeGeneralHeader() {
    d3.select("#general-vis-info").text($("#general-dropdown :selected").text());
    updateGeneralChart(eval($("#general-dropdown").val()));
}

d3.json("json/general-MC2.json", function(error, data) {
    if (error) throw error;

    // console.log(new Date(dateFormat.parse("2016-06-01 00:00:05") - new Date().getTimezoneOffset() * 60 * 1000));
    for (var i = 0; i < data.length; i++) {
        var datetime = new Date(dateFormat.parse(data[i].message["Date/Time"]) - new Date().getTimezoneOffset() * 60 * 1000);
        var timeoffset = data[i].offset;
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

    // TEST PRINT
    // console.log(eval($("#general-dropdown").val()));

    initGeneralChart(eval($("#general-dropdown").val()));
});

function initGeneralChart(dataArray) {
    x.general.domain(d3.extent(dataArray, function(d) {return d.timestamp;})).nice();
    y.general.domain([0, d3.max(dataArray, function(d) {return d.val;})]).nice();

    // Assen toevoegen
    svg.general.append("g")
        .attr("id", "general-x-axis")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.general)
        // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)" );

    svg.general.append("g")
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
            .text($("#general-dropdown :selected").text());

    // De lijn tekenen
    svg.general.append("path")
        .datum(dataArray)
        .attr("id", "general-line")
        .attr("class", "line")
        .attr("d", line.general);
}

function updateGeneralChart(dataArray) {
    x.general.domain(d3.extent(dataArray, function(d) {return d.timestamp;})).nice();
    y.general.domain([0, d3.max(dataArray, function(d) {return d.val;})]).nice();

    svg.general.select("#general-x-axis")
        .transition()
            .duration(1000)
            .call(xAxis.general);

    svg.general.select("#general-y-axis")
        .transition()
            .duration(1000)
            .call(yAxis.general);

    svg.general.select("#general-y-label")
        .transition()
            .duration(1000)
            .text($("#general-dropdown :selected").text());

    svg.general.select("#general-line")
        .datum(dataArray)
        .transition()
            .duration(1000)
            .attr("d", line.general);
}
