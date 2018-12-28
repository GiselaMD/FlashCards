export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export const getDecks = decks => ({
    type: FETCH_DECKS,
    decks,
});

export const addDeck = deck => ({
    type: ADD_DECK,
    deck,
});

export const addQuestion = params => ({
    type: ADD_QUESTION,
    params,
});