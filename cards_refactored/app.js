class Deck {
    constructor() {
        this.$cardDraws = $("#card-draws")
        this.$newDraw = $("#new-draw")
        this.createDeck()
    }

    async createDeck() {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

        this.deckId = response.data.deck_id

        return response
    }

    async drawCard() {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)

        this.newestCard = response.data.cards[0]
        this.$newDraw.attr("src", `${this.newestCard.image}`)

        $(` <li>${this.newestCard.value} of ${this.newestCard.suit}</li> `).appendTo(this.$cardDraws)

        return response
    }

    async drawCards(quantity) {

        const promiseArray = []
        for ( let i = 0; i < quantity; i++ ) {
            promiseArray.push(this.drawCard())
        }

        const promiseCards = await Promise.all(promiseArray);
        return promiseCards
    }
}

const $drawCard = $("#draw-card")

let deck;

// on page load, instantiate a new Deck -- this creates and shuffles a new deck from the API
$( function () {
    deck = new Deck();
    console.log(deck)
});

// when the drawCard button is clicked, call the current deck's drawCard method
$drawCard.click( event => deck.drawCard())
