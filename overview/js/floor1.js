/*
* Javascript bestand bij floor1.html die de chart tekent
*/

// Houd bij voor welke zones er sensordata is
var f1zones = ["1", "2", "3", "4", "5", "7", "8a", "8b"];

// Maak lege variabelen aan voor de data die ingeladen wordt
var f1lightsPower = {},
    f1equipmentPower = {},
    f1thermostatTemp = {},
    f1thermostatHeatingSetpoint = {},
    f1thermostatCoolingSetpoint = {},
    f1returnOutletCo2Concentration = {},
    f1supplyInletTemperature = {},
    f1supplyInletMassFlowRate = {},
    f1vavReheatDamperPosition = {},
    f1reheatCoilPower = {},
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
    f1mechanicalVentilationMassFlowRate = [];

// Maak lege variabelen aan die de checkboxes in het DOM selecteren straks
var f1Zone1Checkbox, f1Zone2Checkbox, f1Zone3Checkbox, f1Zone4Checkbox, f1Zone5Checkbox, f1Zone7Checkbox, f1Zone8aCheckbox, f1Zone8bCheckbox;

// Maak placeholders voor de data die straks wordt ingeladen en pak de checkboxes uit het DOM
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

// Toggle de lijn van de checkbox die wordt aangeklikt
$(".f1-zone-checkbox").change(function() {
    $("#" + this.id + "-line").toggle();
});

// Maak de header tekst adhv de geselecteerde data
d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());

// Event listener voor als de dropdown verandert
$("#f1-dropdown").change(changeF1Header);

function changeF1Header() {
    // Update de header tekst adhv de dropdown
    d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());
    // Update de chart als de dropdown verandert
    updateF1Chart(eval($("#f1-sensors").val()));
}

// Laad de data in
d3.json("json/floor1-MC2.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        // Variabelen voor timestamp en offset voor later gebruik
        var datetime = new Date(dateFormat.parse(data[i].message["Date/Time"])/* - new Date().getTimezoneOffset() * 60 * 1000*/);
        var timeoffset = data[i].offset;

        // Ga elke sensorwaarde af
        for (var key in data[i].message) {
            // Als de key een sensorwaarde betreft
            if (key !== "Date/Time" && key !== "type" && key !== "floor") {
                var zone = "zone";
                // Check of de sensorwaarde meerdere zones betreft
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
                    // Zo niet, dan gaat de waarde over de gehele verdieping
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
                    // Check welke sensor het was
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
    // Initialiseer de chart adhv de ingeladen data en gekozen dropdown keuze
    initF1Chart(eval($("#f1-sensors").val()));
});

// Functie die de chart initialiseert
function initF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // Data betreft de gehele verdieping
        // Bereken de ranges van de data
        x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

        // Assen toevoegen
        svg.f1.append("g")
            .attr("id", "f1-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f1)
            // Zet de labels aan de x-as schuin
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
                // Maak de label de gekozen data
                .text($("#f1-sensors :selected").text());

        // De lijn tekenen voor de data die over de gehele verdieping gaat
        svg.f1.append("path")
            .datum(dataVariable)
            .attr("id", "f1-line")
            .attr("class", "line")
            .attr("d", line.f1);

        for (var i = 0; i < f1zones.length; i++) {
            // De checkboxes moeten niet werken als de data over de gehele verdieping gaat
            eval("f1Zone" + f1zones[i] + "Checkbox.disabled = true");

            // Bind de verdiepingsdata aan de zonelijnen, maar maak ze onzichtbaar
            svg.f1.append("path")
                .datum(dataVariable)
                .attr("id", "f1-zone" + f1zones[i] + "-line")
                .attr("class", "line")
                .attr("d", line.f1)
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

        // Assen toevoegen
        svg.f1.append("g")
            .attr("id", "f1-x-axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.f1)
            // Zet de labels aan de x-as schuin
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
                // Maak de label adhv de gekozen data in de dropdown
                .text($("#f1-sensors :selected").text());

        // De lijn die over de gehel verdieping gaat definieren, maar maak hem onzichtbaar
        svg.f1.append("path")
            .datum(dataVariable.zone1)
            .attr("id", "f1-line")
            .attr("class", "line")
            .attr("d", line.f1)
            .style("display", "none");

        // Loop elke zone af
        for (var i = 0; i < f1zones.length; i++) {
            var zone = "zone" + f1zones[i];
            // Maak een lijn voor elke zone en bind data aan die lijnen
            svg.f1.append("path")
                .datum(dataVariable[zone])
                .attr("id", "f1-" + zone + "-line")
                .attr("class", "line")
                .attr("d", line.f1);
        }
    }
    // Breng een lijn naar voren als er over gehoverd wordt
    d3.selectAll(".line").on("mouseover", function() {
        d3.select(this).moveToFront();
    });
}

// Functie om de chart te updaten als de dropdown verandert
function updateF1Chart(dataVariable) {
    if (isArray(dataVariable)) {
        // Data betreft de gehele verdieping
        // Bereken de nieuwe ranges van de data
        x.f1.domain(d3.extent(dataVariable, function(d) {return d.timestamp;})).nice();
        y.f1.domain([0, d3.max(dataVariable, function(d) {return d.val;})]).nice();

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
        }
    }
}
