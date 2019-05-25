$(".scrape").on("click", function(event) {
    event.preventDefault();
    $.ajax({
        url: "/scrape",
        method: "GET"
    }).then(function(res) {
        alert("Scrape complete!");
        console.log(res);
    }).catch(function(err) {
        console.log(err);
    });
});

$(".home").on("click", function(event) {
  event.preventDefault();
  $.ajax({
      url: "/",
      method: "GET"
  }).then(function(res) {
      console.log(res);
  }).catch(function(err) {
      console.log(err);
  });
});

$(".seeArts").on("click", function(event) {
    event.preventDefault();
    alert("hi");
    $.ajax({
        url: "/articles",
        method: "GET"
    }).then(function(res) {
        console.log(res);
    }).catch(function(err) {
        console.log(err);
    });
});

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
      });
  
    $("#bodyinput").val("");
  });
  