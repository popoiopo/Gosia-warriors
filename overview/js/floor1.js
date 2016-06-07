var f1zones = ["1", "2", "3", "4", "5", "7", "8a", "8b"];

var f1lightsPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1equipmentPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1thermostatTemp = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1thermostatHeatingSetpoint = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1thermostatCoolingSetpoint = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1returnOutletCo2Concentration = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1supplyInletTemperature = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1supplyInletMassFlowRate = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1vavReheatDamperPosition = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1reheatCoilPower = {zone1: [], zone2: [], zone3: [], zone4: [], zone5: [], zone7: [], zone8a: [], zone8b: []},
    f1vavAvailabilityManagerNightCycleControlStatus = [],
    f1vavSysSupplyFanFanPower = [],
    f1bathExhaustFanPower = [],
    f1vavSysHeatingCoilPower = [],
    f1vavSysOutdoorAirFlowFraction = [],
    f1vavSysOutdoorAirMassFlowRate = [],
    f1vavSysCoolingCoilPower = [],
    f1vavSysAirLoopInletTemperature = [],
    f1vavSysAirLoopInletMassFlowRate = [],
    f1vavSysSupplyFanOutletTemperature = [],
    f1vavSysSupplyFanOutletMassFlowRate = [],
    f1mechanicalVentilationMassFlowRate = []; // Alleen zone 1

var f1Zone1Checkbox, f1Zone2Checkbox, f1Zone3Checkbox, f1Zone4Checkbox, f1Zone5Checkbox, f1Zone7Checkbox, f1Zone8aCheckbox, f1Zone8bCheckbox;

for (var i = 0; i < f1zones.length; i++) {
    var zone = "zone" + f1zones[i];
    f1lightsPower[zone] = [];
    f1equipmentPower[zone] = [];
    f1thermostatTemp[zone] = [];
    f1thermostatHeatingSetpoint[zone] = [];
    f1thermostatCoolingSetpoint[zone] = [];
    f1returnOutletCo2Concentration[zone] = [];
    f1supplyInletTemperature[zone] = [];
    f1supplyInletMassFlowRate[zone] = [];
    f1vavReheatDamperPosition[zone] = [];
    f1reheatCoilPower[zone] = [];

    eval("f1Zone" + f1zones[i] + "Checkbox = document.getElementById('f1-" + zone + "');");
}

$(".f1-zone-checkbox").change(function() {
    $("#" + this.id + "-line").toggle();
});

d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());

$("#f1-dropdown").change(changeF1Header);

function changeF1Header() {
    d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());
    updateF1Chart(eval($("#f1-sensors").val()));
    // console.log(eval($("#f1-sensors").val()));
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
                        f1vavSysSupplyFanFanPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_BATH_EXHAUST:Fan Power") {
                        f1bathExhaustFanPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS HEATING COIL Power") {
                        f1vavSysHeatingCoilPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS Outdoor Air Flow Fraction") {
                        f1vavSysOutdoorAirFlowFraction.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS Outdoor Air Mass Flow Rate") {
                        f1vavSysOutdoorAirMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS COOLING COIL Power") {
                        f1vavSysCoolingCoilPower.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS AIR LOOP INLET Temperature") {
                        f1vavSysAirLoopInletTemperature.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS AIR LOOP INLET Mass Flow Rate") {
                        f1vavSysAirLoopInletMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS SUPPLY FAN OUTLET Temperature") {
                        f1vavSysSupplyFanOutletTemperature.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (key === "F_1_VAV_SYS SUPPLY FAN OUTLET Mass Flow Rate") {
                        f1vavSysSupplyFanOutletMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else {
                        // F_1 VAV Availability Manager Night Cycle Control Status
                        f1vavAvailabilityManagerNightCycleControlStatus.push({
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
                        f1lightsPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Equipment Power") {
                        f1equipmentPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Temp") {
                        f1thermostatTemp[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Heating Setpoint") {
                        f1thermostatHeatingSetpoint[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "Thermostat Cooling Setpoint") {
                        f1thermostatCoolingSetpoint[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "VAV REHEAT Damper Position") {
                        f1vavReheatDamperPosition[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "REHEAT COIL Power") {
                        f1reheatCoilPower[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "RETURN OUTLET CO2 Concentration") {
                        f1returnOutletCo2Concentration[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Temperature") {
                        f1supplyInletTemperature[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Mass Flow Rate") {
                        f1supplyInletMassFlowRate[zone].push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    } else {
                        // Mechanical Ventilation Mass Flow Rate
                        f1mechanicalVentilationMassFlowRate.push({
                            timestamp: datetime,
                            offset: timeoffset,
                            val: +data[i].message[key]
                        });
                    }
                }
            }
        }
    }
    initF1Chart(eval($("#f1-sensors").val()));
});

// Bron: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
function isArray(variable) {
    return (!!variable) && (variable.constructor === Array);
}

function initF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
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

        for (var i = 0; i < f1zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f1Zone" + f1zones[i] + "Checkbox.disabled = true");

            svg.f1.append("path")
                .datum(dataVariable)
                .attr("id", "f1-zone" + f1zones[i] + "-line")
                .attr("class", "line")
                .attr("d", line.f1)
                .style("display", "none");
        }
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

        for (var i = 0; i < f1zones.length; i++) {
            var zone = "zone" + f1zones[i];
            svg.f1.append("path")
                .datum(dataVariable[zone])
                .attr("id", "f1-" + zone + "-line")
                .attr("class", "line")
                .attr("d", line.f1);
        }
    }
}

function updateF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
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

        for (var i = 0; i < f1zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f1Zone" + f1zones[i] + "Checkbox.disabled = true");

            var zone = "zone" + f1zones[i];
            svg.f1.select("#f1-" + zone + "-line")
                .datum(dataVariable)
                .transition()
                .duration(1000)
                .attr("d", line.f1)
                .style("display", "none");
        }
    } else {
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

        for (var i = 0; i < f1zones.length; i++) {
            // De checkboxes moeten weer werken als de data over meerdere zones
            eval("f1Zone" + f1zones[i] + "Checkbox.disabled = false");

            var zone = "zone" + f1zones[i];
            svg.f1.select("#f1-" + zone + "-line")
                .datum(dataVariable[zone])
                .transition()
                    .duration(1000)
                    .attr("d", line.f1)
                    .style("display", function() {
                        if (eval("f1Zone" + f1zones[i] + "Checkbox.checked")) {
                            return "";
                        } else {
                            return "none";
                        }
                    });
        }
    }
}
