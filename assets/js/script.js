$(document).ready(function(){
    
    // search on enter key
    var input = document.getElementById("city");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("beerBtn").click();
        }
    });

    // clear search results
    function clearResults(){
        $("ul").children().remove();
        $("#street").children().remove();
    }



    // search on click
    $('#beerBtn').on('click', function() {
        var searchCity = document.querySelector("#city").value;
        
        if (searchCity === '') { 
            $("h5").text("no results found");
        } else {

            // open brewery api
            fetch('https://api.openbrewerydb.org/breweries?by_city=' + searchCity)
            .then(function(response){
                console.log(response);
                return response.json();
            })
            .then(function(response){
                localStorage.setItem("city", JSON.stringify(searchCity))
                var i;
                for (i = 0; i < response.length; i++){
                    console.log(response[i]);
                    var city = JSON.stringify(response[i].city).replace(/"/g, '');
                    var state = JSON.stringify(response[i].state).replace(/"/g, '');
                    var name = JSON.stringify(response[i].name).replace(/"/g, '');
                    var street = JSON.stringify(response[i].street).replace(/"/g, '');
                    var phone = JSON.stringify(response[i].phone).replace(/"/g, '');
                    var type = JSON.stringify(response[i].brewery_type).replace(/"/g, '');
                    var url = JSON.stringify(response[i].website_url).replace(/"/g, '');
                    var latitude = JSON.stringify(response[i].latitude).replace(/"/g, '');
                    var longitude = JSON.stringify(response[i].longitude).replace(/"/g, '');
                    var google = "https://www.google.com/maps/place/"
                    var add = street + city + state
                    var address = add.replace( / /g, '+');
                    console.log(address);
                    $("h5").text("Breweries around " + city);
                    $("ul#list-brew").append("<h4 style='list-style-type:none'><span style='font-weight:bold'>" + "<p style='color:red'>" + name);
                    $("ul#list-brew").append("<p> Address: " + "<a target='_blank' href=" + google + address + "'>" + street + "</a>" + "<br> State: " + state + "<br> Phone: " + phone + "<br> Type: " + type);
                    $("ul#list-brew").append("<p> Link: <a target='_blank' href=" + url + ">" + url);
                    // console.log("latitude", latitude);
                    // console.log("longitude", longitude);
                    
                    // google street view api
                    fetch('https://maps.googleapis.com/maps/api/streetview?location=' + address + '&size=300x180&key=AIzaSyCuMB4iJK-fR7r2pWaVP-Up7DVSgLId8sA')
                    .then(function(response){
                        console.log(response.url);                    
                        var img = document.createElement("img");
                        img.src = response.url
                        var src = document.getElementById("street-view");
                        src.append(img);
                    })   

                    // google map api
                    // fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.google.com/maps/search/?api=1&query=' + street)
                    // .then(function(response){
                    //     map = response.url;
                    //     var mapUrl = map.replace('https://cors-anywhere.herokuapp.com/', '');
                    //     $("#location").append("<p><a target='_blank' href=" + mapUrl + ">" + "Click here to get directions")
                    //     console.log(mapUrl);
                        

                    // })
                                    
                }
            })
        }
        clearResults()

    });
    
    
});  
       