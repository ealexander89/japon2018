$( document ).ready(function() {
    $.getJSON("./itinerary.json", function( data ) {
        var items = [];
        console.log(data);
    });
});