$(".button").click(function() {
    window.location = this.value;
});

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

d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());

$("#f1-dropdown").change(changeF1Header);

function changeF1Header() {
    d3.select("#f1-vis-info").text($("#f1-dropdown :selected").text());
    updateMap(eval($("#f1-sensors").val()));
}

var dateFormat = d3.time.format("%Y-%m-%d %X");

// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

d3.json("test1.json", function(error, data) {
    if (error) throw error;

    for (var i = 0; i < data.length; i++) {
        //console.log(data[i].message["Date/Time"]);
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
});

function initMap() {

	d3.xml("VAST_EnergyZones_F1.svg", "image/svg+xml", function(error, xml) {
	  if (error) throw error;
	  document.body.appendChild(xml.documentElement)

      var data_zones = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone7", "zone8a", "zone8b"]
	  var svg1_zones = ["#zone1", "#zone2", "#zone3", "#zone4", "#zone5", "#zone7", "#zone8a", "#zone8b"]
	  var values = []

      for (var i = data_zones.length - 1; i >= 0; i--) {
          console.log(data_zones[i][0]["val"])
      	  values.push(lightsPower[data_zones[i]][0]["val"]);
	  };    
	  
	  var minValue = Math.min.apply(null, values);
	  console.log(minValue)
	  var maxValue = Math.max.apply(null, values);
	  console.log(maxValue)
	  var paletteScale = d3.scale.linear()
	  	.domain([minValue, maxValue])
	  	.range(['#edf8fb', '#005824']);

  	  for (var e = svg1_zones.length - 1; e >= 0; e--) {
  	  	  d3.select(svg1_zones[e]).style("fill", paletteScale(lightsPower[data_zones[e]][0]["val"])).style("opacity", 0.6);
      };
	});
};

function updateMap(chosen_var) {
    var data_zones = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone7", "zone8a", "zone8b"]
    var svg1_zones = ["#zone1", "#zone2", "#zone3", "#zone4", "#zone5", "#zone7", "#zone8a", "#zone8b"]
    var values = []

    for (var i = data_zones.length - 1; i >= 0; i--) {
        values.push(chosen_var[data_zones[i]][0]["val"]);
    };    

    var minValue = Math.min.apply(null, values);
    var maxValue = Math.max.apply(null, values);
    var paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(['#edf8fb', '#005824']);

    for (var e = svg1_zones.length - 1; e >= 0; e--) {
        d3.select(svg1_zones[e]).style("fill", paletteScale(chosen_var[data_zones[e]][0]["val"])).style("opacity", 0.6);
    };
}

initMap();
