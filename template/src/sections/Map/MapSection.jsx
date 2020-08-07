/*global google*/
import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle, DirectionsRenderer, TrafficLayer, InfoWindow } from "react-google-maps"
import { MAP } from "react-google-maps/lib/constants";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, lifecycle } from "recompose"

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import DirectionsCar from '@material-ui/icons/DirectionsCar';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import School from '@material-ui/icons/School';
import LocalHospital from '@material-ui/icons/LocalHospital';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import CommuteIcon from '@material-ui/icons/Commute';
import Directions from '@material-ui/icons/Directions';

import { Stage, ffmap, ContextStore } from '../../lib/Context'

const apiKey = '<your google maps api key here>';

const MapSection = ({ className, marker, traffic, controls }) => {
  var PlacesService;
  const iexContext = useContext(ContextStore);

  const [state, setState] = React.useState({
    checkedA: false,
    isMarkerShown: false,
    isTrafficShown: false,
    places: [],
    results: [],
    filter: "school",
    route: "drive",
    origin: "",
    origin_desc: "",
  });

  const handleChange = name => (event) => {
    //const name = event.target.name;
    const checked = event.target.checked;
    const searchType = state.filter;
    const icoHospital = require('./hospital.png');
    const icoSchool = require('./school.png');
    const icoPark = require('./park.png');
    const icoMarket = require('./supermarket.png');

    if (name == "checkedA") {
      if (checked) {
        let icon = icoSchool;
        if (searchType == "hospital") {icon = icoHospital;}
        else if (searchType == "park") {icon = icoPark;}
        else if (searchType == "supermarket") {icon = icoMarket;}

        const iconMarker = new window.google.maps.MarkerImage(
          icon,
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new window.google.maps.Size(30, 30));

        PlacesService.nearbySearch({
          type: searchType,
          location: new google.maps.LatLng(iexContext.iex.context.entity.latitude.values[0], iexContext.iex.context.entity.longitude.values[0]),
          radius: 3000
        }, (result, status) => {
          //console.log(`result: ${JSON.stringify(result)}`);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const places = result.map((item, i) => {
              return {
                position: item.geometry.location,
                title: item.name,
                id: i
              };
            });
            setState({ ...state, [name]: checked, places: places, icon: iconMarker })
          } else {
            console.error(`ERROR fetching places ${result}`);
            setState({ ...state, [name]: checked, places: [] })
          }
        });
      } else {
        setState({ ...state, [name]: checked, places: [] })
      }
    } else {
      //console.log(`filterChange: ${name}`);
      if (state.checkedA) {
        const iconMarker = new window.google.maps.MarkerImage(
          "http://www.mob-tk.com/clientes/stack/" + name + ".png",
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new window.google.maps.Size(30, 30));

        PlacesService.nearbySearch({
          type: name,
          location: new google.maps.LatLng(iexContext.iex.context.entity.latitude.values[0], iexContext.iex.context.entity.longitude.values[0]),
          radius: 3000
        }, (result, status) => {
          //console.log(`result: ${JSON.stringify(result)}`);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const places = result.map((item, i) => {
              return {
                position: item.geometry.location,
                title: item.name,
                id: i
              };
            });
            setState({ ...state, [name]: checked, places: places, icon: iconMarker, filter: name })
          } else {
            console.error(`ERROR fetching places 2 ${result}`);
            console.log(iexContext.iex.context.entity.latitude.values[0], iexContext.iex.context.entity.longitude.values[0]);
            setState({ ...state, [name]: checked, places: [] })
          }
        });
      } else {
        setState({ ...state, filter: name });
      }
    }
  };

  const handleMode = name => (event) => {
    setState({ ...state, route: name })
  };

  const handleDirections = place => (event) => {
    let origin = place.position.lat() + "," + place.position.lng();
    //console.log(origin);
    const textField = document.getElementById('textbox');
    textField.value = place.title;
    setState({ ...state, origin: origin, origin_desc: place.title})
  };

  const handleTraffic = name => (event) => {
    let flag = !state.isTrafficShown;
    setState({ ...state, isTrafficShown: flag })
  };

  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      //alert('Enter clicked!!!');
      const value = document.getElementById('textbox').value;
      setState({ ...state, origin: value, origin_desc:value })
    }
  };

  const mapMounted = (element) => {
    var mapObject
    if (element) {
      mapObject = element.context[MAP];
      PlacesService = new google.maps.places.PlacesService(mapObject);
    }
  }

  const PlacesWithStandaloneSearchBox = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${apiKey}&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
      componentWillMount() {
        const refs = {}

        this.setState({
          places: [],
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
            const textField = document.getElementById('textbox');
            console.log(state.origin_desc);
            textField.value = state.origin_desc;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            if (places.length>0) {
              let place = places[0];
              let origin = place.geometry.location.lat() + "," + place.geometry.location.lng();
              const textField = document.getElementById('textbox');
              textField.value = place.name;
              setState({ ...state, origin: origin, origin_desc:place.name})
            }
          },
        })
      },
    }),
    withScriptjs
  )(props =>
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          id="textbox" name="Search" onKeyPress={handleKeyPress}
          type="text"
          placeholder="Nearby Search"
          style={{
            width: '100%',
            borderRadius: 4,
            position: 'relative',
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',

            fontFamily: [
              'Roboto','"Helvetica Neue"','Arial','sans-serif',
            ].join(','),
            '&:focus': {
              borderRadius: 4,
              borderColor: '#80bdff',
              boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
          }}
        />
      </StandaloneSearchBox>
    </div>
  );

  const MapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${apiKey}&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `580px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentWillMount(){
        if (state.circleLat==null) {
          let showMarker = false;
          if (marker == "true") {
            showMarker = true;
          }
          let latitude = iexContext.iex.context.entity.latitude.values[0];
          let longitude = iexContext.iex.context.entity.longitude.values[0];
          let circleLat = Math.random() * ((latitude+0.0025) - (latitude-0.0025)) + (latitude-0.0025);
          let circleLng = Math.random() * ((longitude+0.0025) - (longitude-0.0025)) + (longitude-0.0025);
          this.setState({
            lat:latitude,
            lng:longitude,
            circleLat: circleLat,
            circleLng: circleLng,
            isMarkerShown: showMarker,
          });
        }
      },
      componentDidMount() {

        if (state.origin.length > 0) {
          const DirectionsService = new google.maps.DirectionsService();

          let mode;
          if (state.route == "drive") {
            mode = google.maps.TravelMode.DRIVING;
          } else if (state.route == "bus") {
            mode = google.maps.TravelMode.TRANSIT;
          } else if (state.route == "walk") {
            mode = google.maps.TravelMode.WALKING;
          } else if (state.route == "bike") {
            mode = google.maps.TravelMode.BICYCLING;
          }

          DirectionsService.route({
            origin: state.origin,
            destination: new google.maps.LatLng(iexContext.iex.context.entity.latitude.values[0], iexContext.iex.context.entity.longitude.values[0]),
            travelMode: mode,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      }
    }),

  )((props) =>
    <GoogleMap
      ref={mapMounted}
      defaultZoom={15}
      clickableIcons={false}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }}>{props.directions &&
        <InfoWindow><span>
          {props.directions.routes[0].legs[0].distance.text}<br/>
          {props.directions.routes[0].legs[0].duration.text}
        </span></InfoWindow>
      }</Marker>}
      {!props.isMarkerShown && <Circle defaultCenter={{ lat: props.circleLat, lng: props.circleLng }} radius={350} options={{ fillColor: '#e2cc83', strokeColor: "#8D7C38", strokeWeight: 2 }} />}
      {props.directions && <DirectionsRenderer directions={props.directions} />}
      {props.places.map(place => (
        <POIMarker place={place} icon={props.icon} directions={props.onClickDirections}/>
      ))}
      {props.isTrafficShown && <TrafficLayer autoUpdate />}
    </GoogleMap>
  );

  return (
    <section>
      <Grid container spacing={4}>
        <Grid hidden={!controls} item xs={12} sm={6}>
          <div class="space-rot">
            <medium >Route von</medium>
          </div>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormControl >
                <PlacesWithStandaloneSearchBox/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <ButtonGroup size="small" variant="text" aria-label="Route">
              <IconButton color="primary" aria-label="Auto" component="span" onClick={handleMode('drive')}>
                <DirectionsCar />
              </IconButton>
              <IconButton color="primary" aria-label="Bus" component="span" onClick={handleMode('bus')}>
                <DirectionsBus />
              </IconButton>
              <IconButton color="primary" aria-label="Gehenb" component="span" onClick={handleMode('walk')}>
                <DirectionsWalk />
              </IconButton>
              <IconButton color="primary" aria-label="Fahrrad" component="span" onClick={handleMode('bike')}>
                <DirectionsBike />
              </IconButton>
            </ButtonGroup>
          </Grid>
          </Grid>
        </Grid>

        <Grid hidden={!controls} item xs={12} sm={6}>
          <div class="space-check">
              <FormControlLabel size="small"
                control={
                  <Checkbox size="small"
                    checked={state.checkedA}
                    onChange={handleChange('checkedA')}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Um mich herum"
              />
          </div>
          <hr />

          <Grid container spacing={1}>
            <Grid item xs={10} sm={10}>
              <ButtonGroup size="small" variant="text" aria-label="Category">
                <IconButton color="primary" aria-label="Schulen" component="span" onClick={handleChange('school')}>
                  <School />
                </IconButton>
                <IconButton color="primary" aria-label="Krankenhäuser" component="span" onClick={handleChange('hospital')}>
                  <LocalHospital />
                </IconButton>
                <IconButton color="primary" aria-label="Einkaufen" component="span" onClick={handleChange('supermarket')}>
                  <ShoppingBasket />
                </IconButton>
                <IconButton color="primary" aria-label="Parks" component="span" onClick={handleChange('park')}>
                  <LocalFlorist />
                </IconButton>
              </ButtonGroup>
            </Grid>

            {traffic == "true" &&
            <Grid item xs={2} sm={2}>
            <ButtonGroup size="small" variant="text" aria-label="Options">
                <IconButton color="primary" aria-label="Traffic" component="span" onClick={handleTraffic('')}>
                  <CommuteIcon />
                </IconButton>
                {/*<IconButton color="primary" aria-label="print" component="span">
                  <LocalPrintshopIcon />
                </IconButton>*/}
              </ButtonGroup>
            </Grid>
            }
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} style={{marginTop:-30}}>
          <MapComponent
            isMarkerShown={state.isMarkerShown}
            isTrafficShown={state.isTrafficShown}
            places={state.places}
            icon={state.icon}
            origin={state.origin}
            circleLat={state.circleLat}
            circleLng={state.circleLng}
            lat={state.lat}
            lng={state.lng}
            results={state.results}
            onClickDirections={handleDirections}
          />
        </Grid>

      </Grid>
    </section>
  );
}

// RestaurantMarker.
class POIMarker extends React.Component {
  state = {open: false}
  render() {
    const {place, icon, directions} = this.props
    return (

      <Marker key={place.photo_id} position={place.position} title={place.title} icon={icon} onClick={() => this.setState(state => ({open: !state.open}))}>
        {this.state.open && (
          <InfoWindow onClick={() => this.setState(state => ({open: !state.open}))} onCloseClick={() => this.setState(state => ({open: !state.open}))}>
            <span>
              {place.title}
              <IconButton color="primary" aria-label="print" component="span" onClick={directions(place)}>
                <Directions />
              </IconButton>
            </span>
            </InfoWindow>
        )}
      </Marker>


    )
  }
}


const BootstrapInput = withStyles((theme) => ({

  input: {
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    fontFamily: [
      'Roboto','"Helvetica Neue"','Arial','sans-serif',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default MapSection;
