import React, { Component } from 'react';
import { MapContainer, TileLayer, LayerGroup, Circle } from "react-leaflet";
//import BaltimoreCityLine from './../data/BaltimoreCityLine.json';
import 'leaflet/dist/leaflet.css';

const greenOptions = { color: 'green', fillColor: 'green' }
//var clusters = ;

class ClusterMap extends Component {
    state = {}
    render(){
        return (
        <div>
            <h1 style={{textAlign: 'center'}}>Cluster Map</h1>
            <MapContainer style={{height:'80vh'}} zoom={13} center={[39.2902778, -76.6125]}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayerGroup>
                {/* {Array.from(this.props.clusters.features).map((point) =>(
                    <Circle
                    center={[point.properties.Latitude, point.properties.Longitude]}
                    pathOptions={greenOptions}
                    radius={50}
                    />
                ))}  */}
                </LayerGroup>
            </MapContainer>
        </div>
        );
    }
}

export default ClusterMap;