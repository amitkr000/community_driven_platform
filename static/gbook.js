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
        // Fetch explore data based on the query
        fetchExploreData(query, startindex, 'load');
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
        // Fetch explore data based on the query
        fetchExploreData(query, startindex, 'new-search');
    });

    // Function to fetch explore data from the server
    function fetchExploreData(query, startindex, action) {
        $.ajax({
        url: '/api/gbooks/search/', // Replace with your server endpoint
        method: 'GET',
        data: { q: query, i: startindex },
        success: function(data) {
            var results = ''
            if (action == "new-search"){
                $('#exploreResults').empty(); // Clear previous results
            }

            data.forEach(function(book) {
                results += `
                <div class="book-card" data-id="${book.id}">
                    <div class="card-content">
                        <div class="card-front">
                            <img src="${book.cover_image ? book.cover_image : "https://via.placeholder.com/160"}" alt="Book Cover" class="book-cover">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-rating" data-id='${book.rating}'>
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </p>
                        </div>
                        <div class="card-back">
                            <p class="book-description">${book.description}</p>
                            <p class="book-author">Author: <span>${book.authors.join(', ')}</span></p>
                            <p class="book-genre">Genre: <span>${book.categories.join(', ')}</span></p>
                            <p class="book-publication-date">Published: <span>${book.published_date}</span></p>
                            <p class="book-publisher">Publisher: <span>${book.publisher}</span></p>
                        </div>
                    </div>
                    <div class="card-icons">
                        <i class="fas fa-thumbs-up like-btn"></i>
                        <i class="fas fa-comment comment-btn"></i>
                        <i class="fas fa-share recommend-btn"></i>
                    </div>
                </div>
                `
            });

            $('#exploreResults').append(results);
            $('#load-btn').show();

            $('.book-card').each(function() {
                var rating = $(this).find('.book-rating').data('id');
                var $stars = $(this).find('.star');
                $stars.each(function() {
                    var value = $(this).data('value');
                    if (value <= rating) {
                        $(this).addClass('active');
                    }
                });
            });
            
            $('.fa-thumbs-up, .fa-comment').on('click', function() {
                var $popup = $('#fadeout-popup');
        
                // Show the pop-up
                $popup.css('visibility', 'visible').css('opacity', '1');
        
                // Hide the pop-up after 3 seconds
                setTimeout(function() {
                    $popup.css('opacity', '0').css('visibility', 'hidden');
                }, 1000);
            });

        },
        error: function() {
            $('#results').html('<p>An error occurred while fetching data.</p>');
        }
        });
    }






});