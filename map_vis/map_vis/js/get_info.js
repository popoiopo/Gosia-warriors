var floor_1 = {}
var floor_2 = {}
var floor_3 = {}
 
function changeHeader(floor) {
    d3.select("#f" + floor + "-vis-info").text($("#f" + floor + "-dropdown :selected").text());
    timestamp = d3.select("#slider-value" + floor).html();
    timestamp = new Date(timestamp);
    updateMap(eval("f" + floor +$("#f" + floor + "-sensors").val()), timestamp);
    // console.log(eval($("#f2-sensors").val()));
}

// Bron: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
function wildcardCompare(str, rule) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

function drawLegendprox(paletteScale, floor) {
    d3.select("#Layer_" + floor).select(".proxlegendLinear" + floor).remove();

    var svg = d3.select("#Layer_" + floor);

    svg.append("g")
        .attr("class", "proxlegendLinear" + floor)
        .attr("transform", "translate(1700,100)");

    var legendLinear = d3.legend.color()
        .shapeWidth(30)
        .scale(paletteScale);

    svg.select(".proxlegendLinear" + floor)
        .call(legendLinear);
}

function drawlegendHVAC(paletteScale, floor) {

    var svg = d3.select("#Layer_" + floor);

    svg.append("g")
        .attr("class", "legendLinear" + floor)
        .attr("transform", "translate(700,100)");

    var legendLinear = d3.legend.color()
        .shapeWidth(30)
        .scale(paletteScale);

    svg.select(".legendLinear" + floor)
        .call(legendLinear);
}

function initMap(floor) {

    d3.xml("svg/svg_floor" + floor + ".svg", "image/svg+xml", function(error, xml) {
      if (error) throw error;
      document.getElementById("heatmap" + floor).appendChild(xml.documentElement)

        var HVAC_legendx = parseInt(d3.select("#HVAC_legend").attr("x"));
        var HVAC_legendy = parseInt(d3.select("#HVAC_legend").attr("y"));
        var data_zones1 = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone7", "zone8a", "zone8b"]
        var svg_zones1 = ["#zone1_4_", "#zone2", "#zone3_4_", "#zone4", "#zone5", "#zone7", "#zone8a", "#zone8b_4_"]
        var data_zones2 = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6", "zone7", "zone8", "zone9", "zone10", "zone11", "zone12a", "zone12b", "zone12c", "zone14", "zone15", "zone16"]
        var svg_zones2 = ["#zone1", "#zone2", "#zone3", "#zone4", "#zone5", "#zone6", "#zone7", "#zone8", "#zone9", "#zone10", "#zone11", "#zone12a", "#zone12b", "#zone12c", "#zone14", "#zone15", "#zone16"]
        var data_zones3 = ["zone1", "zone2", "zone3", "zone5", "zone6", "zone7", "zone8", "zone9", "zone10", "zone11a", "zone11b", "zone11c"]
        var svg_zones3 = ["#zone1", "#zone2", "#zone3", "#zone5", "#zone6", "#zone7", "#zone8", "#zone9", "#zone10", "#zone11a", "#zone11b", "#zone11c"]
        var correct_zone = eval("data_zones" + floor);
        var correct_svg = eval("svg_zones" + floor);
        var default_var = eval("f" + floor + "lightsPower");
        var values = []

        for (var i = 0; i < correct_zone.length; i++) {
            values.push(default_var[correct_zone[i]][0]["val"]);
        };
          
        var minValue = Math.min.apply(null, values);
        var maxValue = Math.max.apply(null, values);
        var paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(['#edf8fb', '#005824']);

        for (var e = correct_svg.length - 1; e >= 0; e--) {
            d3.select(correct_svg[e]).style("fill", paletteScale(values[e])).style("opacity", 0.6);
        };
        drawlegendHVAC(paletteScale, floor);
    });
};

function inbetweenFunction(timestamp, floor) {
    updateMap(eval("f" + floor +$("#f" + floor + "-sensors").val()), timestamp);
}

