import {
    default as React,
    Component,
} from "react";

import Helmet from "react-helmet";
import _ from "lodash";
import {
    GoogleMapLoader,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";


const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat: 33.9736654, lng: -118.3918887 }}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />
        ))}
    </GoogleMap>
));

export default class AccessGoogle extends Component {
    constructor(props) {
        super(props)
        console.log('props', this.props.beersMarker);
       // for(let i = 0; i < this.props.breweryLocationsMarker; i++)
        this.state = {
            markers: [{
                position: {
                    lat: 33.9759479,
                    lng: -118.3929176
                },
                key: `Home`,
                defaultAnimation: 2,
            }, {
                position: {
                    lat: 33.7705109,
                    lng: -118.1597921
                },
                key: `Home 2`,
                defaultAnimation: 2
            }],
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

    }
    componentDidMount() {
        console.log('if ur seeing this it loads');
        google.maps.event.addDomListener(window, 'load', this.initialize());
    }
    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log('mapZoom',map.getZoom());
        }
    }

    displayMarker(map) {
        console.log('displayMarker!!!!');
        let bounds = new google.maps.LatLngBounds();
        console.log(this.props.breweryLocationsMarker.length, 'length')
        for (let i = 0; i < this.props.breweryLocationsMarker.length; i++) {
            var latlng = new google.maps.LatLng(this.props.breweryLocationsMarker[i].latitude, this.props.breweryLocationsMarker[i].longitude);
            var name = this.props.breweryLocationsMarker[i].name;
            var address = this.props.breweryLocationsMarker[i].streetAddress;
            var postalCode = this.props.breweryLocationsMarker[i].postalCode;
            console.log('displayMarker-->', latlng.lat(), latlng.lng());

            this.createMarker(latlng, map);

            bounds.extend(latlng);
        }
        console.log('this.props.breweriesMarker', this.props.breweriesMarker);
        console.log('beeers', this.props.beersMarker);
        // for (let i = 0; i < this.props.breweriesMarker.length; i++) {
        //     var latlng = new google.maps.LatLng(this.props.breweriesMarker[i].locations[i].latitude, this.props.breweriesMarker[i].locations[i].longitude);
        //     var name = this.props.breweriesMarker[i].name;
        //     var address = this.props.breweriesMarker[i].streetAddress;
        //     var postalCode = this.props.breweriesMarker[i].postalCode;

        //     this.createMarker(latlng, map);

        //     bounds.extend(latlng);
        // }
        // for (let i = 0; i < this.props.beersMarker.length; i++) {
        //     var latlng = new google.maps.LatLng(this.props.beersMarker[i].latitude, this.props.beersMarker[i].longitude);
        //     var name = this.props.beersMarker[i].name;
        //     var address = this.props.beersMarker[i].streetAddress;
        //     var postalCode = this.props.beersMarker[i].postalCode;

        //     this.createMarker(latlng, map);

        //     bounds.extend(latlng);
        // }
        console.log('MAP-->', map.center.lat());
        map.fitBounds(bounds);
    }

    createMarker(latlng, map) {
        console.log('latLng', latlng.lat(), latlng.lng());
        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            //title: this.name
        });
        console.log('!!!!!this.map', this.map);
    }

    initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(33.976002, -118.390891),
            zoom: 14,
            mapTypeId: 'roadmap'
        };

        let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        console.log('map in init!!-->', map);

        this.displayMarker(map);
    }
    // ComponentDidMount() {
    //     console.log('if ur seeing this it loads');
    //     google.maps.event.addDomListener(window, 'load', initialize);
    // }


    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        console.log('regular old click');
        //console.log('this.props-->!',this.props.breweryLocationsMarker[0]);
        // const nextMarkers = [];
        // for (let i = 0; i < this.props.breweryLocationsMarker.length; i++) {
        //     nextMarkers.push(this.props.breweryLocationsMarker[i].latitude, this.props.breweryLocationsMarker[i].longitude);
        // }
        //this.displayMarker();
        this.initialize();
        //this.props.breweryLocationsMarker[i].latitude, this.props.breweryLocationsMarker[i].longitude;
        // const nextMarkers = [
        //     ...this.state.markers,
        //     {
        //         position: event.latLng,
        //         defaultAnimation: 2,
        //         key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        //     },
        // ];
        // this.setState({
        //     markers: nextMarkers,
        // });
     }

    handleMarkerRightClick(targetMarker) {
        console.log('righthandleClick');
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    render() {
        return (
            <div id="map-canvas" onClick={this.handleMapClick.bind(this)}>
                    
                    {
                        /*containerElement={
                        <div style={{ height: `500px`, width: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `500px`, width: `100%` }} />
                    }
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                    markers={this.state.markers}
                    onMarkerRightClick={this.handleMarkerRightClick}*/}
            </div>
        );
    }
}



