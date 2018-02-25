var planIcons = {
    plane: "airplanemode_active"
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var itinerary = JSON.parse(this.responseText);

        console.log($(".day"));

        if( $(".day").length) {
            console.log("es un dia");
            var day = itinerary[$(".day").attr('id')];

            $('.main-header .title').text(day['day-name']);
            $('.main-header .sub-title').text(day['place']);

            $.each( day['plan'] , function( index, plan ) {
                var planHtml = '<div class="plan type-'+ plan.type +'">' +
                    '<span class="plan-icon">' +
                        '<i class="material-icons">' + planIcons[plan.type] + '</i>' +
                    '</span>' +
                '</div>';

                $(".plan-list").append( planHtml );
            });
            
        }
    }
};
xmlhttp.open("GET", "https://ealexander89.github.io/japon2018/itinerary.json", true);
xmlhttp.send();