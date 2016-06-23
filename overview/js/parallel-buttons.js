/*
buttons.js

Wessel de Jong
10206620

Programmeerproject
Prox data 
*/


dataMaker(function(data){

    // draw graphs
    proxGrapher(data['general'], "general");
    proxGrapher(data['floor_1'], "svg_1"); 
    proxGrapher(data['floor_2'], "svg_2");
    proxGrapher(data['floor_3'], "svg_3");
    
    // button functionality for skowing proximity data of all floors
    document.getElementById("button_general").onclick = function(){
        
        for (i = 0; i < document.getElementsByClassName("svg").length; i++){
            document.getElementsByClassName("svg")[i].style.display = "none"
        };

        document.getElementById("general").style.display = "block"

        for (i = 0; i < document.getElementsByClassName("checkboxes").length; i++){
            document.getElementsByClassName("checkboxes")[i].style.display = "none"
        };

        document.getElementById("general-checkboxes").style.display = "block"
    };

    // button functionality for skowing proximity data of floor 1
    document.getElementById("button_1").onclick = function(){
        
        for (i = 0; i < document.getElementsByClassName("svg").length; i++){
            document.getElementsByClassName("svg")[i].style.display = "none"
        };

        document.getElementById("svg_1").style.display = "block"

        for (i = 0; i < document.getElementsByClassName("checkboxes").length; i++){
            document.getElementsByClassName("checkboxes")[i].style.display = "none"
        };

        document.getElementById("f1-checkboxes").style.display = "block" 
    };

    // button functionality for skowing proximity data of floor 1
    document.getElementById("button_2").onclick = function(){
        
        for (i = 0; i < document.getElementsByClassName("svg").length; i++){
            document.getElementsByClassName("svg")[i].style.display = "none"
        };

        document.getElementById("svg_2").style.display = "block" 

        for (i = 0; i < document.getElementsByClassName("checkboxes").length; i++){
            document.getElementsByClassName("checkboxes")[i].style.display = "none"
        };

        document.getElementById("f2-checkboxes").style.display = "block" 
    };

    // button functionality for skowing proximity data of floor 1
    document.getElementById("button_3").onclick = function(){
     
        for (i = 0; i < document.getElementsByClassName("svg").length; i++){
            document.getElementsByClassName("svg")[i].style.display = "none"
        };

        document.getElementById("svg_3").style.display = "block" 

        for (i = 0; i < document.getElementsByClassName("checkboxes").length; i++){
            document.getElementsByClassName("checkboxes")[i].style.display = "none"
        };

        document.getElementById("f3-checkboxes").style.display = "block" 
    };


    for (i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
        document.getElementById(document.getElementsByClassName("checkbox")[i].id).onchange = function(){
            $("#" + this.value).toggle();
            $("#" + this.name).toggle();
        };
    };
});







