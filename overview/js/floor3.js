var f3zones = ["1", "2", "3", "5", "6", "7", "8", "9", "10", "11a", "11b", "11c", "12"];

var f3lightsPower = {},
    f3equipmentPower = {},
    f3thermostatTemp = {},
    f3thermostatHeatingSetpoint = {},
    f3thermostatCoolingSetpoint = {},
    f3returnOutletCo2Concentration = {},
    f3supplyInletTemperature = {},
    f3supplyInletMassFlowRate = {},
    f3vavReheatDamperPosition = {},
    f3reheatCoilPower = {},
    f3vavAvailabilityManagerNightCycleControlStatus = [],
    f3vavSysSupplyFanFanPower = [],
    f3bathExhaustFanPower = [],
    f3vavSysHeatingCoilPower = [],
    f3vavSysOutdoorAirFlowFraction = [],
    f3vavSysOutdoorAirMassFlowRate = [],
    f3vavSysCoolingCoilPower = [],
    f3vavSysAirLoopInletTemperature = [],
    f3vavSysAirLoopInletMassFlowRate = [],
    f3vavSysSupplyFanOutletTemperature = [],
    f3vavSysSupplyFanOutletMassFlowRate = [];

var f3Zone1Checkbox, f3Zone2Checkbox, f3Zone3Checkbox, f3Zone5Checkbox, f3Zone6Checkbox, f3Zone7Checkbox, f3Zone8Checkbox,
    f3Zone9Checkbox, f3Zone10Checkbox, f3Zone11aCheckbox, f3Zone11bCheckbox, f3Zone11cCheckbox, f3Zone12Checkbox;

for (var i = 0; i < f3zones.length; i++) {
    var zone = "zone" + f3zones[i];
    if (zone !== "zone12") {
        f3lightsPower[zone] = [];
        f3equipmentPower[zone] = [];
        f3thermostatTemp[zone] = [];
        f3thermostatHeatingSetpoint[zone] = [];
        f3thermostatCoolingSetpoint[zone] = [];
        f3returnOutletCo2Concentration[zone] = [];
        f3supplyInletTemperature[zone] = [];
        f3supplyInletMassFlowRate[zone] = [];
        f3vavReheatDamperPosition[zone] = [];
    }
    if (zone !== "zone9") {
        f3reheatCoilPower[zone] = [];
    }

    eval("f3Zone" + f3zones[i] + "Checkbox = document.getElementById('f3-" + zone + "');");
}

$(".f3-zone-checkbox").change(function() {
    $("#" + this.id + "-line").toggle();
});

d3.select("#f3-vis-info").text($("#f3-dropdown :selected").text());

$("#f3-dropdown").change(changeF3Header);

function changeF3Header() {
    d3.select("#f3-vis-info").text($("#f3-dropdown :selected").text());
    updateF3Chart(eval($("#f3-sensors").val()));
    // console.log($("#f3-sensors").val());
    // console.log(eval($("#f3-sensors").val()));
}

