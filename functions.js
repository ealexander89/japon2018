

var planIcons = {
    plane: "airplanemode_active",
    place: "place",
    transition: "train",
    food: "restaurant",
    walk: "directions-walk",
    house: "home"
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var itinerary = JSON.parse(this.responseText);

        console.log($(".day"));

        if( $(".day").length) {
            console.log("es un dia");
            var day = itinerary[$(".day").attr('id')];
            var time = moment(day.date, "YYYY-MM-DD hh:mm A");

            $('.main-header .title').text(day.title);
            $('.main-header .sub-title').text(day.place);

            var planTime = time.format("hh:mm A");
            var planDuration;
            var priceTransport = 0;
            var priceFood = 0;
            var priceTickets = 0;
            var priceOthers = 0;
            var priceTotal = 0;

            $.each( day.plan , function( index, plan ) {
                planDuration = moment(plan.duration, 'hh:mm');

                var planHtml = '<div class="plan type-'+ plan.type +'">' +
                // PLAN ICON
                    '<span class="plan-icon">' +
                        '<i class="material-icons">' + planIcons[plan.type] + '</i>' +
                    '</span>' + 
                // PLAN TIME
                    '<p class="plan-time">' + planTime + '</p>' +
                // PLAN TITLE
                    '<h3 class="plan-title">' +
                        '<a href="' + plan.map + '">' + plan.title + '</a>' +
                    '</h3>' +
                // PLAN DATA - DURATION
                    '<p class="plan-data">' +
                        '<span class="plan-data-item">' +
                            '<i class="material-icons">timer</i>' +
                            planDuration.format('HH:mm') +
                        '</span>';
                // PLAN DATA - DISTANCE
                if( plan.distance ) {
                    planHtml += '<span class="plan-data-item">' +
                        '<i class="material-icons">directions_walk</i>' +
                            plan.distance +
                        '</span>';
                }

                // PLAN DATA - PRICES
                if( plan.price ) {   
                    if( plan.price.transport ) {
                        priceTransport += plan.price.transport;

                        planHtml += '<span class="plan-data-item">' +
                            '<i class="material-icons">train</i>' +
                            '¥' + plan.price.transport +
                        '</span>';
                    }

                    if( plan.price.food ) {
                        priceFood += plan.price.food;

                        planHtml += '<span class="plan-data-item">' +
                            '<i class="material-icons">restaurant</i>' +
                            '¥' + plan.price.food +
                        '</span>';
                    }

                    if( plan.price.tickets ) {
                        priceTickets += plan.price.tickets;

                        planHtml += '<span class="plan-data-item">' +
                            '<i class="material-icons">confirmation_number</i>' +
                            '¥' + plan.price.tickets +
                        '</span>';
                    }

                    if( plan.price.others ) {
                        priceOthers += plan.price.others;

                        planHtml += '<span class="plan-data-item">' +
                            '<i class="material-icons">style</i>' +
                            '¥' + plan.price.others +
                        '</span>';
                    }
                }
                        
                planHtml += '</p>';


                // PLAN IMAGE
                if( plan.image ) {
                    planHtml += '<figure>' +
                        '<img src="'+ plan.image +'">' +
                    '</figure>';
                }

                // PLAN INFO
                if( plan.info ) {
                    planHtml += '<ul class="plan-info">';
                    $.each( plan.info , function( info_index, info ) {
                        planHtml += '<li>';
                        if( info.url ) {
                            planHtml += '<a href="'+ info.url +'">'+ info.text +'</a>';
                        } else {
                            planHtml += info.text;
                        }
                        planHtml += '</li>';
                    });
                    planHtml += '</ul>';
                }

                // CLOSING PLAN
                planHtml += '</div>';

                $(".plan-list").append( planHtml );

                // ADD TIME
                var durationInMinutes = planDuration.hours() * 60 + planDuration.minutes()
                time.add(durationInMinutes, 'minutes');
                planTime = time.format("hh:mm A");
            });
            
        }
    }
};
xmlhttp.open("GET", "https://ealexander89.github.io/japon2018/itinerary.json", true);
xmlhttp.send();