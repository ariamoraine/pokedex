import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class pokedex extends Component {

  constructor (props) {
    super(props);
    this.state = {
      pokeData: [],
      isLoading: true
    };
  }

  pullDownPokemon () {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(responce => responce.json())
    .then(pokemonJSON => {
      this.setState({
        pokeData: pokemonJSON.results,
        isLoading: false
      });
    })
    .catch(console.error);
  }

  componentDidMount () {
    this.pullDownPokemon();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Pokedex!</Text>
        {this.state.isLoading ? <ActivityIndicator /> : <Text style={styles.subText}>Please pick a Pokemon to learn about</Text> }
        <ScrollView>
        {
          this.state.pokeData.map((pokemon, idx) => {
            return (
              <TouchableOpacity key={idx} onPress={() => this.props.navigation.navigate('SinglePokemon', {pokemon: pokemon.url})}>
                <Text style={styles.eachPokemon}>{pokemon.name}</Text>
              </TouchableOpacity>
            );
          })
        }
        </ScrollView>
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
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#d10e0e'
  },
  subText: {
    fontSize: 20,
    color: '#d10e0e',
    bottom: 5
  },
  eachPokemon: {
    fontSize: 35
  }
});
