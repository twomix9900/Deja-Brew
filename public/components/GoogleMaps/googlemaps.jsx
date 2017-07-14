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


    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        console.log('regular old click');
        console.log('this.props-->',this.props);
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });
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
            <div >
                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{ height: `500px`, width: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `500px`, width: `100%` }} />
                    }
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                    markers={this.state.markers}
                    onMarkerRightClick={this.handleMarkerRightClick}
                />
            </div>
        );
    }
}



