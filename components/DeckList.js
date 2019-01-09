import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../actions/index';
import {fetchDecks} from '../utils/api'
import DeckCard from './DeckCard';

class DeckList extends  Component {
   
    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => 
                this.setState(
                    () => ({ready: true})
                )
            );
    }

    renderItem = ({item}) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('DeckDetail', item)}>
                <DeckCard
                    title={item.title}
                    questions={item.questions}/>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Decks</Text>
                <FlatList
                    style={styles.deck_list}
                    data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
  },
  deck_list: {
      marginTop: 20
  }
});

export default connect(mapStateToProps)(DeckList)