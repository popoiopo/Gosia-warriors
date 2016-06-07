d3.select("#f2-vis-info").text($("#f2-dropdown :selected").text());

$("#f2-dropdown").change(changeF2Header);

function changeF2Header() {
    d3.select("#f2-vis-info").text($("#f2-dropdown :selected").text());
    // updateF2Chart(eval($("#f2-sensors").val()));
    console.log(eval($("#f2-sensors").val()));
}
