/*
dataMaker.js

Wessel de Jong
10206620

Programmeerproject
Prox data
*/

$(".prox-checkbox").change(function() {
    $("#prox-" + this.value).toggle();
    $("#prox-" + this.value + "_slider").toggle();
});

// final dataset
var data_general = {};

(function dataMaker() {
    var dataDays = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var dataHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

	// variables for temporary storing data per floor
	var general_floor_1 = [];
	var general_floor_2 = [];
	var general_floor_3 = [];


	// keys for dataset
	var keys_general = ["floor_1", "floor_2", "floor_3"];

	// load in data
	d3.csv("json/proxOut-MC2.csv", function(error, csv) {
	  	if (error) {
	  		throw error;
	  		return alert("Error loading data!");
	  	}

	  	// create dataset for each floor separate
	  	csv.forEach(function(d) {
	  		if (+d.floor == 1) {
	  			general_floor_1.push(d);
	  		}
	  		else if (+d.floor == 2) {
	  			general_floor_2.push(d);
	  		}
	  		else {
	  			general_floor_3.push(d);
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

			    // add frequency of detections at given timestamp
			    if (datetime.getDate() < 4 || datetime.getDate() == 31) {
			    	var date = formatDate_2(datetime).split(':')[0];
			    	tally[date] = (tally[date]||0) + 1;
			    }
			});

			//add data for 4 june, no detections
			tally[formatDate_2(new Date("Sat Jun 04 2016 00:00:00")).split(':')[0]] = 0
			tally[formatDate_2(new Date("Sat Jun 04 2016 23:59:59")).split(':')[0]] = 0

			// add rest of data
			floors[i].forEach(function(d) {
			    var datetime = formatDate.parse(d.timestamp);

			    if (datetime.getDate() > 4) {
			    	var date = formatDate_2(datetime).split(':')[0];
			    	tally[date] = (tally[date]||0) + 1
			    }
			});

            var tallyKeys = Object.keys(tally);
            for (var j = 0; j < dataDays.length; j++) {
                var day = dataDays[j];
                for (var k = 0; k < dataHours.length; k++) {
                    var hour = dataHours[k];
                    if (day === 31) {
                        if (hour < 10) {
                            if (tallyKeys.indexOf("2016-05-31 0" + hour) === -1) {
                                tally["2016-05-" + day + " 0" + hour] = 0;
                            }
                        }
                        else {
                            if (tallyKeys.indexOf("2016-05-31 " + hour) === -1) {
                                tally["2016-05-" + day + " " + hour] = 0;
                            }
                        }
                    } else if (day < 10) {
                        if (hour < 10) {
                            if (tallyKeys.indexOf("2016-06-0" + day + " 0" + hour) === -1) {
                                tally["2016-06-0" + day + " 0" + hour] = 0;
                            }
                        } else {
                            if (tallyKeys.indexOf("2016-06-0" + day + " " + hour) === -1) {
                                tally["2016-06-0" + day + " " + hour] = 0;
                            }
                        }
                    } else {
                        if (hour < 10) {
                            if (tallyKeys.indexOf("2016-06-" + day + " 0" + hour) === -1) {
                                tally["2016-06-" + day + " 0" + hour] = 0;
                            }
                        } else {
                            if (tallyKeys.indexOf("2016-06-" + day + " " + hour) === -1) {
                                tally["2016-06-" + day + " " + hour] = 0;
                            }
                        }
                    }
                }
            }
			// temporary dataset for each floor
			var floor_data = [];

            var sortedTallyKeys = Object.keys(tally).sort();
			// create final dataset for each floor
			for (j = 0; j < sortedTallyKeys.length; j++) {
			    floor_data.push({
			    	date: sortedTallyKeys[j],
			        frequency: tally[sortedTallyKeys[j]]
			    })
			}

			// convert data
			floor_data.forEach(function(d){
				d.date = formatDate_2.parse(d.date);
				d.frequency = + d.frequency;
			})

			// puch separate floor data to one final dataset
			data_general[keys_general[i]] = floor_data;
		};

		// var data = {general:data_general, floor_1: floor_1, floor_2: floor_2, floor_3: floor_3};

		proxGrapher(data_general, "prox-general");
	});
})();
