import React, { Component } from 'react';
import Helmet from "react-helmet";
import _ from "lodash";
import { GoogleMapLoader, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class AccessGoogle extends Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        this.initialize();
    }

    displayMarker(map) {
        var bounds = new google.maps.LatLngBounds();
        if (!!this.props.breweryLocationsMarker.length) {
            for (let i = 0; i < this.props.breweryLocationsMarker.length; i++) {
                let latlng = new google.maps.LatLng(this.props.breweryLocationsMarker[i].latitude, this.props.breweryLocationsMarker[i].longitude);
                // // var name = this.props.breweryLocationsMarker[i].name;
                // // var address = this.props.breweryLocationsMarker[i].streetAddress;
                // // var postalCode = this.props.breweryLocationsMarker[i].postalCode;

                this.createMarker(latlng, map);
                bounds.extend(latlng);
            }
        } else if (this.props.beersMarker.length > this.props.breweriesMarker.length) {
            let lng;
            let lat;

            for (let i = 0; i < this.props.breweriesMarker.length; i++) {
                this.props.beersMarker[i].locations ? lat = this.props.beersMarker[i].locations[0].latitude : lat = this.props.beersMarker[i].breweries[0].locations[0].latitude
                this.props.beersMarker[i].locations ? lng = this.props.beersMarker[i].locations[0].longitude : lng = this.props.beersMarker[i].breweries[0].locations[0].longitude
                if (lng && lat) {
                    let latlng = new google.maps.LatLng(lat, lng);
                    this.createMarker(latlng, map);
                    bounds.extend(latlng);
                }

                // var name = this.props.beersMarker[i].name;
                // var address = this.props.beersMarker[i].streetAddress;
                // var postalCode = this.props.beersMarker[i].postalCode;
            }

        } else if (this.props.breweriesMarker.length > this.props.beersMarker.length) {
            let lng;
            let lat;

            for (let i = 0; i < this.props.breweriesMarker.length; i++) {
                this.props.breweriesMarker[i].locations ? lat = this.props.breweriesMarker[i].locations[0].latitude : lat = this.props.breweriesMarker[i].breweries[0].locations[0].latitude
                this.props.breweriesMarker[i].locations ? lng = this.props.breweriesMarker[i].locations[0].longitude : lng = this.props.breweriesMarker[i].breweries[0].locations[0].longitude
                if (lng && lat) {
                    let latlng = new google.maps.LatLng(lat, lng);
                    this.createMarker(latlng, map);
                    bounds.extend(latlng);
                }

                // var name = this.props.breweriesMarker[i].name;
                // var address = this.props.breweriesMarker[i].streetAddress;
                // var postalCode = this.props.breweriesMarker[i].postalCode;
            }
        }
        map.fitBounds(bounds);
    }

    createMarker(latlng, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: latlng
        });
    }

    initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(33.976002, 118.390891),
            zoom: 12,
            maxZoom: 15,
            mapTypeId: 'roadmap'
        };

        let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        this.displayMarker(map);
        
        google.maps.event.addDomListener(window, 'load', this.initialize);
    }

    render() {
        return (
            <div id="map-canvas"></div>
        );
    }
}



