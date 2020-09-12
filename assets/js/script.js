$(document).ready(function(){
    
    // search on enter key
    var input = document.getElementById("city");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("beerBtn").click();
        }
    });
    function clearResults(){
        $("ul").children().remove();
        $("#street").children().remove();
    }
    // search on click
    $('#beerBtn').on('click', function() {
        // alert('User clicked on "foo."');
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
                    var address = add.replace( / /g, '+')
                    console.log(address)
                    $("h5").text("Breweries around " + city);
                    $("ul#list-brew").append("<h4 style='list-style-type:none'><span style='font-weight:bold'>" + "<p style='color:red'>" + name);
                    $("ul#list-brew").append("<p> Address: " + "<a target='_blank' href=" + google + address + "'>" + street + "</a>" + "<br> State: " + state + "<br> Phone: " + phone + "<br> Type: " + type);
                    $("ul#list-brew").append("<p> Link: <a target='_blank' href=" + url + ">" + url);
                    // $("a").text(website.href)
                    // console.log("latitude", latitude);
                    // console.log("longitude", longitude);
                    
                    // google street view api
                    fetch('https://maps.googleapis.com/maps/api/streetview?location=' + latitude + ',' + longitude + '&size=300x180&key=AIzaSyCuMB4iJK-fR7r2pWaVP-Up7DVSgLId8sA')
                    .then(function(response){
                        console.log(response.url);
                    
                        var img = document.createElement("img");
                        img.src = response.url;
                        var src = document.getElementById("street-view");
                        src.append(img);
                    })    
                    // google map api
                    fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.google.com/maps/search/?api=1&query=' + address)
                    .then(function(response){
                            
                        // console.log(response.url); 
                        
                        map = response.url;
                        var mapUrl = map.replace('https://cors-anywhere.herokuapp.com/', '');
                        $("ul#street-view").append("<p> <a target='_blank' href=" + mapUrl + ">" + "Click to get directions")
                        // console.log(mapUrl);
                        

                    })
                    
                    
                    
                        
                                
                }
            })
        }
        clearResults()

    });
});  



// //set the marquee parameters
// function init() { 
//     rtl_marquee.start();
//     document.getElementById("sports-news");

// }
// var rtl_marquee_Text = 'JavaScript scrolling text';
// var rtl_marquee_Direction = 'left';
// var rtl_marquee_Contents='<span style="font-family:aria;font-size:20pt;white-space:nowrap;">' + rtl_marquee_Text + '</span>';
// rtl_marquee = new xbMarquee('rtl_marquee', '40px', '95%', 6, 80, rtl_marquee_Direction, 'scroll', rtl_marquee_Contents);
// window.setTimeout( init, 200); 
       