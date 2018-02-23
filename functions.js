var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var itinerary = JSON.parse(this.responseText);

        if( $(".day") > 0) {
            console.log("es un dia");
            var day = itinerary[$(".day").attr('id')];

            console.log(day);
            
        }
    }
};
xmlhttp.open("GET", "https://ealexander89.github.io/japon2018/itinerary.json", true);
xmlhttp.send();