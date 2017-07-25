import React, { Component } from 'react';
import Helmet from "react-helmet";
import _ from "lodash";
import { GoogleMapLoader, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class DetailsGoogleMaps extends Component {
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
        let lng;
        let lat;
        this.props.breweryLocationsMarker ? lat = this.props.breweryLocationsMarker[i].latitude : null;
        this.props.breweryLocationsMarker ? lng = this.props.breweryLocationsMarker[i].longitude : null;

        if (lng && lat) {
          let latlng = new google.maps.LatLng(lat, lng);
          this.createMarker(latlng, map);
          bounds.extend(latlng);
          map.fitBounds(bounds);
        }
      }
    } else if (this.props.beersMarker.length > this.props.breweriesMarker.length) {
      for (let i = 0; i < this.props.beersMarker.length; i++) {
        let lng;
        let lat;
        this.props.beersMarker[i].locations ? lat = this.props.beersMarker[i].locations[0].latitude : null;
        this.props.beersMarker[i].breweries ? lat = this.props.beersMarker[i].breweries[0].locations[0].latitude : null;
        this.props.beersMarker[i].locations ? lng = this.props.beersMarker[i].locations[0].longitude : null;
        this.props.beersMarker[i].breweries ? lng = this.props.beersMarker[i].breweries[0].locations[0].longitude : null;

        if (lng && lat) {
          let latlng = new google.maps.LatLng(lat, lng);
          this.createMarker(latlng, map);
          bounds.extend(latlng);
          map.fitBounds(bounds);
        }
      }
    } else if (this.props.breweriesMarker.length > this.props.beersMarker.length) {
      for (let i = 0; i < this.props.breweriesMarker.length; i++) {
        let lng;
        let lat;

        this.props.breweriesMarker[i].locations ? lat = this.props.breweriesMarker[i].locations[0].latitude : null;
        this.props.breweriesMarker[i].locations ? lng = this.props.breweriesMarker[i].locations[0].longitude : null;

        if (this.props.breweriesMarker[i].breweries) {
          this.props.breweriesMarker[i].breweries[0].locations ? lat = this.props.breweriesMarker[i].breweries[0].locations[0].latitude : null;
          this.props.breweriesMarker[i].breweries[0].locations ? lng = this.props.breweriesMarker[i].breweries[0].locations[0].longitude : null;
        }

        if (lng && lat) {
          let latlng = new google.maps.LatLng(lat, lng);
          this.createMarker(latlng, map);
          bounds.extend(latlng);
          map.fitBounds(bounds);
        }
      }
    } else {
      return;
    }

  }

  createMarker(latlng, map) {
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
  }

  initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(33.9741850, -118.3927970),
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



