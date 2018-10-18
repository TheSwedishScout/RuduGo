/*screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait")) {
  // orientation was locked
} else {
  // orientation lock failed
}*/
      var map; //skapa en variable att spara kartan i, skaar den utanför då den behövs i flera olika funktioner
      var draws = 0; //en variabel som sparar värdet på hur många gånger som positionen hämtats
      var myCirkel;  // en variabel att spara den utritade positionen för att nolla den gamla innan en ny skapas
      var wpid;
      var intressePungter = [
        
        {
          name: "Hevet",
          center: {lat: 58.439207, lng: 11.293511},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9590-2.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },
        {
          name: "Åkern",
          center: {lat: 58.439606, lng: 11.293551},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9581.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Åker kant",
          center: {lat: 58.439335, lng: 11.292460},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9585.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Vit bloma",
          center: {lat: 58.438803, lng: 11.291934},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9591.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Buket",
          center: {lat: 58.438313, lng: 11.291797},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9594.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Rudu väg",
          center: {lat: 58.438039, lng: 11.292822},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9600.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "fjäran",
          center: {lat: 58.438163, lng: 11.293877},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9626.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Dopet",
          center: {lat: 58.438525, lng: 11.294497},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9632.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Badet",
          center: {lat: 58.438532, lng: 11.295354},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9637.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Åkerlapp",
          center: {lat: 58.438941, lng: 11.294783},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9666.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },{
          name: "Blommor",
          center: {lat: 58.439667, lng: 11.294944},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          bild: "IMG_9710.jpg",
          isActive: false,
          game: function (id){showImage(id, this.bild, this.name)}
        },
        {
          name: "hemma",
          center: {lat: 57.707384, lng: 12.947271},
          //57.780455, 14.172033
          storlek: 10,
          played: 0,
          isActive: false,
          bild: "IMG_7649.jpg",
          game: function (id){showImage(id, this.bild, this.name)}
        }
      ];
function distans(myPos, toPos){
  /*
  code to calculate the distance betwene 2 gps cordinates is fetched from
  http://www.movable-type.co.uk/scripts/latlong.html 
  and simplified to make me figure out whats hapening
  */
  lng1 = myPos.lng;
  lat1 = myPos.lat;
  lng2 = toPos.lng;
  lat2 = toPos.lat;
  var R = 6371e3; // metres around the equator
  var latitude1 = lat1*(Math.PI / 180); // get latitude in radians
  var latitude2 = lat2*(Math.PI / 180);
  var deltaLatitude = (lat2-lat1)*(Math.PI / 180); 
  var deltaLongitude  = (lng2-lng1)*(Math.PI / 180);

  var a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(deltaLongitude /2) * Math.sin(deltaLongitude /2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
function drawLocation(position){ // draw your location o the map and runs the distans calculations
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  map.setCenter(pos); //centrerar kartan för positionen

  if (draws > 0) {
    myCirkel.setMap(null); // döljer din gamla position
  }
  myCirkel = new google.maps.Circle({
    strokeColor: '#1FD02A',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1FD02A',
    fillOpacity: 0.35,
    map: map,
    center: pos,
    radius: 10
  });

  var maxDistansToEvent = 10; 
  //var box = document.getElementById("box");
  let foundlocation = false
  for (var i = 0; i <intressePungter.length; i ++ ) {
      console.log(distans(pos, intressePungter[i].center))
      if(distans(pos, intressePungter[i].center) < maxDistansToEvent ){
        foundlocation = true
        //box.style.background = "#F00"
        //box.innerText = intressePungter[i].name;
        //navigator.geolocation.clearWatch(wpid);
        if(!intressePungter[i].isActive){
          intressePungter[i].isActive = true
          intressePungter[i].game(i);
        }
        
      }

      //console.log(intressePungter[i].name + " " + distans(pos, intressePungter[i].center));
      //box.innerText = intressePungter[2].name + " " + distans(pos, intressePungter[2].center);
  } 
  if(foundlocation == false){
    gameClear()
    for (var i = 0; i <intressePungter.length; i ++ ) {
      intressePungter[i].isActive = false
    }
  }
  
  //console.log(draws);

draws++ // ökar antalet draws som har gjorts
}
function geo_error(error){ // ger medelanden vid errors
  /*
  1 = blocked
  2 = unavalebale
  3 = timeout
  */
  if (error.code === 1) {
    alert('unable to get location')
  }
  if (error.code === 3) {
    alert('Timeout');
  }
}
function myLocation(){ // whit sucsessfully got location
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    var geo_options = {
      enableHighAccuracy: true, //true 
      maximumAge        : 30000
    };
    // get position whit parameters above
    wpid=navigator.geolocation.watchPosition(drawLocation,geo_error,geo_options);
      
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function init() {
  document.addEventListener("DOMContentLoaded", initMap)
}

function initMap() {
  // Create the map.
  navigator.geolocation.getCurrentPosition(startLocation,geo_error ,{
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 2700000
  });
  function startLocation(position) {
    
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var zoom = 18;

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: pos, // din start position var den fick positionen från första hemtnigen
      mapTypeId: 'roadmap',
      disableDefaultUI: false, //true
      draggable: true, //false
      scrollwheel: true, // false
      panControl: true, //false
      //maxZoom: zoom,
      //minZoom: zoom,


      // style generated on https://snazzymaps.com/
      
    });
    

   

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the storlek.
    for (var location in intressePungter) {
      // Add the circle for this city to the map.
      var locationCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: intressePungter[location].center,
        radius: Math.sqrt(intressePungter[location].storlek)
      });
    
    }
    myLocation();
    //document.addEventListener("DOMContentLoaded", myLocation);
  }
        
}




