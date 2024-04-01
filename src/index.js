// Your code here

// Add event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch movie data and display movie details
    function movieDetails() {
        fetch('./db.json')
            .then(response => response.json())
            .then(data => {
                // Get the first movie from the data
                const movie = data.films[0]
                // Get elements to display movie details
                const poster = document.querySelector('#poster');
                const title = document.getElementsByClassName("title")
                const description = document.querySelector('#film-info')
                const runTime = document.querySelector(".meta");
                const showTime = document.getElementById("showtime")
                const availableTicket = document.getElementById("ticket-num")
                
                // Set the text content of the elements to the movie details
                description.innerText = `${movie.description}`;
                title.innerText = `${movie.title}`;
                poster.src = `${movie.poster}`;
                runTime.innerText = `${movie.runtime} minutes`
                showTime.innerText = `${movie.showtime}`
                availableTicket.innerText = `${movie.capacity - movie.tickets_sold}`
                
                const button = document.getElementById('buy-ticket')
                let remainder = Number(movie.capacity - movie.tickets_sold)
                
                // Add event listener to buy ticket button
                button.addEventListener('click', function () {
                     // If there are available tickets, reduce the number of available tickets and update the text content
                    if (remainder > 0) {
                        remainder--
                        availableTicket.innerText = `${remainder}`

                    } else {
                        // If there are no available tickets, set the text content to 0 and update the button style
                        availableTicket.innerText = 0

                    }
                })

            })

    }


    // Function to display a list of movies
    function movieLists() {
        fetch('./db.json').then(res => res.json()).
            then((data) => {

                // Remove existing movie list
                const removeExist = document.querySelector('.film')
                removeExist.remove()

                // Get the list of movies
                const movies = data.films
                movies.forEach(element => {
                    // Create a new list item for each movie
                    const lists = document.querySelector('#films')
                    const list = document.createElement('li')
                    // Assigning class to the new list
                    list.className = "item film"
                    // Setting the content text to titles from db.json file
                    list.innerText = element.title
                    // Setting the cursor type to pointer
                    list.style.cursor="pointer"
                    // Appending the list item to the parent node
                    lists.appendChild(list)
                    // Add event listener to list item
                    list.addEventListener('click', function () {

                       // Get elements to display movie details                        
                        const button = document.getElementById('buy-ticket')
                        button.innerText='Buy Ticket'
                        button.style.backgroundColor='#e07b53'

                        const poster = document.querySelector('#poster');
                        const title = document.querySelector(".title")
                        const description = document.querySelector('#film-info')
                        const runTime = document.querySelector(".meta");
                        const showTime = document.getElementById("showtime")
                        const availableTicket = document.getElementById("ticket-num")


                       // Set the text content of the details elements to the movie details
                        description.innerText = `${element.description}`;
                        title.innerText = `${element.title}`;
                        poster.src = `${element.poster}`;
                        runTime.innerText = `${element.runtime} minutes`
                        showTime.innerText = `${element.showtime}`
                        availableTicket.innerText = `${element.capacity - element.tickets_sold}`
                        let remainder =element.capacity - element.tickets_sold
                        const ticket = document.getElementById("ticket-num")


                        // Adding an Event listener to the buy ticket button
                        button.addEventListener('click', function () {
                            button.innerText='Buy Ticket'
                            button.style.backgroundColor='#e07b53'
                           
                
                            if (remainder > 0) {
                                ticket.innerText = `${remainder}`
                                remainder--

                            } else if(remainder<=0) {
                                ticket.innerText = 0
                                button.innerText='Sold Out'
                                button.style.backgroundColor='grey'
                                button.style.color="black"
                                // Adding a class of "Sold-out" to the list item 
                                list.classList.add("sold-out")
                            }

                        })

                    })

                });

            });


    }


    // Invoking/calling the functions
    movieDetails()
    movieLists()


})
