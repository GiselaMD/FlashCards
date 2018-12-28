import React, {Component} from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import reducer from './reducers/index';
import DeckDetail from './components/DeckDetail';
import DeckList from './components/DeckList';
import { purple, white } from './utils/colors'

// const Tabs = TabNavigator({
//   DeckList: {
//       screen: DeckList,
//       navigationOptions: {
//           tabBarLabel: 'All Decks'
//       },
//   },
//   // NewDeck: {
//   //     screen: NewDeck,
//   //     navigationOptions: {
//   //         tabBarLabel: 'New Deck',
//   //     },
//   // },
// }
// );

const AppNavigator = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  }
})

const TabsContainer = createAppContainer(AppNavigator)

export default class App extends Component {

  render() {
    return  <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}> 
        <TabsContainer/>
      </View>
    </Provider>
  }
}
