var f2zones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12a", "12b", "12c", "14", "15", "16"];

var f2lightsPower = {},
    f2equipmentPower = {},
    f2thermostatTemp = {},
    f2thermostatHeatingSetpoint = {},
    f2thermostatCoolingSetpoint = {},
    f2returnOutletCo2Concentration = {},
    f2supplyInletTemperature = {},
    f2supplyInletMassFlowRate = {},
    f2vavReheatDamperPosition = {},
    f2reheatCoilPower = {},
    f2vavAvailabilityManagerNightCycleControlStatus = [],
    f2vavSysSupplyFanFanPower = [],
    f2bathExhaustFanPower = [],
    f2vavSysHeatingCoilPower = [],
    f2vavSysOutdoorAirFlowFraction = [],
    f2vavSysOutdoorAirMassFlowRate = [],
    f2vavSysCoolingCoilPower = [],
    f2vavSysAirLoopInletTemperature = [],
    f2vavSysAirLoopInletMassFlowRate = [],
    f2vavSysSupplyFanOutletTemperature = [],
    f2vavSysSupplyFanOutletMassFlowRate = [];

var f2Zone1Checkbox, f2Zone2Checkbox, f2Zone3Checkbox, f2Zone4Checkbox, f2Zone5Checkbox, f2Zone6Checkbox, f2Zone7Checkbox, f2Zone8Checkbox, f2Zone9Checkbox,
    f2Zone10Checkbox, f2Zone11Checkbox, f2Zone12aCheckbox, f2Zone12bCheckbox, f2Zone12cCheckbox, f2Zone14Checkbox, f2Zone15Checkbox, f2Zone16Checkbox;

for (var i = 0; i < f2zones.length; i++) {
    var zone = "zone" + f2zones[i];
    f2lightsPower[zone] = [];
    f2equipmentPower[zone] = [];
    f2thermostatTemp[zone] = [];
    f2thermostatHeatingSetpoint[zone] = [];
    f2thermostatCoolingSetpoint[zone] = [];
    f2returnOutletCo2Concentration[zone] = [];
    f2supplyInletTemperature[zone] = [];
    f2supplyInletMassFlowRate[zone] = [];
    f2vavReheatDamperPosition[zone] = [];
    f2reheatCoilPower[zone] = [];
    
    eval("f2Zone" + f2zones[i] + "Checkbox = document.getElementById('f2-" + zone + "');");
}

$(".f2-zone-checkbox").change(function() {
    $("#" + this.id + "-line").toggle();
});

d3.select("#f2-vis-info").text($("#f2-dropdown :selected").text());

$("#f2-dropdown").change(changeF2Header);

function changeF2Header() {
    d3.select("#f2-vis-info").text($("#f2-dropdown :selected").text());
    updateF2Chart(eval($("#f2-sensors").val()));
    // console.log(eval($("#f2-sensors").val()));
}

// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

