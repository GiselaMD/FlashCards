export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export const getDecks = decks => ({
    type: GET_DECKS,
    decks,
});

export const addDeck = deck => ({
    type: ADD_DECK,
    deck,
});

export const addQuestion = card => ({
    type: ADD_QUESTION,
    card,
});