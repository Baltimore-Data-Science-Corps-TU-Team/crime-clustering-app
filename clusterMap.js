

/**
 * Bootstraps the process for displaying Baltimore, Maryland
 * on the map.
 */
 function run() {
    let centerOfBaltimore = [39.2902778, -76.6125]; // TODO: find a way to query these coordinates instead of hardcoding them
    let mapOSM = "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"; // url for the map provider

    let map = createMap(centerOfBaltimore);
    setTileLayer(map, mapOSM);
    //addClusters(map);

    // loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
    $.getJSON("BaltimoreCityLine.geojson",function(data){
    // L.geoJson function is used to parse geojson file and load on to map
    L.geoJson(data).addTo(map);
    });
}
run();

/**
 * Generate a new map object with dimensions specified by div "mapDimensions" in index.html
 * and center it around Baltimore city.
 * 
 * @param centerCoordinates [latitude, longitude] the center of some location on a map
 *                          (could be a country, city, town, etc)
 * 
 * @returns a map object
 */
 function createMap(centerCoordinates) {
    let mapConfigurations = {
        center: centerCoordinates,
        zoom: 12,
        preferCanvas: true
    };

    return new L.map("map", mapConfigurations);
}

/**
 * Mainly for aesthetics, this will give a particular look
 * to the map depending on which map provider is used for rendering.
 * 
 * @param map the map object
 * @param mapProvider a string url for which map provider to use
 */
function setTileLayer(map, mapProvider) {
    let layer = new L.TileLayer(mapProvider);
    map.addLayer(layer);
}

function addClusters(map){
    var fromDate = window.document.forms["options"]["fromDate"].value;
    var toDate = window.document.forms["options"]["toDate"].value;
    var crime = window.document.forms["options"]["crime"].value;

    console.log(fromDate);
    console.log(toDate);
    console.log(crime);

    $.ajax({
        type: "GET",
        url: 'http://localhost:5000/clusters?fromdate='+fromDate+'&todate='+toDate+'&crime='+crime,
        crossDomain: true,
        success: (data) =>{
            let clusters = JSON.parse(data);
            clusters.forEach((c) =>{
                if (c.Latitude && c.Longitude){
                    L.circle([c.Latitude, c.Longitude], {
                        color: "red",
                        weight: 4,
                        opacity: 1,
                        radius: 2
                    }).addTo(map);
                }
            });
        },
        error: (data) => {
            console.log(data.status, data.statusText);
        }
    })
}