var lightsPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    equipmentPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    thermostatTemp = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    thermostatHeatingSetpoint = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    thermostatCoolingSetpoint = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    returnOutletCo2Concentration = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    supplyInletTemperature = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    supplyInletMassFlowRate = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    vavReheatDamperPosition = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    reheatCoilPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    vavAvailabilityManagerNightCycleControlStatus = [],
    vavSysSupplyFanFanPower = [],
    bathExhaustFanPower = [],
    vavSysHeatingCoilPower = [],
    vavSysOutdoorAirFlowFraction = [],
    vavSysOutdoorAirMassFlowRate = [],
    vavSysCoolingCoilPower = [],
    vavSysAirLoopInletTemperature = [],
    vavSysAirLoopInletMassFlowRate = [],
    vavSysSupplyFanOutletTemperature = [],
    vavSysSupplyFanOutletMassFlowRate = [],
    mechanicalVentilationMassFlowRate = []; // Alleen zone 1

$(".zone-checkbox").change(function() {
    $("#f1-" + this.id + "-line").toggle();
});

d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());

$("#f1-dropdown").change(changeF1Header);

function changeF1Header() {
    d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());
    updateF1Chart(eval($("#f1-sensors").val()));
    console.log(eval($("#f1-sensors").val()));
}

// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

