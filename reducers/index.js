import {GET_DECKS, ADD_DECK, ADD_QUESTION} from '../actions/index'

function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {...state, ...action.decks};

        case ADD_DECK:
            return {...state, ...action.deck};

        case ADD_QUESTION:
            const {title, questions, question, answer} = action.card;
            const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ]);

            return {
                ...state,
                [title]: {...state[title], questions: newQuestions},
            };

        default:
            return state;
    }
}

export default decks;