d3.json("json/floor2-MC2.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        // console.log(data[i].message);
        var datetime = new Date(dateFormat.parse(data[i]["Date/Time"])/* - new Date().getTimezoneOffset() * 60 * 1000*/);
        // console.log(datetime);
        for (var key in data[i]) {
            if (key !== "Date/Time" && key !== "type" && key !== "floor") {
                var zone = "zone";
                if (wildcardCompare(key, "F_2_Z_10*")) {
                    zone += "10";
                } else if (wildcardCompare(key, "F_2_Z_11*")) {
                    zone += "11";
                } else if (wildcardCompare(key, "F_2_Z_12A*")) {
                    zone += "12a";
                } else if (wildcardCompare(key, "F_2_Z_12B*")) {
                    zone += "12b";
                } else if (wildcardCompare(key, "F_2_Z_12C*")) {
                    zone += "12c";
                } else if (wildcardCompare(key, "F_2_Z_14*")) {
                    zone += "14";
                } else if (wildcardCompare(key, "F_2_Z_15*")) {
                    zone += "15";
                } else if (wildcardCompare(key, "F_2_Z_16*")) {
                    zone += "16";
                } else if (wildcardCompare(key, "F_2_Z_2*")) {
                    zone += "2";
                } else if (wildcardCompare(key, "F_2_Z_3*")) {
                    zone += "3";
                } else if (wildcardCompare(key, "F_2_Z_4*")) {
                    zone += "4";
                } else if (wildcardCompare(key, "F_2_Z_5*")) {
                    zone += "5";
                } else if (wildcardCompare(key, "F_2_Z_6*")) {
                    zone += "6";
                } else if (wildcardCompare(key, "F_2_Z_7*")) {
                    zone += "7";
                } else if (wildcardCompare(key, "F_2_Z_8*")) {
                    zone += "8";
                } else if (wildcardCompare(key, "F_2_Z_9*")) {
                    zone += "9";
                } else if (wildcardCompare(key, "F_2_Z_1*")) {
                    zone += "1";
                } else {
                    if (key === "F_2_VAV_SYS SUPPLY FAN:Fan Power") {
                        f2vavSysSupplyFanFanPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_BATH_EXHAUST:Fan Power") {
                        f2bathExhaustFanPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS HEATING COIL Power") {
                        f2vavSysHeatingCoilPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS Outdoor Air Flow Fraction") {
                        f2vavSysOutdoorAirFlowFraction.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS Outdoor Air Mass Flow Rate") {
                        f2vavSysOutdoorAirMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS COOLING COIL Power") {
                        f2vavSysCoolingCoilPower.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS AIR LOOP INLET Temperature") {
                        f2vavSysAirLoopInletTemperature.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS AIR LOOP INLET Mass Flow Rate") {
                        f2vavSysAirLoopInletMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS SUPPLY FAN OUTLET Temperature") {
                        f2vavSysSupplyFanOutletTemperature.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (key === "F_2_VAV_SYS SUPPLY FAN OUTLET Mass Flow Rate") {
                        f2vavSysSupplyFanOutletMassFlowRate.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else {
                        // F_2 VAV Availability Manager Night Cycle Control Status
                        f2vavAvailabilityManagerNightCycleControlStatus.push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    }
                }

                // De data betreft een zone
                if (zone !== "zone") {
                    var sensorReading = key.substr(key.indexOf(" ") + 1, key.length);
                    if (sensorReading === "Lights Power") {
                        f2lightsPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Equipment Power") {
                        f2equipmentPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Temp") {
                        f2thermostatTemp[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Heating Setpoint") {
                        f2thermostatHeatingSetpoint[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "Thermostat Cooling Setpoint") {
                        f2thermostatCoolingSetpoint[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "VAV REHEAT Damper Position") {
                        f2vavReheatDamperPosition[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "REHEAT COIL Power") {
                        f2reheatCoilPower[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "RETURN OUTLET CO2 Concentration") {
                        f2returnOutletCo2Concentration[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else if (sensorReading === "SUPPLY INLET Temperature") {
                        f2supplyInletTemperature[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    } else {
                        // SUPPLY INLET Mass Flow Rate
                        f2supplyInletMassFlowRate[zone].push({
                            timestamp: datetime,
                            val: +data[i][key]
                        });
                    }
                }
            }
        }
    }
    // console.log(f2lightsPower);
    initF2Chart(eval($("#f2-sensors").val()));
});

// Bron: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
function isArray(variable) {
    return (!!variable) && (variable.constructor === Array);
}

function initF2Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // Data betreft de gehele verdieping
        x.f2.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f2.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        // Assen toevoegen
        svg.f2.append("g")
            .attr("id", "f2-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f1)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f2.append("g")
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
                .text($("#f2-sensors :selected").text());

        // De lijn tekenen
        svg.f2.append("path")
            .datum(dataVariable)
            .attr("id", "f2-line")
            .attr("class", "line")
            .attr("d", line.f2);

        for (var i = 0; i < f2zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f2Zone" + f2zones[i] + "Checkbox.disabled = true");

            svg.f2.append("path")
                .datum(dataVariable)
                .attr("id", "f2-zone" + f2zones[i] + "-line")
                .attr("class", "line")
                .attr("d", line.f2)
                .style("display", "none");
        }
    } else {
        // Data betreft meerdere zones
        x.f2.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f2.domain([0, yMax]).nice();

        // Assen toevoegen
        svg.f2.append("g")
            .attr("id", "f2-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f2)
            // Zet de labels aan de x-as schuin, zodat ze elkaar niet overlappen
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)" );

        svg.f2.append("g")
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
                .text($("#f2-sensors :selected").text());

        // De lijn tekenen
        svg.f2.append("path")
            .datum(dataVariable.zone1)
            .attr("id", "f2-line")
            .attr("class", "line")
            .attr("d", line.f2)
            .style("display", "none");

        for (var i = 0; i < f2zones.length; i++) {
            var zone = "zone" + f2zones[i];
            svg.f2.append("path")
                .datum(dataVariable[zone])
                .attr("id", "f2-" + zone + "-line")
                .attr("class", "line")
                .attr("d", line.f2);
        }
    }
}

function updateF2Chart(dataVariable) {
    if (isArray(dataVariable)) {
        x.f2.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f2.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        svg.f2.select("#f2-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f2);

        svg.f2.select("#f2-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f2);

        svg.f2.select("#f2-y-label")
            .transition()
                .duration(1000)
                .text($("#f2-sensors :selected").text());

        svg.f2.select("#f2-line")
            .datum(dataVariable)
            .transition()
                .duration(1000)
                .attr("d", line.f2)
                .style("display", "");

        for (var i = 0; i < f2zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f2Zone" + f2zones[i] + "Checkbox.disabled = true");

            var zone = "zone" + f2zones[i];
            svg.f2.select("#f2-" + zone + "-line")
                .datum(dataVariable)
                .transition()
                .duration(1000)
                .attr("d", line.f2)
                .style("display", "none");
        }
    } else {
        x.f2.domain(d3.extent(dataVariable.zone1, function(d) {return d.timestamp;})).nice();
        var yMax = 0;
        for (var zone in dataVariable) {
            if (d3.max(dataVariable[zone], function(d) {return d.val;}) > yMax) {
                yMax = d3.max(dataVariable[zone], function(d) {return d.val;});
            }
        }
        y.f2.domain([0, yMax]).nice();

        svg.f2.select("#f2-x-axis")
            .transition()
                .duration(1000)
                .call(xAxis.f2);

        svg.f2.select("#f2-y-axis")
            .transition()
                .duration(1000)
                .call(yAxis.f1);

        svg.f2.select("#f2-y-label")
            .transition()
                .duration(1000)
                .text($("#f2-sensors :selected").text());

        svg.f2.select("#f2-line")
            .datum(dataVariable.zone1)
            .transition()
                .duration(1000)
                .attr("d", line.f2)
                .style("display", "none");

        for (var i = 0; i < f2zones.length; i++) {
            // De checkboxes moeten weer werken als de data over meerdere zones
            eval("f2Zone" + f2zones[i] + "Checkbox.disabled = false");

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
        }
    }
}
