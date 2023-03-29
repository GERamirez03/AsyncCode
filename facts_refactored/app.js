const numberFacts = {
    baseURL : "http://numbersapi.com/",
    favoriteNumber : "13",
    $factList : $("#fact-list"),

    async getFavoriteNumberFact() {
        const url = this.baseURL + this.favoriteNumber + "?json"
        const response = await axios.get(url)
        console.log(response.data.text)
        return response
        // return the response to allow us to read the data within other functions
    },

    async getNumbersFacts(numbersArray) {
        const numbersString = numbersArray.join()
        const url = this.baseURL + numbersString + "?json"
        const response = await axios.get(url)

        for (const [key, value] of Object.entries(response.data)) {
            $( `<li><b>${key}</b>: ${value} </li>`).appendTo(this.$factList)
        }

        return response
    },

    async getFourFavoriteNumberFacts() {
        
        const factsPromises = await Promise.all([
            this.getFavoriteNumberFact(),
            this.getFavoriteNumberFact(),
            this.getFavoriteNumberFact(),
            this.getFavoriteNumberFact()
        ]);

        for ( let i = 0; i < 4; i++ ) {
            // console.log(factsPromises[i].data.text)
            $(`<li>${factsPromises[i].data.text}</li>`).appendTo(this.$factList)
        }

        return factsPromises
    }
}