d3.json("json/floor3-MC2.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        // console.log(data[i].message);
        var datetime = new Date(dateFormat.parse(data[i]["Date/Time"])/* - new Date().getTimezoneOffset() * 60 * 1000*/);
        // console.log(datetime);
        for (var key in data[i]) {
            if (key !== "Date/Time" && key !== "type" && key !== "floor") {
                var zone = "zone";
                if (wildcardCompare(key, "F_3_Z_10*")) {
                    zone += "10";
                } else if (wildcardCompare(key, "F_3_Z_11A*")) {
                    zone += "11a";
                } else if (wildcardCompare(key, "F_3_Z_11B*")) {
                    zone += "11b";
                } else if (wildcardCompare(key, "F_3_Z_11C*")) {
                    zone += "11c";
                } else if (wildcardCompare(key, "F_3_Z_12*")) {
                    zone += "12";
                } else if (wildcardCompare(key, "F_3_Z_2*")) {
                    zone += "2";
                } else if (wildcardCompare(key, "F_3_Z_3*")) {
                    zone += "3";
                } else if (wildcardCompare(key, "F_3_Z_4*")) {
                    zone += "4";
                } else if (wildcardCompare(key, "F_3_Z_5*")) {
                    zone += "5";
                } else if (wildcardCompare(key, "F_3_Z_6*")) {
                    zone += "6";
                } else if (wildcardCompare(key, "F_3_Z_7*")) {
                    zone += "7";
                } else if (wildcardCompare(key, "F_3_Z_8*")) {
                    zone += "8";
                } else if (wildcardCompare(key, "F_3_Z_9*")) {
                    zone += "9";
                } else if (wildcardCompare(key, "F_3_Z_1*")) {
                    zone += "1";
                } else {
                    if (key === "F_3_VAV_SYS SUPPLY FAN:Fan Power") {
                        f3vavSysSupplyFanFanPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_BATH_EXHAUST:Fan Power") {
                        f3bathExhaustFanPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS HEATING COIL Power") {
                        f3vavSysHeatingCoilPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS Outdoor Air Flow Fraction") {
                        f3vavSysOutdoorAirFlowFraction.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS Outdoor Air Mass Flow Rate") {
                        f3vavSysOutdoorAirMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS COOLING COIL Power") {
                        f3vavSysCoolingCoilPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS AIR LOOP INLET Temperature") {
                        f3vavSysAirLoopInletTemperature.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS AIR LOOP INLET Mass Flow Rate") {
                        f3vavSysAirLoopInletMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS SUPPLY FAN OUTLET Temperature") {
                        f3vavSysSupplyFanOutletTemperature.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_3_VAV_SYS SUPPLY FAN OUTLET Mass Flow Rate") {
                        f3vavSysSupplyFanOutletMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else {
                        // F_3 VAV Availability Manager Night Cycle Control Status
                        f3vavAvailabilityManagerNightCycleControlStatus.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    }
                }

                // De data betreft een zone
                if (zone !== "zone") {
                    var sensorReading = key.substr(key.indexOf(" ") + 1, key.length);
                    if (sensorReading === "Lights Power") {
                        f3lightsPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Equipment Power") {
                        f3equipmentPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Temp") {
                        f3thermostatTemp[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Heating Setpoint") {
                        f3thermostatHeatingSetpoint[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Cooling Setpoint") {
                        f3thermostatCoolingSetpoint[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "VAV REHEAT Damper Position") {
                        f3vavReheatDamperPosition[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "REHEAT COIL Power") {
                        f3reheatCoilPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "RETURN OUTLET CO2 Concentration") {
                        f3returnOutletCo2Concentration[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Temperature") {
                        f3supplyInletTemperature[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else {
                        // SUPPLY INLET Mass Flow Rate
                        f3supplyInletMassFlowRate[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    }
                }
            }
        }
    }
    initF3Chart(eval($("#f3-sensors").val()));
});

function initF3Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // Data betreft de gehele verdieping
        x.f3.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f3.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        // Assen toevoegen
        svg.f3.append("g")
            .attr("id", "f3-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f3)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f3.append("g")
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
                .text($("#f3-sensors :selected").text());

        // De lijn tekenen
        svg.f3.append("path")
            .datum(dataVariable)
            .attr("id", "f3-line")
            .attr("class", "line")
            .attr("d", line.f3);

        for (var i = 0; i < f3zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f3Zone" + f3zones[i] + "Checkbox.disabled = true");

            svg.f3.append("path")
                .datum(dataVariable)
                .attr("id", "f3-zone" + f3zones[i] + "-line")
                .attr("class", "line")
                .attr("d", line.f3)
                .style("display", "none");
        }
    } else {
        // Data betreft meerdere zones
        x.f3.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f3.domain([0, yMax]).nice();

        // Assen toevoegen
        svg.f3.append("g")
            .attr("id", "f3-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f3)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f3.append("g")
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
                .text($("#f3-sensors :selected").text());

        // De lijn tekenen
        svg.f3.append("path")
            .datum(dataVariable.zone1)
            .attr("id", "f3-line")
            .attr("class", "line")
            .attr("d", line.f3)
            .style("display", "none");

        for (var i = 0; i < f3zones.length; i++) {
            var zone = "zone" + f3zones[i];

            if (zone !== "zone12" && zone !== "zone9") {
                svg.f3.append("path")
                    .datum(dataVariable[zone])
                    .attr("id", "f3-" + zone + "-line")
                    .attr("class", "line")
                    .attr("d", line.f3);
            } else if (zone === "zone9") {
                if ($("#f3-sensors").val() !== "f3reheatCoilPower") {
                    svg.f3.append("path")
                        .datum(dataVariable[zone])
                        .attr("id", "f3-" + zone + "-line")
                        .attr("class", "line")
                        .attr("d", line.f3);
                } else {
                    f3Zone9Checkbox.disabled = true;
                    svg.f3.append("path")
                        .datum(dataVariable.zone1)
                        .attr("id", "f3-" + zone + "-line")
                        .attr("class", "line")
                        .attr("d", line.f3)
                        .style("display", "none");
                }
            } else if (zone === "zone12") {
                if ($("#f3-sensors").val() === "f3reheatCoilPower") {
                    svg.f3.append("path")
                        .datum(dataVariable.zone1)
                        .attr("id", "f3-" + zone + "-line")
                        .attr("class", "line")
                        .attr("d", line.f3);
                } else {
                    f3Zone12Checkbox.disabled = true;
                    svg.f3.append("path")
                        .datum(dataVariable.zone1)
                        .attr("id", "f3-" + zone + "-line")
                        .attr("class", "line")
                        .attr("d", line.f3)
                        .style("display", "none");
                }
            }
        }
    }
}

function updateF3Chart(dataVariable) {
    if (isArray(dataVariable)) {
        x.f3.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f3.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        svg.f3.select("#f3-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f3);

        svg.f3.select("#f3-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f3);

        svg.f3.select("#f3-y-label")
            .transition()
                .duration(1000)
                .text($("#f3-sensors :selected").text());

        svg.f3.select("#f3-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f3)
                .style("display", "");

        for (var i = 0; i < f3zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f3Zone" + f3zones[i] + "Checkbox.disabled = true");

            var zone = "zone" + f3zones[i];
            svg.f3.select("#f3-" + zone + "-line")
                .datum(dataVariable)
                .transition()
                .duration(1000)
                .attr("d", line.f3)
                .style("display", "none");
        }
    } else {
        x.f3.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f3.domain([0, yMax]).nice();

        svg.f3.select("#f3-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f3);

        svg.f3.select("#f3-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f3);

        svg.f3.select("#f3-y-label")
            .transition()
                .duration(1000)
                .text($("#f3-sensors :selected").text());

        svg.f3.select("#f3-line")
            .datum(dataVariable.zone1)
            .transition()
                .duration(1000)
                .attr("d", line.f3)
                .style("display", "none");

        for (var i = 0; i < f3zones.length; i++) {
            // De checkboxes moeten weer werken als de data over meerdere zones
            eval("f3Zone" + f3zones[i] + "Checkbox.disabled = false");

            var zone = "zone" + f3zones[i];
            if (zone !== "zone9" && zone !== "zone12") {
                svg.f3.select("#f3-" + zone + "-line")
                    .datum(dataVariable[zone])
                    .transition()
                        .duration(1000)
                        .attr("d", line.f3)
                        .style("display", function() {
                            if (eval("f3Zone" + f3zones[i] + "Checkbox.checked")) {
                                return "";
                            } else {
                                return "none";
                            }
                        });
            } else if (zone === "zone9") {
                if ($("#f3-sensors").val() !== "f3reheatCoilPower") {
                    svg.f3.select("#f3-" + zone + "-line")
                        .datum(dataVariable[zone])
                        .transition()
                            .duration(1000)
                            .attr("d", line.f3)
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
                }
            } else if (zone === "zone12") {
                if ($("#f3-sensors").val() === "f3reheatCoilPower") {
                    svg.f3.select("#f3-" + zone + "-line")
                        .datum(dataVariable[zone])
                        .transition()
                            .duration(1000)
                            .attr("d", line.f3)
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
                }
            }
        }
    }
}
