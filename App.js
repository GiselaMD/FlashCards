import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import reducer from './reducers/index';
import DeckDetail from './components/DeckDetail';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { purple, white, orange } from './utils/colors'

const Tabs = createBottomTabNavigator({
  DeckList: {screen: DeckList},
  AddDeck: {screen: AddDeck},
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor}) => {
     <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }),
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      labelStyle: {
        fontSize: 12,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
  swipeEnabled: true,
})

const AppNavigator = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },

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
