let map;

var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

let initMap = () => {
    let mapOptions = {
        center: { lat: 18.781790702300682, lng: 98.97758947595405 },
        zoom: 10,
        mapTypeId: "satellite",
        // mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "satellite", "terrain", "hybrid"],
            position: google.maps.ControlPosition.TOP_LEFT
        },
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);

    map.addListener("click", (e) => {
        createMarker(e.latLng.toJSON());
    })

    // calcRoute()
}

let createMarker = (latlng) => {
    console.log(latlng);
    var icon = {
        url: "./pin.png",
        scaledSize: new google.maps.Size(40, 40)
    };
    let marker = new google.maps.Marker({
        position: latlng,
        map,
        icon,
        // label: "asdfgh"
    })

    let infowindow = new google.maps.InfoWindow({
        content: "asdfghjk"
    })

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        })
    })
}

let calcRoute = () => {
    var start = new google.maps.LatLng({ lat: 18.781790702300682, lng: 98.97758947595405 });
    var end = new google.maps.LatLng({ lat: 18.77345311226543, lng: 98.98043021647146 });
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }

    directionsService.route(request, (result, status) => {
        console.log(result, status);
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    })
}

// start
initMap()
