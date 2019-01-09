import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {addQuestion} from '../actions';
import {connect} from 'react-redux';
import {addCard} from '../utils/api';
import {purple, white} from '../utils/colors'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class AddCard extends React.Component {

    state = {
        question: '', answer: '',
        errorMessage: false
    };

    submitQuestion = () => {
        const {question, answer} = this.state;
        const {title, questions} = this.props.navigation.state.params;
        const params = {title, questions, question, answer};

        if(question && answer){
            this.setState({
                errorMessage: false,
                question: ''
              });
              Alert.alert('Sucesso!', 'Seu novo Card foi adicionado',
              [
                  {
                      text: 'OK', onPress: () =>
                      this.props.navigation.goBack()
                  }
              ],)
        }
        else{
            this.setState({ errorMessage: true })
        }

        this.props.dispatch(addQuestion(params));

        addCard({
            card: {question, answer},
            deckName: title
        });
    };

    render() {
        const {question, answer} = this.state;

        return (
            <View style={style.container}>
                <FormLabel>Pergunta</FormLabel>
                <FormInput 
                    placeholder="Você gosta de React?"
                    value={question}
                    style={style.input}
                    onChangeText={question => this.setState({question})}/>
                <FormValidationMessage>{this.state.errorMessage ? 'This field is required': ''}</FormValidationMessage>
                <FormLabel>Resposta</FormLabel>
                <FormInput
                    placeholder="Amo <3"
                    value={answer}
                    style={style.input}
                    onChangeText={answer => this.setState({answer})}/>
                <FormValidationMessage>{this.state.errorMessage ? 'This field is required': ''}</FormValidationMessage>
                <TouchableOpacity
                    onPress={this.submitQuestion}
                    style={style.addCard_btn}>
                    <Text style={style.text_btn}>Submit</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: 300,
        height: 56,
        padding: 12,
        borderWidth: 1,
        borderColor: '#7f7f7f',
        margin: 16
    },
    addCard_btn: {
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
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddCard);