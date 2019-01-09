import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {purple, white, green, red, orange} from '../utils/colors'

export default class Quiz extends Component {
    state = {
        index: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    };
    navigateBack = () => {
        this.props.navigation.goBack();
    }

    startQuiz = () => {
        this.setState({
            index: 0, 
            correctAnswers: 0, 
            shouldShowAnswer: false
        });
    };

    getAnswer = () => {
        this.setState({
            shouldShowAnswer: !this.state.shouldShowAnswer
        });
    };

    correctAnswer = () => {
        const {index, correctAnswers} = this.state;
        this.setState({
            index: index + 1, 
            correctAnswers: correctAnswers + 1, 
            shouldShowAnswer: false
        });
    };

    incorrectAnswer = () => {
        this.setState({index: this.state.index + 1});
    };
    render() {
        const {index, correctAnswers, shouldShowAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const haveQuestions = index < questions.length;
        const questionLeft = questions.length - index;

        return (
            <View style={{flex: 1}}>
                {haveQuestions ? (
                    <View style={styles.container}>

                        <View style={styles.countQuestionLeft}>
                            <Text>Restam {questionLeft} questões</Text>
                        </View>

                        <View style={{flex: 4}}>
                            {shouldShowAnswer ? (
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 36}}>{questions[index].answer}</Text>

                                    <TouchableOpacity onPress={this.getAnswer}>
                                        <Text style={{fontSize: 18, color: '#70dd2f'}}>Question</Text>
                                    </TouchableOpacity>

                                </View>) : (
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 36}}>{questions[index].question}</Text>

                                    <TouchableOpacity onPress={this.getAnswer}>
                                        <Text style={{fontSize: 18, color: '#ff463f'}}>Answer</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <TouchableOpacity 
                                    onPress={this.correctAnswer}>
                                    <Text style={[styles.correct_btn, styles.text_btn]}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.incorrectAnswer}>
                                    <Text style={[styles.incorrect_btn, styles.text_btn]}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                ) : (
                    <View style={styles.container}>
                        
                        {correctAnswers == 1  ? (
                            <Text style={styles.countQuestionLeft}> You got {correctAnswers} question out of {questions.length} questions </Text>
                        ):(
                            <Text style={styles.countQuestionLeft}> You got {correctAnswers} questions out of {questions.length} questions </Text>
                        )}

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <TouchableOpacity 
                                    onPress={this.startQuiz}>
                                    <Text style={[styles.startQuiz_btn, styles.text_btn]}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.navigateBack}>
                                    <Text style={[styles.return_btn, styles.text_btn]}>Return to Deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    startQuiz_btn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2
      },
      return_btn: {
        margin: 5,
        backgroundColor: orange,
        padding: 10,
        borderRadius: 2
      },
    text_btn: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    correct_btn: {
        margin: 5,
        backgroundColor: green,
        padding: 10,
        borderRadius: 2,
        width: 200,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20
      },
    incorrect_btn: {
        margin: 5,
        backgroundColor: red,
        padding: 10,
        borderRadius: 2,
        width: 200,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20
    },
    countQuestionLeft: {
        justifyContent: 'flex-start', 
        flex: 1,
        marginLeft: 10,
        fontSize: 22,
    }
});