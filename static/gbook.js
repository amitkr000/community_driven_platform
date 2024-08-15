let startindex = 0;
$(document).ready(function(){
    //Event handler for load
    $('#load-btn').click(function(){
        startindex += 10;
        let query = '';
        const search = $('#searchInput').val();
        let term = $('#optionselect').val();
        if (term != ''){
            query = `${term}:${search}`;
        }
        else{
            query = search;
        }
        fetchExploreData(query, startindex, 'load'); // Fetch explore data based on the query
    }
    )

    // Event handler for the search button
    $('#searchBtn').click(function(){
        let query = '';
        const search = $('#searchInput').val();
        let term = $('#optionselect').val();
        if (term != ''){
            query = `${term}:${search}`;
        }
        else{
            query = search;
        }
        let startindex = 0;
        fetchExploreData(query, startindex, 'new-search'); // Fetch explore data based on the query
    });

    // Function to fetch explore data from the server
    function fetchExploreData(query, startindex, action) {
        $.ajax({
        url: '/api/books/search/', // Replace with your server endpoint
        method: 'GET',
        data: { q: query, i: startindex },
        success: function(data) {
            var results = ''
            if (action == "new-search"){
                $('#exploreResults').empty(); // Clear previous results
                results = '<h2>Search Results:</h2>';
            }

                    data.forEach(function(book) {
                        results += `
                        <div class="book-card">
                            <h2 class="book-title">${book.title}</h2>
                            <div class="card-content">
                                <div class="left-side">
                                    <img src=${book.cover_image ? book.cover_image : "https://via.placeholder.com/160"} alt="Book Cover" class="book-image">
                                    <p class="rating">Rating: ${book.rating}</p>
                                </div>

                                <div class="right-side">
                                    <p class="description">${book.description}</p>
                                    <p class="author">Author: ${book.authors.join(', ')}</p>
                                    <p class="category">Category: ${book.categories.join(', ')}</p>
                                    <p class="publisher">Publisher: ${book.publisher}</p>
                                    <p class="published_date">Published Date: ${book.published_date}</p>
                                    <div class="interaction-buttons">
                                        <button class="like-btn">Like</button>
                                        <button class="comment-btn">Comment</button>
                                        <button class="recommend-btn">Recommend</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    });
                    $('#exploreResults').append(results);
                    $('#load-btn').show();
        },
        error: function() {
            $('#results').html('<p>An error occurred while fetching data.</p>');
        }
        });
    }

});