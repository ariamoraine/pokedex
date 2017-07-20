import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Components/home';
import SinglePokemon from './Components/singlePokemon';

const pokedex = StackNavigator({
  Home: {
    screen: Home
  },
  SinglePokemon: {
    screen: SinglePokemon
  }
}, {
  headerMode: 'none'
});

AppRegistry.registerComponent('pokedex', () => pokedex);
