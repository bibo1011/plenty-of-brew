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
                var name = JSON.stringify(response[i].name);
                var list = $("ul").append("<li>" + name + "</li>");
                
            }
        })
        
        
    
    });
});   
       
    
    
// search on click

        
//     })
// }
    // fetch(https://api.openbrewerydb.org/breweries?by_city=san_diego).
// }

// 
// submitBtn.addEventListener("click", formSubmit);