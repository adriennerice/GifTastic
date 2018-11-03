var cartoons = ["Adventure Time", "Archer", "Futurama", "X-Men", "Dragon Ball"];

function displayCartoonInfo(){
    $("#cartoon-view").empty();

    var cartoon = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=oRrzUVJuSNpp7zOSUYJQ0dihn858LVw8&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++){
            var cartoonDiv=$("<div>");

            cartoonDiv.addClass("card");
            
            var p = $("<span>").text("Rating: " + results[i].rating);

            var cartoonImage = $("<img>");

            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("still_src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("animated_src", results[i].images.fixed_height.url);

            cartoonImage.addClass("card-img-top");
            p.addClass("card-text");

            cartoonImage.addClass("gif");
            cartoonImage.attr("data-state", "still");
            
            cartoonDiv.append(cartoonImage);
            cartoonDiv.append(p);

            $("#cartoon-view").prepend(cartoonDiv);
        }
    });
};

function renderButtons(){
  $("#buttons-view").empty();
  
  for (var i=0; i < cartoons.length; i++){
      var a = $("<button>" + " ");

      a.addClass("cartoon-btn");
      a.addClass("btn btn-info");

      a.attr("data-name", cartoons[i]);

      a.text(cartoons[i]);

      $("#buttons-view").append(a);
  }
};

function stillToanimate(){
    var imageState = $(this).attr("data-state");

    if(imageState === "still"){
        $(this).attr("src", $(this).attr("animated_src"));
        $(this).attr("data-state", "animate");
        
    } else {
        $(this).attr("src", $(this).attr("still_src"));
        $(this).attr("dta-state", "still");
        
    }
};




$("#add-cartoon").on("click", function(){
    event.preventDefault();

    var cartoon=$("#cartoon-input").val().trim();
     
    cartoons.push(cartoon);
    
    renderButtons();
});

$(document).on("click", ".cartoon-btn", displayCartoonInfo);
$(document).on("click", ".gif", stillToanimate);

renderButtons();