function updateMap(chosen_var, timestamp, floor) {
    
    var data_zones1 = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone7", "zone8a", "zone8b"]
    var svg_zones1 = ["#zone1_4_", "#zone2", "#zone3_4_", "#zone4", "#zone5", "#zone7", "#zone8a", "#zone8b_4_"]
    var data_zones2 = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6", "zone7", "zone8", "zone9", "zone10", "zone11", "zone12a", "zone12b", "zone12c", "zone14", "zone15", "zone16"]
    var svg_zones2 = ["#zone1", "#zone2", "#zone3", "#zone4", "#zone5", "#zone6", "#zone7", "#zone8", "#zone9", "#zone10", "#zone11", "#zone12a", "#zone12b", "#zone12c", "#zone14", "#zone15", "#zone16"]
    var data_zones3 = ["zone1", "zone2", "zone3", "zone5", "zone6", "zone7", "zone8", "zone9", "zone10", "zone11a", "zone11b", "zone11c"]
    var svg_zones3 = ["#zone1", "#zone2", "#zone3", "#zone5", "#zone6", "#zone7", "#zone8", "#zone9", "#zone10", "#zone11a", "#zone112b", "#zone11c"]
    var correct_zone = eval("data_zones" + floor);
    var correct_svg = eval("svg_zones" + floor);
    var default_var = eval("f" + floor + "lightsPower");
    var values = []
    timestamp.setMilliseconds(0);
    timestamp.setSeconds(0);
    timestamp.setMinutes(0);

    for (var i = 0; i < correct_zone.length; i++) {
        for (var e = 0; e < chosen_var[correct_zone[i]].length; e++) {
            chosen_time = chosen_var[correct_zone[i]][e]["timestamp"];
            chosen_time.setMilliseconds(0);
            chosen_time.setSeconds(0);
            chosen_time.setMinutes(0);
            if (chosen_time.getTime() === timestamp.getTime()) {
                values.push(chosen_var[correct_zone[i]][e]["val"]);
            };
         };
    }; 

    var minValue = Math.min.apply(null, values);
    var maxValue = Math.max.apply(null, values);
    var paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(['#edf8fb', '#005824']);

    for (var e = correct_svg.length - 1; e >= 0; e--) {
        d3.select(correct_svg[e]).style("fill", paletteScale(values[e])).style("opacity", 0.6);
    };

    d3.select("#Layer_" + floor).select(".legendLinear" + floor).remove();

    drawlegendHVAC(paletteScale, floor);
}

function placePerson(data, timestamp, floor) {
    //canvas info
    var floor_width = parseInt(d3.select("#canvas_1_" + floor).attr("width"));
    var floor_height = parseInt(d3.select("#canvas_1_" + floor).attr("height"));
    var floor_x = parseInt(d3.select("#canvas_1_" + floor).attr("x"));                     
    var floor_y = parseInt(d3.select("#canvas_1_" + floor).attr("y"));
    var floor_max_x = 189;
    var floor_max_y = 111; 

    removePersons(floor);
    timestamp.setMilliseconds(0);
    timestamp.setSeconds(0);
    timestamp.setMinutes(0);
    for (var i = data.length - 1; i >= 0; i--) {
        data_timestamp = new Date(data[i]["timestamp"]);
        data_timestamp.setMilliseconds(0);
        data_timestamp.setSeconds(0);
        data_timestamp.setMinutes(0);
        if (data_timestamp.getTime() === timestamp.getTime()) {
            person_x = parseInt(data[i]["x"]);
            person_y = parseInt(data[i]["y"]);
            person_canvas_loc_x = floor_x + ((floor_width / floor_max_x) * person_x);
            person_canvas_loc_y = (floor_y + floor_height) - ((floor_height / floor_max_y) * person_y);
            d3.select("#Layer_" + floor).append("circle")
                .attr("class", "person" + floor)
                .attr("cx", person_canvas_loc_x)
                .attr("cy", person_canvas_loc_y)
                .attr("r", 5)
                .style("fill", "purple")
        };
    };
}

function removePersons(floor) {
    d3.select("#Layer_" + floor).selectAll(".person" + floor).remove();
}

function dataMaker(floor, callback) {
// load in data
d3.csv("json_csv/proxOut-MC2.csv", function(error, csv) {
    if (error) {
        throw error;
        return alert("Error loading data!");
    }

    // format for parsing date data
    var formatDate_2 = d3.time.format("%Y-%m-%d %X");

    var floor_1 = {};
    var floor_2 = {};
    var floor_3 = {};

    var zones_floor_1 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7", "zone_8"];
    var zones_floor_2 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7"];
    var zones_floor_3 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_ServerRoom"];

    var floors = [floor_1, floor_2, floor_3];
    var zones = [zones_floor_1, zones_floor_2, zones_floor_3];

    for (i = 0; i < floors.length; i++) {

        csv.forEach(function(d){

            var date = formatDate_2.parse(d.timestamp);
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            
            if(i + 1 == d.floor) {
                if (!floors[i].hasOwnProperty(date)) {
                    floors[i][date] = {};
                };

                for (j = 0; j < zones[i].length; j++) {
                    if (!floors[i][date].hasOwnProperty(zones[i][j])) {
                        floors[i][date][zones[i][j]] = [];
                    };

                    if (j + 1 == d.zone) {
                        floors[i][date][zones[i][j]].push(d)
                    }
                    else if ("ServerRoom" == d.zone) {
                        floors[i][date]["zone_ServerRoom"].push(d)
                    };
                };
            };
        });
    };
    var data = {floor_1: floor_1, floor_2: floor_2, floor_3: floor_3};
    callback(data, floor);
    });
};

