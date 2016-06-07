d3.select("#f3-vis-info").text($("#f3-dropdown :selected").text());

$("#f3-dropdown").change(changeF3Header);

function changeF3Header() {
    d3.select("#f3-vis-info").text($("#f3-dropdown :selected").text());
    // updateF3Chart(eval($("#f3-sensors").val()));
    console.log($("#f3-sensors"));
    // console.log(eval($("#f3-sensors").val()));
}
