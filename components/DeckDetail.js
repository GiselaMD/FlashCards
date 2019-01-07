import React, {Component} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {purple, white, orange} from '../utils/colors'

class DeckDetail extends Component {
  render() {
    let {title} = this.props.navigation.state.params;
    const questions = this.props.decks[title] && this.props.decks[title].questions;

    return (
      <View>
        <View>
          <Text style={{fontSize: 32, marginTop: 12}}>{title}</Text>
          <Text style={{fontSize: 22, marginTop: 12}}>{questions && questions.length} cards</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Quiz', {
                title,
                questions,
            });
          }}>
            <Text style={[styles.startQuiz_btn, styles.text_btn]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard', {
                title,
                questions,
            });
        }}>
            <Text style={[styles.addCard_btn, styles.text_btn]}>Add Card</Text>
        </TouchableOpacity>
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
  addCard_btn: {
    margin: 5,
    backgroundColor: orange,
    padding: 10,
    borderRadius: 2
  },
  startQuiz_btn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  },
  text_btn: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

export default connect(mapStateToProps)(DeckDetail)