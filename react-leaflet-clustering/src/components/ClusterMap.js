import React, { Component } from 'react';
import { MapContainer, TileLayer, LayerGroup, Circle } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const greenOptions = { color: 'green', fillColor: 'green' }

export default function ClusterMap({ clusters }) {
    const Points = (
        (clusters)
            ? (
                <LayerGroup>
                    {Array.from(clusters).map((point, i) => (
                        <Circle
                            key={i}
                            center={[point[1], point[0]]}
                            pathOptions={greenOptions}
                            radius={500}
                        />
                    ))}
                </LayerGroup>
            ) : null

    )

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Cluster Map</h1>
            <MapContainer style={{ height: '80vh' }} zoom={13} center={[39.2902778, -76.6125]}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Points}
            </MapContainer>
        </div>
    );

}

