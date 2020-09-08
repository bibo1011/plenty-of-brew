$(document).ready(function(){
    
    // search on enter key
    var input = document.getElementById("city");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("beerBtn").click();
        }
    });
    $('#beerBtn').bind('click', function() {
        // alert('User clicked on "foo."');
        var searchCity = document.querySelector("#city").value;
        if (searchCity === '') { 
            alert("enter city");
            cleaInputs();
            
        }
        
        fetch('https://api.openbrewerydb.org/breweries?by_city=' + searchCity)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(response){
            var i;
            for (i = 0; i < response.length; i++){
                console.log(response[i]);
                var name = JSON.stringify(response[i].name).replace(/"/g, '');
                var street = JSON.stringify(response[i].street).replace(/"/g, '');
                var phone = JSON.stringify(response[i].phone).replace(/"/g, '');
                var type = JSON.stringify(response[i].brewery_type).replace(/"/g, '');
                var url = JSON.stringify(response[i].website_url).replace(/"/g, '');
                var list = $("ul").append("<li style='list-style-type:none'><span style='font-weight:bold'>" + name);
                $("ul").append("<p> Address: " + street + "<br> Phone: " + phone + "<br> Type: " + type + "<br> Link: " + "<a target='_blank' href=>" + url);

                
                
            }
        })

        
        
    
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
       
    
    
// search on click

        
//     })
// }
    // fetch(https://api.openbrewerydb.org/breweries?by_city=san_diego).
// }

// 
// submitBtn.addEventListener("click", formSubmit);