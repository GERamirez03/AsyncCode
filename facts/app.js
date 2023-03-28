const BASE_URL = "http://numbersapi.com";

const favoriteNumber = 13;

const $factList = $("#fact-list")

// const json = "json"

// const url = BASE_URL + 

// axios.get(BASE_URL)

// Question 1: Make request to Numbers API to get a fact about favorite number

// const response = axios.get("http://numbersapi.com/13?json")


// Question 1: Get a fact about my favorite number
axios
    .get("http://numbersapi.com/13?json")
    .then( res => console.log(res.data.text))

// Question 2: Get a fact about multiple numbers at once
axios
    .get("http://numbersapi.com/3..10,21..25?json")
    .then( res => {

        // add facts to page
        for (const [key, value] of Object.entries(res.data)) {
            $( `<li><b>${key}</b>: ${value} </li>`).appendTo($factList)
        }
    })

// Question 3: Get 4 facts about my favorite number. Put all on page once retrieved.

let fourNumberPromises = [];

for (let i = 1; i < 5; i++) {
    fourNumberPromises.push(
        axios.get("http://numbersapi.com/13?json")
    );    
}

Promise.all(fourNumberPromises)
    .then( responseArray => {
        responseArray.forEach( (value, index, array) => {
            // each "value" is a response object with the number fact located at ".data.text"
            $( `<li><b>Favorite Number Fact</b>: ${value.data.text} </li>`).appendTo($factList)
        })
    })