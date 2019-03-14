$(".nav-item").hover(function(){
	$(this).fadeOut(100).fadeIn()	
},
function(){
	$(this).css("border-bottom", "none");
});

$(".list-group-item:last-child").hover(function(){
	$(this).css("background-color", "#343a40");	
},
function(){
	$(this).css("background-color", "#fff");
});

// $(".list-group-item:last-child").on("click", function(){
// 	$(this).css("background-color", "#757575");	
// });





function initMap() {
  // The location of Uluru
  var yaba = {lat: 6.524137074429328, lng: 3.3812570571899414};
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: yaba});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: yaba, map: map});
}

