const axios = require('axios');
// Part One: Joke API 
// Part 1.1: Randon Joke 
axios.get('https://official-joke-api.appspot.com/random_joke')
  .then(response => {
    const joke = response.data;
    console.log(`Random Joke: ${joke.setup} - ${joke.punchline}`);
  })
  .catch(error => {
    console.error('Error fetching random joke:', error);
  });

// Part 1.2: Mutliple Jokes 
axios.get('https://official-joke-api.appspot.com/random_ten')
  .then(response => {
    const jokes = response.data;
    jokes.forEach((joke, index) => {
      console.log(`Joke ${index + 1}: ${joke.setup} — ${joke.punchline}`);
    });
  })
  .catch(error => {
    console.error('Error fetching multiple jokes:', error);
  });

//  Part 1.3: Joke by Type 
function getJokeByType(type) {
  axios.get(`https://official-joke-api.appspot.com/jokes/${type}/random`)
    .then(response => {
      const joke = response.data[0];
      console.log(`Joke of type "${type}": ${joke.setup} - ${joke.punchline}`);
    })
    .catch(error => {
      console.error(`Error fetching joke of type "${type}":`, error);
    });
}
// Example usage:
getJokeByType('programming');
getJokeByType('general');
getJokeByType('knock-knock');

// Part 1.4: Stretch Goal - Mutliple Requests for the Same Thing 
const jokeUrl = 'https://official-joke-api.appspot.com/random_joke';

Promise.all([
  axios.get(jokeUrl),
  axios.get(jokeUrl),
  axios.get(jokeUrl),
  axios.get(jokeUrl)
])
  .then(responses => {
    responses.forEach((response, i) => {
      console.log(`Joke ${i + 1}:`, response.data.setup, '-', response.data.punchline);
    });
  })
  .catch(err => console.error(err)); 

// Part 1.5: Stretch Goal - Helper Function 
async function getJoke() {
  const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
  return response.data;
}

async function logFiveJokes() {
  for (let i = 0; i < 5; i++) {
    const joke = await getJoke();
    console.log(`Joke ${i + 1}:`, joke.setup, '-', joke.punchline);
  }
}

logFiveJokes();

//  Part Two: Deck of Cards API
// Part 2.1: New Deck 
async function getNewDeck() {
  try {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/');
    const deckId = response.data.deck_id;
    console.log('New deck created with ID:', deckId);
    return deckId;
  } catch (error) {
    console.error('Error creating new deck:', error);
  }
}

// Part 2.2: Draw One Card 
async function drawOneCard(deck_id) {
  try {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const card = response.data.cards[0];
    console.log(`Drew card: ${card.value} of ${card.suit}`);
  } catch (error) {
    console.error('Error drawing card:', error);
  }
}
// Part 3: Draw Multiple Cards 
async function drawMultipleCards(deckId, count) {
  try {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=5`);
    const cards = response.data.cards;
    cards.forEach((card, index) => {
      console.log(`Card ${index + 1}: ${card.value} of ${card.suit}`);
    });
  } catch (error) {
    console.error('Error drawing multiple cards:', error);
  }
}
// Part 4: Stretch Goal 1 - Shuffle and Re-Draw
async function shuffleDeck(deck_id) {
  try {
    await axios.get(`https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/`);
    console.log('Deck shuffled.');
  } catch (error) {
    console.error('Error shuffling deck:', error);
  }
}
async function drawAndShuffle(deckId, count) {
  await drawMultipleCards(deckId, count);
  await shuffleDeck(deckId);
  await drawMultipleCards(deckId, count);
}

// Part 2.5: Stretch Goal 2 - Array of Cards 
async function drawCardsFromDeck(deckId, count) {
  try {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    const cards = response.data.cards;
    return cards.map(card => `${card.value} of ${card.suit}`);
  } catch (error) {
    console.error('Error drawing cards from deck:', error);
  }
}