function heat_prox(date, floor) {
    dataMaker(function(data){
        console.log(floor);
        var zones_floor_1 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7", "zone_8"];
        var zones_floor_2 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_7"];
        var zones_floor_3 = ["zone_1", "zone_2", "zone_3", "zone_4", "zone_5", "zone_6", "zone_ServerRoom"];
        var svg_floor_1 = ["#zone2_1_", "#zone3", "#zone4_2_", "#zone5_1_", "#zone6", "#zone7_1_", "#zone8"];
        var svg_floor_2 = ["#zone1_1_", "#zone2_1_", "#zone3_1_", "#zone4_3_", "#zone5_1_", "#zone6_1_", "#zone7_1_"];
        var svg_floor_3 = ["#zone1_1_", "#zone2_1_", "#zone3_1_", "#zone4_1_", "#zone5_1_", "#zone6_1_", "#zone_ServerRoom"]; 
        var correct_zone = eval("zones_floor_" + floor);
        var correct_svg = eval("svg_floor_" + floor);    
        var floor = "floor_" + floor;
        var values = []

        try {
            for (var i = 0; i < correct_zone.length; i++) { 
                values.push(data[floor][date][correct_zone[i]].length);      
            };
        }

        catch(err) {
            for (var e = correct_svg.length - 1; e >= 0; e--) {
                d3.select(correct_svg[e]).style("fill", "none").style("opacity", 0.6);
            };
        }

        var minValue = Math.min.apply(null, values);
        var maxValue = Math.max.apply(null, values);
        var paletteScale = d3.scale.linear()
           .domain([minValue, maxValue])
           .range(['#edf8fb', '#005824']);

        drawLegendprox(paletteScale, floor);

        for (var e = correct_svg.length - 1; e >= 0; e--) {
            d3.select(correct_svg[e]).style("fill", paletteScale(values[e])).style("opacity", 0.6);
        };

    });
};    

function proxmobile(floor) {
    d3.csv("json_csv/proxMobileOut-MC2.csv", function(error, data) {
        if (error) throw error;
        
        var mobileProxFloorData = {
            " 1": [],
            " 2": [],
            " 3": []
        }

        for (var i = 0; i < data.length; i++) {
            mobileProxFloorData[data[i].floor].push(data[i]);
        };

        correct_floor_data = mobileProxFloorData[" " + floor];
        canvas = d3.select("svg").attr("display", "block");

        //timestamp info
        var startdate = new Date(correct_floor_data[0]["timestamp"]);
        var length = parseInt(correct_floor_data.length - 1);
        var enddate = new Date(correct_floor_data[length]["timestamp"]);
        var current_date = startdate;
        formatDate = d3.time.format("%b %d");
        heat_prox(correct_floor_data, floor);

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var margin = {top: 5, right: 50, bottom: 5, left: 50};
        var width = 960 - margin.left - margin.right;
        var height = 50 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, 24])
            .rangeRound([0, width])
            .clamp(true);

        var brush = d3.svg.brush()
            .x(x)
            .on("brush", brushed)
            .on("brushend", brushend(floor));

        var svg = d3.select("#slider-div" + floor).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis" + floor)
            .attr("transform", "translate(0," + height / 2 + ")")
            .call(d3.svg.axis().scale(x).orient("bottom").ticks(6))
            .select(".domain")
            .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
                .attr("class", "halo" + floor);

        var slider = svg.append("g")
            .attr("class", "slider" + floor)
            .call(brush);

        slider.selectAll(".extent,.resize")
            .remove();

        slider.select(".background")
            .attr("height", height);

        var handle = slider.append("circle")
            .attr("class", "handle")
            .attr("transform", "translate(0," + height / 2 + ")")
            .attr("r", 9);

        setTimeout(function() {
            d3.select("#slider-value" + floor).text(new Date(brush.extent()[0]));
        }, 1100);

        function brushed() {
            var value = brush.extent()[0];

            if (d3.event.sourceEvent) {
                value = x.invert(d3.mouse(this)[0]);
                brush.extent([value, value]);
            }

            handle.attr("cx", x(value));
        }

        function brushend() {
            value = Math.floor(x.invert(d3.mouse(this)[0]));
            console.log(value)
            var day_dropdown = $('#day_dropdown' + floor).val();
            var value = new Date(day_dropdown + " " + value + ":00:00");
            d3.select("#slider-value" + floor).text(value);
            placePerson(correct_floor_data, value, floor);
            console.log(value);
            inbetweenFunction(value, floor);
            heat_prox(value, floor);
        }
    });
};