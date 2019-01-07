import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createDeck} from '../utils/api';
import {connect} from 'react-redux';
import {addDeck} from '../actions/index';
import {purple, white} from '../utils/colors'

class AddDeck extends React.Component {
    componentWillMount() {
        this.setState({
            text: ''
        })
    }

    addCurrentDeck = () => {
        const entry = this.state;
        const {decks} = this.props;

        if (!entry.text) {
            Alert.alert(
                'Campo obrigatório',
                'O título não pode ser vazio'
            );
        } else {
            if (decks[entry.text]) {
                Alert.alert(
                    'Error!',
                    'Deck já existente'
                );
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: []}};

                this.props.dispatch(addDeck(newDeck));
                createDeck(newDeck);

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
                <Text style={style.title}>Title: </Text>

                <TextInput
                    value={this.state.text}
                    placeholder='My Deck'
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>

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