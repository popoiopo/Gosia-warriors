/*
dataMaker.js

Wessel de Jong
10206620

Programmeerproject
Prox data
*/

// final dataset
var data_general = {};
var floor_1 = {};
var floor_2 = {};
var floor_3 = {};

var dataDays = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var dataHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var dataFloors = [1, 2, 3];

function dataMaker() {
    // keys for dataset
	var keys_general = ["floor_1", "floor_2", "floor_3"];
	var keys_floor_1 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7", "zone_8"];
	var keys_floor_2 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7"];
	var keys_floor_3 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_ServerRoom"];

    for (var f = 0; f < keys_general.length; f++) {
        var floorKey = keys_general[f];
        eval("var general_" + floorKey + "= []");

        var keysArray = eval("keys_" + floorKey);
        for (var z = 0; z < keysArray.length; z++) {
            eval("var " + floorKey + "_" + keysArray[z] + "= []");
        }
    }

	var floor_1_data = [floor_1_zone_1, floor_1_zone_2, floor_1_zone_3, floor_1_zone_4, floor_1_zone_5, floor_1_zone_6, floor_1_zone_7, floor_1_zone_8];
	var floor_2_data = [floor_2_zone_1, floor_2_zone_2, floor_2_zone_3, floor_2_zone_4, floor_2_zone_5, floor_2_zone_6, floor_2_zone_7];
	var floor_3_data = [floor_3_zone_1, floor_3_zone_2, floor_3_zone_3, floor_3_zone_4, floor_3_zone_5, floor_3_zone_6, floor_3_zone_ServerRoom];

	// load in data
	d3.csv("json/proxOut-MC2.csv", function(error, csv) {
	  	if (error) {
	  		throw error;
	  		return alert("Error loading data!");
	  	}

	  	// create dataset for each floor separate
        csv.forEach(function(d) {
	  		var floor = +d.floor;
            eval("general_floor_" + floor + ".push(d)");
            var floorDataLength = eval("floor_" + floor + "_data.length");
            if (d.zone === "ServerRoom") {
                floor_3_data[6].push(d);
            } else {
                eval("floor_" + floor + "_data[" + (+d.zone - 1) + "].push(d)");
            }
	  	});


	  	// store data for floors in one array
	  	var floors = [general_floor_1, general_floor_2, general_floor_3];

	  	// format for parsing date data
	  	var formatDate = d3.time.format("%Y-%m-%d%H:%M:%S");
		var formatDate_2 = d3.time.format("%Y-%m-%d %H");

		// iterate over data for each floor
		for (i = 0; i < floors.length; i++) {
			var tally = {};

			 // add data till third of June
			floors[i].forEach(function(d) {
				// get date and time of detection
			    var datetime = formatDate.parse(d.timestamp);

		    	var date = formatDate_2(datetime).split(':')[0];
		    	tally[date] = (tally[date]||0) + 1;

			});

            tally = makeMissingData(tally);

			// temporary dataset for each floor
			var floor_data = [];

            var sortedTallyKeys = Object.keys(tally).sort();
			// create final dataset for each floor
			for (j = 0; j < sortedTallyKeys.length; j++) {
			    floor_data.push({
			    	date: sortedTallyKeys[j],
			        frequency: tally[sortedTallyKeys[j]]
			    });
			}

			// convert data
			floor_data.forEach(function(d){
				d.date = formatDate_2.parse(d.date);
				d.frequency = + d.frequency;
			})

			// puch separate floor data to one final dataset
			data_general[keys_general[i]] = floor_data;
		};

        for (var f = 0; f < dataFloors.length; f++) {
            var floor = dataFloors[f];
            var floorData = eval("floor_" + floor + "_data");
            for (var i = 0; i < floorData.length; i++) {
                var tally = {};

                floorData[i].forEach(function(d) {
                    var datetime = formatDate.parse(d.timestamp);
                    var date = formatDate_2(datetime).split(":")[0];
                    tally[date] = (tally[date] || 0) + 1;
                });

                tally = makeMissingData(tally);

                var zone_data = [];

                var sortedTallyKeys = Object.keys(tally).sort();
                for (var j = 0; j < sortedTallyKeys.length; j++) {
                    zone_data.push({
                        date: sortedTallyKeys[j],
                        frequency: tally[sortedTallyKeys[j]]
                    });
                }

                zone_data.forEach(function(d) {
                    d.date = formatDate_2.parse(d.date);
                    d.frequency = +d.frequency;
                });

                eval("floor_" + floor + "[keys_floor_" + floor + "[i]] = zone_data");
            }
        }

		var data = {general:data_general, floor_1: floor_1, floor_2: floor_2, floor_3: floor_3};

        proxGrapher(data.general, "prox-general");
        proxGrapher(data.floor_1, "prox-svg_1");
        proxGrapher(data.floor_2, "prox-svg_2");
        proxGrapher(data.floor_3, "prox-svg_3");

        bindProxEvents();
	});
};

function makeMissingData(obj) {
    var freq = obj;
    var freqKeys = Object.keys(freq);
    for (var j = 0; j < dataDays.length; j++) {
        var day = dataDays[j];
        for (var k = 0; k < dataHours.length; k++) {
            var hour = dataHours[k];
            if (day === 31) {
                if (hour < 10) {
                    if (freqKeys.indexOf("2016-05-31 0" + hour) === -1) {
                        freq["2016-05-" + day + " 0" + hour] = 0;
                    }
                }
                else {
                    if (freqKeys.indexOf("2016-05-31 " + hour) === -1) {
                        freq["2016-05-" + day + " " + hour] = 0;
                    }
                }
            } else if (day < 10) {
                if (hour < 10) {
                    if (freqKeys.indexOf("2016-06-0" + day + " 0" + hour) === -1) {
                        freq["2016-06-0" + day + " 0" + hour] = 0;
                    }
                } else {
                    if (freqKeys.indexOf("2016-06-0" + day + " " + hour) === -1) {
                        freq["2016-06-0" + day + " " + hour] = 0;
                    }
                }
            } else {
                if (hour < 10) {
                    if (freqKeys.indexOf("2016-06-" + day + " 0" + hour) === -1) {
                        freq["2016-06-" + day + " 0" + hour] = 0;
                    }
                } else {
                    if (freqKeys.indexOf("2016-06-" + day + " " + hour) === -1) {
                        freq["2016-06-" + day + " " + hour] = 0;
                    }
                }
            }
        }
    }
    return freq;
}
