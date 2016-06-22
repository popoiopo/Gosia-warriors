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

        for (var i = 0; i < mobileProxFloorData.length; i++) {
            correct_floor_data = mobileProxFloorData[" " + i];

            canvas = d3.select("svg").attr("display", "block");

            //timestamp info
            var startdate = new Date(correct_floor_data[0]["timestamp"]);
            var length = parseInt(correct_floor_data.length - 1);
            var enddate = new Date(correct_floor_data[length]["timestamp"]);
            var current_date = startdate;
            formatDate = d3.time.format("%b %d");
            heat_prox(correct_floor_data);

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
                .on("brushend", brushend);

            var svg = d3.select("#slider-div" + floor).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height / 2 + ")")
                .call(d3.svg.axis().scale(x).orient("bottom").ticks(6))
                .select(".domain")
                .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
                    .attr("class", "halo");

            var slider = svg.append("g")
                .attr("class", "slider")
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
                value = Math.floor(x.invert(d3.mouse(this)[0]))
                var day_dropdown = $('#day_dropdown' + floor).val();
                var value = new Date(day_dropdown + " " + value + ":00:00");
                d3.select("#slider-value" + floor).text(value);
                placePerson(correct_floor_data, value);
                inbetweenFunction(value);
                heat_prox(value);
            }
        };
    });
};