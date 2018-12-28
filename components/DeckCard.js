import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class DeckCard extends Component {
    render() {
        const {title, questions} = this.props;

        return (
        <View style={styles.deck}>
            <View>
                <Text style={{fontSize: 28, marginTop: 12}}>{title}</Text>
                <Text style={{fontSize: 20, marginTop: 12, color: '#666'}}>{questions && questions.length} cards</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        marginTop: 20,
        height: 120,
        backgroundColor: '#fff',
    },
});