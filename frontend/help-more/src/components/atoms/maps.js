import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = (props) => {
    const mapStyles = {
        width: props.width,
        height: props.height,
    };
    return (
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            center={{
                lat: props.lat,
                lng: props.long,
            }}
        >
            {props.list.map((elem, i) => {
                if (elem.location) {
                    console.log(elem.location.coordinates);
                    return (
                        <Marker
                            label={elem.label}
                            key={i}
                            position={{
                                lat: elem.location.coordinates[1],
                                lng: elem.location.coordinates[0],
                            }}
                        />
                    );
                }
            })}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: "",
})(MapContainer);