d3.json("json/floor1-MC2.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        // console.log(data[i].message);
        var datetime = new Date(dateFormat.parse(data[i].message["Date/Time"])/* - new Date().getTimezoneOffset() * 60 * 1000*/);
        // console.log(datetime);
        var timeoffset = data[i].offset;
        for (var key in data[i].message) {
            if (key !== "Date/Time" && key !== "type" && key !== "floor") {
                var zone = "zone";
                if (wildcardCompare(key, "F_1_Z_1*")) {
                    zone += "1";
                } else if (wildcardCompare(key, "F_1_Z_2*")) {
                    zone += "2";
                } else if (wildcardCompare(key, "F_1_Z_3*")) {
                    zone += "3";
                } else if (wildcardCompare(key, "F_1_Z_4*")) {
                    zone += "4";
                } else if (wildcardCompare(key, "F_1_Z_5*")) {
                    zone += "5";
                } else if (wildcardCompare(key, "F_1_Z_7*")) {
                    zone += "7";
                } else if (wildcardCompare(key, "F_1_Z_8A*")) {
                    zone += "8a";
                } else if (wildcardCompare(key, "F_1_Z_8B*")) {
                    zone += "8b";
                } else {
                    if (key === "F_1_VAV_SYS SUPPLY FAN:Fan Power") {
                        vavSysSupplyFanFanPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_BATH_EXHAUST:Fan Power") {
                        bathExhaustFanPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS HEATING COIL Power") {
                        vavSysHeatingCoilPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS Outdoor Air Flow Fraction") {
                        vavSysOutdoorAirFlowFraction.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS Outdoor Air Mass Flow Rate") {
                        vavSysOutdoorAirMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS COOLING COIL Power") {
                        vavSysCoolingCoilPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS AIR LOOP INLET Temperature") {
                        vavSysAirLoopInletTemperature.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS AIR LOOP INLET Mass Flow Rate") {
                        vavSysAirLoopInletMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS SUPPLY FAN OUTLET Temperature") {
                        vavSysSupplyFanOutletTemperature.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS SUPPLY FAN OUTLET Mass Flow Rate") {
                        vavSysSupplyFanOutletMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else {
                        // F_1 VAV Availability Manager Night Cycle Control Status
                        vavAvailabilityManagerNightCycleControlStatus.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    }
                }

                // De data betreft een zone
                if (zone !== "zone") {
                    var sensorReading = key.substr(key.indexOf(" ") + 1, key.length);
                    if (sensorReading === "Lights Power") {
                        lightsPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Equipment Power") {
                        equipmentPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Temp") {
                        thermostatTemp[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Heating Setpoint") {
                        thermostatHeatingSetpoint[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Cooling Setpoint") {
                        thermostatCoolingSetpoint[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "VAV REHEAT Damper Position") {
                        vavReheatDamperPosition[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "REHEAT COIL Power") {
                        reheatCoilPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "RETURN OUTLET CO2 Concentration") {
                        returnOutletCo2Concentration[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Temperature") {
                        supplyInletTemperature[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Mass Flow Rate") {
                        supplyInletMassFlowRate[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else {
                        // Mechanical Ventilation Mass Flow Rate
                        mechanicalVentilationMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    }
                }
            }
        }
    }
    // console.log(mechanicalVentilationMassFlowRate);

    // console.log(thermostatTemp.zone1);
    initF1Chart(eval($("#f1-sensors").val()));

    /*
    Lights Power
    Equipment Power
    Thermostat Temp
    Thermostat Heating Setpoint
    Thermostat Cooling Setpoint
    VAV Availability Manager Night Cycle Control Status
    SUPPLY FAN:Fan Power
    BATH_EXHAUST:Fan Power (aparte case alleen voor BATH_EXHAUST)
    VAV REHEAT Damper Position
    REHEAT COIL Power
    HEATING COIL Power
    Outdoor Air Flow Fraction
    Outdoor Air Mass Flow Rate
    COOLING COIL Power
    AIR LOOP INLET Temperature
    AIR LOOP INLET Mass Flow Rate
    SUPPLY FAN OUTLET Temperature
    SUPPLY FAN OUTLET Mass Flow Rate
    RETURN OUTLET CO2 Concentration
    SUPPLY INLET Temperature
    SUPPLY INLET Mass Flow Rate
    Mechanical Ventilation Mass Flow Rate (alleen bij zone 1)
    */
});

// Bron: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
function isArray(variable) {
    return (!!variable) && (variable.constructor === Array);
}

function initF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
        document.getElementById("zone1").disabled = true;
        document.getElementById("zone2").disabled = true;
        document.getElementById("zone3").disabled = true;
        document.getElementById("zone4").disabled = true;
        document.getElementById("zone5").disabled = true;
        document.getElementById("zone7").disabled = true;
        document.getElementById("zone8a").disabled = true;
        document.getElementById("zone8b").disabled = true;

        // Data betreft de gehele verdieping
        x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        // Assen toevoegen
        svg.f1.append("g")
            .attr("id", "f1-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f1)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f1.append("g")
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
                .text($("#f1-sensors :selected").text());

        // De lijn tekenen
        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone1-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone2-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone3-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone4-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone5-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone7-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone8a-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-zone8b-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");
    } else {
        // Data betreft meerdere zones
        x.f1.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f1.domain([0, yMax]).nice();

        // Assen toevoegen
        svg.f1.append("g")
            .attr("id", "f1-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f1)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f1.append("g")
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
                .text($("#f1-sensors :selected").text());

        // De lijn tekenen
        svg.f1.append("path")
            .datum(dataVariable.zone1)
            .attr("id", "f1-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        svg.f1.append("path")
            .datum(dataVariable.zone1)
            .attr("id", "f1-zone1-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone2)
            .attr("id", "f1-zone2-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone3)
            .attr("id", "f1-zone3-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone4)
            .attr("id", "f1-zone4-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone5)
            .attr("id", "f1-zone5-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone7)
            .attr("id", "f1-zone7-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone8a)
            .attr("id", "f1-zone8a-line")
            .attr("class", "line")
            .attr("d", line.f1);

        svg.f1.append("path")
            .datum(dataVariable.zone8b)
            .attr("id", "f1-zone8b-line")
            .attr("class", "line")
            .attr("d", line.f1);
    }
}

function updateF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
        document.getElementById("zone1").disabled = true;
        document.getElementById("zone2").disabled = true;
        document.getElementById("zone3").disabled = true;
        document.getElementById("zone4").disabled = true;
        document.getElementById("zone5").disabled = true;
        document.getElementById("zone7").disabled = true;
        document.getElementById("zone8a").disabled = true;
        document.getElementById("zone8b").disabled = true;

        x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        svg.f1.select("#f1-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f1);

        svg.f1.select("#f1-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f1);

        svg.f1.select("#f1-y-label")
            .transition()
                .duration(1000)
                .text($("#f1-sensors :selected").text());

        svg.f1.select("#f1-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone1-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone2-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone3-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone4-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone5-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone7-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone8a-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone8b-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");
    } else {
        // De checkboxes moeten weer werken als de data over meerdere zones
        document.getElementById("zone1").disabled = false;
        document.getElementById("zone2").disabled = false;
        document.getElementById("zone3").disabled = false;
        document.getElementById("zone4").disabled = false;
        document.getElementById("zone5").disabled = false;
        document.getElementById("zone7").disabled = false;
        document.getElementById("zone8a").disabled = false;
        document.getElementById("zone8b").disabled = false;

        x.f1.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f1.domain([0, yMax]).nice();

        svg.f1.select("#f1-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f1);

        svg.f1.select("#f1-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f1);

        svg.f1.select("#f1-y-label")
            .transition()
                .duration(1000)
                .text($("#f1-sensors :selected").text());

        svg.f1.select("#f1-line")
            .datum(dataVariable.zone1)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");

        svg.f1.select("#f1-zone1-line")
            .datum(dataVariable.zone1)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone2-line")
            .datum(dataVariable.zone2)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone3-line")
            .datum(dataVariable.zone3)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone4-line")
            .datum(dataVariable.zone4)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone5-line")
            .datum(dataVariable.zone5)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone7-line")
            .datum(dataVariable.zone7)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone8a-line")
            .datum(dataVariable.zone8a)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");

        svg.f1.select("#f1-zone8b-line")
            .datum(dataVariable.zone8b)
            .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "");
    }
}
