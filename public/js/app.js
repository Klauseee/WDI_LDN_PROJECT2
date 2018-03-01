/* global google */
function initMap() {
  var underdog = {lat: 51.502502, lng: -0.081629};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: underdog
  });
  var marker = new google.maps.Marker({
    position: underdog,
    map: map
  });
}




$(() => {
  console.log('running');

  // $('.carousel').slick({
  //   dots: true,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   adaptiveHeight: true
  // });


  $('form').validate();
  if($('#map'))initMap();


});



// $('.carousel').slick({
//   dots: true,
//   infinite: true,
//   speed: 500,
//   fade: true,
//   cssEase: 'linear',
//   adaptiveHeight: true
// });
