import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Spots extends Component<{}> {

	 state = {
    spots: [],
  }

  // Calls the grab spots function on Init
  componentWillMount() {
    this.fetchSpots();
  }

  // Grabs spot data from /spots endpoint
  fetchSpots = async () => {
    const response = await fetch('https://skate-map-4d126.firebaseio.com/spots.json');
    const json = await response.json();
    console.log(json[Object.keys(json)[0]]);
    fetchedSpots = [];
    for (let i = 0; i < Object.keys(json).length; i++) {
      fetchedSpots.push(json[Object.keys(json)[i]])
    }
    console.log(fetchedSpots);
    this.setState({spots: fetchedSpots})
  }

  // Navigates to the Spot Show page for the Specific Spot
  onLearnMore = (spot) => {
    this.props.navigation.navigate('SpotShow', {...spot});
  }
  
  render() {
    return(
      <ScrollView>
        <List>
          {this.state.spots.map((spot, i) => (
            <ListItem 
              key={i}
              title={spot.name}
              subtitle={spot.desc}
              onPress={() => this.onLearnMore(spot)}
            />
          ))}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		marginTop: 35,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	},
})
