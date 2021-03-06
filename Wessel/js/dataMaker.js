/*
dataMaker.js

Wessel de Jong
10206620

Programmeerproject
Prox data 
*/

// final dataset
var data_general = {}
var floor_1 = {}
var floor_2 = {}
var floor_3 = {}

function dataMaker(callback) {
	// variables for temporary storing data per floor
	var general_floor_1 = []
	var general_floor_2 = []
	var general_floor_3 = []

	// variables for temporary storing data per floor per zone
	var floor_1_zone_1= []
	var floor_1_zone_2= []
	var floor_1_zone_3= []
	var floor_1_zone_4= []
	var floor_1_zone_5= []
	var floor_1_zone_6= []
	var floor_1_zone_7= []
	var floor_1_zone_8= []

	var floor_1_data = [floor_1_zone_1, floor_1_zone_2, floor_1_zone_3, floor_1_zone_4, floor_1_zone_5, floor_1_zone_6, floor_1_zone_7, floor_1_zone_8]

	var floor_2_zone_1= []
	var floor_2_zone_2= []
	var floor_2_zone_3= []
	var floor_2_zone_4= []
	var floor_2_zone_5= []
	var floor_2_zone_6= []
	var floor_2_zone_7= []

	var floor_2_data = [floor_2_zone_1, floor_2_zone_2, floor_2_zone_3, floor_2_zone_4, floor_2_zone_5, floor_2_zone_6, floor_2_zone_7]

	var floor_3_zone_1= []
	var floor_3_zone_2= []
	var floor_3_zone_3= []
	var floor_3_zone_4= []
	var floor_3_zone_5= []
	var floor_3_zone_6= []
	var floor_3_zone_ServerRoom= []

	var floor_3_data = [floor_3_zone_1, floor_3_zone_2, floor_3_zone_3, floor_3_zone_4, floor_3_zone_5, floor_3_zone_6, floor_3_zone_ServerRoom]


	// keys for dataset
	var keys_general = ["floor_1", "floor_2", "floor_3"];
	var keys_floor_1 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7", "zone_8"];
	var keys_floor_2 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7"];
	var keys_floor_3 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_ServerRoom"];

	// load in data
	d3.csv("proxOut-MC2.csv", function(error, csv) {
	  	if (error) {
	  		throw error;
	  		return alert("Error loading data!");
	  	}

	  	// create dataset for each floor separate
	  	csv.forEach(function(d) {
	  		if (+d.floor == 1) {
	  			general_floor_1.push(d);

	  			for (i = 0; i < floor_1_data.length; i++) {
	  				if (+d.zone == i + 1) {
	  					floor_1_data[i].push(d)
	  				}
	  			}

	  		} 
	  		else if (+d.floor == 2) {
	  			general_floor_2.push(d);

	  			for (i = 0; i < floor_2_data.length; i++) {
	  				if (+d.zone == i + 1) {
	  					floor_2_data[i].push(d)
	  				}
	  			}
	  		}
	  		else {
	  			general_floor_3.push(d);

	  			for (i = 0; i < floor_3_data.length; i++) {
	  				if (+d.zone == i + 1)  {
	  					floor_3_data[i].push(d);
	  				}
	  				else if (d.zone === "ServerRoom") {
	  					floor_3_data[6].push(d);
	  				}
	  			}
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

			// temporary dataset for each floor
			var floor_data = [];

			// create final dataset for each floor
			for (j = 0; j < Object.keys(tally).length; j++) {
			    floor_data.push({
			    	date: Object.keys(tally)[j],
			        frequency: tally[Object.keys(tally)[j]]
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

		// iterate over data for each floor
		for (i = 0; i < floor_1_data.length; i++) {
			var tally = {};

			 // add data till third of June
			floor_1_data[i].forEach(function(d) {
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
			floor_1_data[i].forEach(function(d) {
			    var datetime = formatDate.parse(d.timestamp);
		  
			    if (datetime.getDate() > 4) {
			    	var date = formatDate_2(datetime).split(':')[0];
			    	tally[date] = (tally[date]||0) + 1
			    }
			});

			// temporary dataset for each zone
			var zone_1_data = [];

			// create final dataset for each floor
			for (j = 0; j < Object.keys(tally).length; j++) {
			    zone_1_data.push({
			    	date: Object.keys(tally)[j],
			        frequency: tally[Object.keys(tally)[j]]
			    })
			}

			// convert data
			zone_1_data.forEach(function(d){
				d.date = formatDate_2.parse(d.date);
				d.frequency = + d.frequency;
			})

			// puch separate floor data to one final dataset
			floor_1[keys_floor_1[i]] = zone_1_data;
		};

		// iterate over data for each floor
		for (i = 0; i < floor_2_data.length; i++) {
			var tally = {};

			 // add data till third of June
			floor_2_data[i].forEach(function(d) {
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
			floor_2_data[i].forEach(function(d) {
			    var datetime = formatDate.parse(d.timestamp);
		  
			    if (datetime.getDate() > 4) {
			    	var date = formatDate_2(datetime).split(':')[0];
			    	tally[date] = (tally[date]||0) + 1
			    }
			});

			// temporary dataset for each zone
			var zone_2_data = [];

			// create final dataset for each floor
			for (j = 0; j < Object.keys(tally).length; j++) {
			    zone_2_data.push({
			    	date: Object.keys(tally)[j],
			        frequency: tally[Object.keys(tally)[j]]
			    })
			}

			// convert data
			zone_2_data.forEach(function(d){
				d.date = formatDate_2.parse(d.date);
				d.frequency = + d.frequency;
			})

			// puch separate floor data to one final dataset
			floor_2[keys_floor_2[i]] = zone_2_data;
		};

		// iterate over data for each floor
		for (i = 0; i < floor_3_data.length; i++) {
			var tally = {};

			 // add data till third of June
			floor_3_data[i].forEach(function(d) {
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
			floor_3_data[i].forEach(function(d) {
			    var datetime = formatDate.parse(d.timestamp);
		  
			    if (datetime.getDate() > 4) {
			    	var date = formatDate_2(datetime).split(':')[0];
			    	tally[date] = (tally[date]||0) + 1
			    }
			});

			// temporary dataset for each zone
			var zone_3_data = [];

			// create final dataset for each floor
			for (j = 0; j < Object.keys(tally).length; j++) {
			    zone_3_data.push({
			    	date: Object.keys(tally)[j],
			        frequency: tally[Object.keys(tally)[j]]
			    })
			}

			// convert data
			zone_3_data.forEach(function(d){
				d.date = formatDate_2.parse(d.date);
				d.frequency = + d.frequency;
			})

			// puch separate floor data to one final dataset
			floor_3[keys_floor_3[i]] = zone_3_data;
		};

		var data = {general:data_general, floor_1: floor_1, floor_2: floor_2, floor_3: floor_3};
		callback(data);
	});
};



