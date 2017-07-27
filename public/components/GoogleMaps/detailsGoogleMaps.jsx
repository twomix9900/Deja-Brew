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
    if (!!this.props.venue.selectedVenue.brewery) {
      let lng;
      let lat;
      this.props.venue.selectedVenue.latitude ? lat = this.props.venue.selectedVenue.latitude : null;
      this.props.venue.selectedVenue.longitude ? lng = this.props.venue.selectedVenue.longitude : null;
      if (lng && lat) {
        let latlng = new google.maps.LatLng(lat, lng);
        this.createMarker(latlng, map);
        bounds.extend(latlng);
        map.fitBounds(bounds);
      }
    } else if (!!this.props.venue.selectedVenue.locations) {
      for (let i = 0; i < this.props.venue.selectedVenue.locations.length; i++) {
        let lng;
        let lat;
        this.props.venue.selectedVenue ? lat = this.props.venue.selectedVenue.locations[0].latitude : null;
        this.props.venue.selectedVenue ? lng = this.props.venue.selectedVenue.locations[0].longitude : null;
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
      center: new google.maps.LatLng(33.976002, -118.390891),
      zoom: 12,
      maxZoom: 15,
      mapTypeId: 'roadmap'
    };

    let map = new google.maps.Map(document.getElementById('map-canvas2'), mapOptions);
    this.displayMarker(map);

    google.maps.event.addDomListener(window, 'load', this.initialize);
  }

  render() {
    return (
      <div id="map-canvas2" style={{ "height": "250px", "width": "250px" }} className='container'></div>
    );
  }
}



