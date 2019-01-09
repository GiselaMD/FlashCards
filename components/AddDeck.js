import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {addNewDeck} from '../utils/api';
import {connect} from 'react-redux';
import {addDeck} from '../actions/index';
import {purple, white} from '../utils/colors'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class AddDeck extends React.Component {
    componentWillMount() {
        this.setState({
            text: '',
            errorMessage: false,
        })
    }

    addCurrentDeck = () => {
        const entry = this.state;
        const {decks} = this.props;

        if (!entry.text){this.setState({errorMessage: true})}
        else{
            if (decks[entry.text]) {
                Alert.alert(
                    'Error!',
                    'Deck já existente'
                );
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: []}};

                this.props.dispatch(addDeck(newDeck));
                addNewDeck(newDeck);

                Alert.alert(
                    'Sucesso!', 'Deck adicionado',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('DeckDetail', {
                            title: entry.text,
                            questions : []
                        })},
                    ],
                );

                this.setState({text: ''});
            }
        }
    };

    render() {
        return (
            <View style={style.container}>
                <FormLabel style={style.title}>Title</FormLabel>

                <FormInput
                    value={this.state.text}
                    placeholder='My Deck'
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>
                <FormValidationMessage>{this.state.errorMessage ? 'This field is required': ''}</FormValidationMessage>
                <TouchableOpacity
                    onPress={this.addCurrentDeck}
                    style={style.addDeck_btn}>
                    <Text style={style.text_btn}>Create Deck</Text>
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
    title:{
        fontSize: 25,
        paddingTop: 30,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: white,
        margin: 24,
        fontSize: 20,
    },
    addDeck_btn: {
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

export default connect(mapStateToProps)(AddDeck);