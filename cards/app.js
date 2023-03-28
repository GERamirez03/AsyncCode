// Question 3 Solution (See below for Questions 1 and 2 solutions)

const $cardDraws = $("#card-draws")
const $drawCard = $("#draw-card")
const $newDraw = $("#new-draw")

let deckId;

// on page load, create and shuffle a new deck
$( function() {
    axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

        // save a reference to the deck id
        .then( res => deckId = res.data.deck_id)
});

// when the drawCard button is clicked, draw and show a new card
$drawCard.click( () => {
    axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

        .then( res => {

            // grab a reference to the drawn card
            const card = res.data.cards[0]

            // add the card to our list of drawn cards
            $(`<li>${card.value} of ${card.suit}</li>`).appendTo($cardDraws)

            // change the image to be the image of that card
            $newDraw.attr("src", `${card.image}`)
        })
    })

/* ##################### SOLUTIONS TO QUESTIONS 1 AND 2 ##############################




// ########################### Question 1 ############################################ 
// Request a single card from a newly shuffled deck. Print the value and suit.

axios
    // first, create and shuffle a new deck
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

    // then, grab a reference to our deck id and draw a single card from it
    .then( res => {
        const deckId = res.data.deck_id
        
        // console.log(res)
        // console.log(deckId)

        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

    })

    // finally, print the information from the card
    .then( res => {
        const card = res.data.cards[0]
        console.log(`${card.value} of ${card.suit}`)
    })

// ####################################################################################





// ########################### Question 2 ############################################
// Request a single card from a newly shuffled deck. Then, draw another card
// from the SAME deck. Once we have both cards, print their values and suits.

const cardsArray = []

axios
    // first, create and shuffle a new deck
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

    // then, grab a reference to our deck id and draw a single card from it
    .then( res => {
        deckId = res.data.deck_id

        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })

    // then, push our first card into cardsArray AND draw another card from the SAME deck
    .then( res => {

        const card = res.data.cards[0]
        cardsArray.push(card)

        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })

    // then, push the second card into cardsArray and print both!
    .then( res => {
        const card = res.data.cards[0]
        cardsArray.push(card)

        cardsArray.forEach( card => console.log(`${card.value} of ${card.suit}`))
    })

    ##################################################################################

*/