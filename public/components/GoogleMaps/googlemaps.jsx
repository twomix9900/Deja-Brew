
//import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
import {
    default as React,
    Component,
} from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    GoogleMapLoader
} from 'react-google-maps';


const AccessGoogleMap = withGoogleMap(props => (
    <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{lat: 34.0211, lng: -118.3965 }}
    OnClick={props.onMapClick}
    >
     {props.markers.map((marker, index) => (
     <Marker 
       {...marker}
       onRightClick={() => props.onRightClick(index)}
     />
    ))}
    </GoogleMap>
));

class AccessGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            center: new google.maps.LatLng(34.0211, -118.3965),
        };
        this.handleMapClick = this.handleMapClick.bind(this);
    }


    handleMapClick(event) {
        this.setState({
            center: event.LatLng,
            markers: [
                ...this.state.markers,
                { position: event.LatLng, map: map },
            ],
        });
    }

    render() {
        return (
            <div>
                <AccessGoogleMap
                containerElement={
                    <div style={{height: `500px`, width: `70%`}} />
                }
                mapElement={
                    <div style={{height: `500px`, width: `70%`}} />
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


