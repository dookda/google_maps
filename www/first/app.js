var map;
var directionsService;
var directionsRenderer;

function initMap() {
    const latLng = { lat: 18.781790702300682, lng: 98.97758947595405 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: latLng,

    });

    map.addListener("click", (e) => {
        let latlng = e.latLng.toJSON();
        createMarker(latlng)
    })
}
let marker;
let createMarker = (latlng) => {
    marker ? marker.setMap(null) : null;
    marker = new google.maps.Marker({
        position: latlng,
        map: map
    })

    // const marker = new google.maps.Marker({
    //     position: myLatlng,
    //     map,
    //     title: "Click to zoom",
    // });
    // map.addListener("center_changed", () => {
    //     window.setTimeout(() => {
    //         map.panTo(marker.getPosition());
    //     }, 3000);
    // });
    // marker.addListener("click", () => {
    //     map.setZoom(8);
    //     map.setCenter(marker.getPosition());
    // });

    calcRoute(latlng);
}


let calcRoute = (latlng) => {
    var start = new google.maps.LatLng({ lat: 18.781790702300682, lng: 98.97758947595405 });
    // var end = new google.maps.LatLng({ lat: 18.77345311226543, lng: 98.98043021647146 });
    var end = latlng;
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }

    if (directionsRenderer) {
        console.log(directionsRenderer);
        directionsRenderer.setMap(null);
        directionsRenderer = null;
    }

    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsService = new google.maps.DirectionsService();

    // directionsService.route(request, (result, status) => {
    //     console.log(result, status);
    //     if (status == 'OK') {
    //         directionsRenderer.setDirections(result);
    //     }
    // })
    let l = "cisqBupb{Qg@JqGQsIOoCE]AuAAwBIkDMcDGaB@y@?qBIqHQsA…@_B}@_C_AuC_@mA{@mC_@yAa@yAa@eA[w@sCwGeBuD{@iBvBK"

    var decodedPoints = google.maps.geometry.encoding.decodePath(l);
    console.log(decodedPoints);

    directionsService.route(request).then(res => {
        directionsRenderer.setDirections(res);
        const route = res.routes[0];
        console.log(route);
    })
}
