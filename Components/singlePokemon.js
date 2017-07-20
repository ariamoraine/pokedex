import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

export default class pokedex extends Component {

  constructor () {
    super();
    this.state = {
      currentPokemon: {},
      isLoading: true,
    };
  }

  getSinglePokemon (pokeURL) {
    return fetch(pokeURL)
    .then(responce => responce.json())
    .then(foundPokemonJSON => {
      this.setState({
        currentPokemon: foundPokemonJSON,
        isLoading: false
      });
    })
    .catch(console.error);
  }

  capPokemonsName (name) {
    return name[0].toUpperCase() + name.slice(1)
  }

  componentWillMount () {
    this.getSinglePokemon(this.props.navigation.state.params.pokemon);
  }

  render() {
    let {name, moves, weight, types, sprites} = this.state.currentPokemon

    return (
      this.state.isLoading ?
        <View>
          <Text style={styles.welcome}>We are out catching your pokemon!</Text>
          <ActivityIndicator />
        </View>
      :
        <View style={styles.container}>
          <Text style={styles.headerText}>{`Information about ${this.capPokemonsName(name)}`}</Text>
          <Image style={styles.picture} source={{uri: sprites.front_default}} />
          <Text>{`Weight: ${weight}`}</Text>
          <Text>{`Type: ${types[0].type.name}`}</Text>
            <Text>{`All of ${this.capPokemonsName(name)}'s possible moves`} </Text>
            {
              <ScrollView>
              {
              moves.map((currentMove, idx) => <Text key={idx}>{currentMove.move.name}</Text>)
              }
              </ScrollView>
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#d10e0e'
  },
  headerText: {
    fontSize: 25,
    top: 20,
    color: '#d10e0e'
  },
  picture: {
    width: Dimensions.get('window').width / 3 * 2,
    height: Dimensions.get('window').width / 3 * 2,
  }
});
