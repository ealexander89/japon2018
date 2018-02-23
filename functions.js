var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        console.log(myObj);
        
    }
};
xmlhttp.open("GET", "https://ealexander89.github.io/japon2018/itinerary.json", true);
xmlhttp.send();