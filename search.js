
//search data method to search properties creating variables
$("#search").on("click",function(){
    var type = $("#type").val();
    var locationArea = $("#location").val();
    var addedDate = $("#dateadded").val();
    var minimumPrice = $("#budget-range").slider("option", "values")[0];
    var maximumPrice = $("#budget-range").slider("option", "values")[1];
    var minimumBedRooms = $("#bedroom-range").slider("option", "values")[0];
    var maximumBedRooms =  $("#bedroom-range").slider("option", "values")[1];



    //taking output
    var output="<ul>";
    for(var i in data.properties){
      if((type == data.properties[i].type) || (type == "AnyType"))
      //if ((addedDate == data.properties[i].added) || (addeddate == "AnyDate"))
      if((locationArea == data.properties[i].location) || (locationArea == "AnyLocation"))
      if (( data.properties[i].price >= minimumPrice) && (data.properties[i].price <= maximumPrice ))
      if((data.properties[i].bedrooms >= minimumBedRooms) && (data.properties[i].bedrooms <= maximumBedRooms))
        {
          {
            {
                {
                  {
                
                  output += "<section class='result'><h2><li>" + data.properties[i].type  +"</h2>"+
                  "<h2>£" +  data.properties[i].price  +  "</li></h2>" + 
                  "<img class='outputimage' src=" + data.properties[i].picture + ">" +
                  "<section class='paracontainer'><p>" + data.properties[i].description + "</p>" + 
                  "<p>"+"Location"+"</p>"+"<h4>" + data.properties[i].location + "</h4>" +
                  "<button><a href='" + data.properties[i].url + "'>Visit Page</a></button></section></section>";
      } } } } }
    
    }
    output += "</ul>";
    document.getElementById("results-holder").innerHTML = output;

  });


  //add properties to the favourite list
  $("#add-fav").on("click",function(){
    try {
      $(this).attr('disabled', true);

      var addPropId = $(this).closest("p").attr("id");
      var favouriteProp=JSON.parse(localStorage.getItem("favProperties"));
          if(favouriteProp == null) {
            favouriteProp = [];
      }
      if(favouriteProp != null) {
        for ( var j = 0; j < favouriteProp.length; j++) {

            if ( addPropId == favouriteProp[j]) {
                alert("This item is already added.");
                favouriteProp = [];
              }
          }
      }
      favouriteProp.push(addPropId);
      localStorage.setItem("favProperties", JSON.stringify(favouriteProp));

    }
    catch(e){
      if (e==QUOTA_EXCEEDED_ERR) {
        console.log("Error: Local limit exceeded.");
      }

      else {
        console.log("Error: Saving to local storage.");
      }
    }

  });

  //remove properties from the favourite list
  $("#remove-fav").on("click",function(){
    $(this).attr('disabled', true);

            var removePropId = $(this).closest("p").attr("id");

            favouriteProp=JSON.parse(localStorage.getItem("favProperties"));

            if(favouriteProp != null) {
              for ( var j = 0; j < favouriteProp.length; j++) {

                  if ( removePropId == favouriteProp[j]) {

                      alert("This item removed.");

                      delete favouriteProp[j];

                      localStorage.setItem("favProperties", JSON.stringify(favouriteProp));

                      favouriteProp[j] = [];
                    }
                }
            }

            if(favouriteProp == null) {
              alert("You don't have any favorites.");
            }
  });

  //view the favourite list
  $( "#favourites" ).on("click", function(){

    console.log("Data restoring from storage");

    favouriteProp=JSON.parse(localStorage.getItem("favProperties"));

    var output = "<ul>";

    if (favouriteProp != null) {

        for (var i = 0; i < data.properties.length; i++) {
            for (j = 0; j < favouriteProp.length; j++) {

                if (data.properties[i].id == favouriteProp[j]) {

                    output+="<h4><li>" + data.properties[i].type +"<br>"+ "</li></h4>"+ "<h5><li>"+ "£ "+ data.properties[i].price + "<br><br>" + data.properties[i].location + "</h5></li>" +
                    "<img src=" + data.properties[i].picture + " width = 300 height = 150>" +"<li><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
                }
            }
        }
    }
    output+="</ul>";

    document.getElementById( "favourites-holder" ).innerHTML = output;

});
//clear the favourite list
$( "#clear-favourites" ).on("click", function(){

  $("#favourites-holder").remove();

  favouriteProp=JSON.parse(localStorage.getItem("favProperties"));

  localStorage.clear();

});

