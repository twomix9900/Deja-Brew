
//import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
import {
    default as React,
    Component,
} from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { GoogleMapLoader } from "react-google-maps";

const AccessGoogleMap = withGoogleMap(props => (
    <GoogleMap
    defaultZoom={12}
    defaultCenter={props.center}
    OnClick={props.onMapClick}
    >
     {props.markers.map((marker, index) =>
     <Marker position={marker.position} key={index} />
     )}
    </GoogleMap>
));

class AccessGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            center: new google.maps.LatLng(33.976002, -118.390891),
        };
        this.handleMapClick = this.handleMapClick.bind(this);
    }


    handleMapClick(event) {
        this.setState({
            center: event.LatLng,
            markers: [
                ...this.state.markers,
                { position: event.LatLng },
            ],
        });
    }

    render() {
        return (
            <div>
                <AccessGoogleMap
                containerElement={
                    <div style={{height: `500px`}} />
                }
                mapElement={
                    <div style={{height: `500px`}} />
                }
                onMapClick={this.handleMapClick}
                center={this.state.center}
                markers={this.state.markers}
                />
            </div>
        );
    }
}

export default AccessGoogle;


