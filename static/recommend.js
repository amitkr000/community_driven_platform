$(document).ready(function() {
    $('#exploreResults').on('click', '.recommend-btn', function() {

        // Check if the user is authenticated
        var token = sessionStorage.getItem('authToken');

        if (!token) {
            // Show the authentication pop-up if no token is present
            $('#auth-popup-content').css('visibility', 'visible').css('opacity', '1');
            setTimeout(function() {
                $('#auth-popup-content').css('opacity', '0').css('visibility', 'hidden');
            }, 1000);
        }

        else{
            console.log(token);
            // Get the specific book
            var card = $(this).closest('.book-card');

            const id = card.data('id');
            const title = card.find('.book-title').text();
            const author = card.find('.book-author span').text();
            const description = card.find('.book-description').text();
            const genre = card.find('.book-genre span').text();
            const rating = card.find('.book-rating').data('id');
            const publisher = card.find('.book-publisher span').text();
            const publication_date = card.find('.book-publication-date span').text() == 'null' ? null : formatDate(card.find('.book-publication-date span').text());
            const cover_image = card.find('.book-cover').attr('src');

            var data = {
                id: id,
                title: title,
                author: author,
                description: description,
                genre: genre,
                rating: rating,
                publisher: publisher,
                publication_date: publication_date,
                cover_image: cover_image,
                // recommended_by: 1  // Assuming the user ID is 1 for now, adjust as needed
            };

            // Send the data to the server using AJAX
            $.ajax({
                url: '/api/recommend/add-book/',
                method: 'POST',
                headers: {
                    'Authorization': 'Token ' + token,
                },
                data: data,
                success: function(response) {
                    card.find('.recommend-btn').css('color', '#ffcc00').attr('disabled', true);

                    console.log('Server response:', response);

                    const $popup = $('#recommend-popup-content');
                    // Show the pop-up
                    $popup.css('visibility', 'visible').css('opacity', '1');
                
                    // Hide the pop-up after 3 seconds
                    setTimeout(function() {
                        $popup.css('opacity', '0').css('visibility', 'hidden');
                    }, 1000);

                },
                error: function(error) {
                    // Handle errors here
                    console.error('Error:', error);
                }
            });

        }

    });

    function formatDate(dateStr) {
        // Check if dateStr is empty
        if (!dateStr) return null;

        // Handle only year
        if (/^\d{4}$/.test(dateStr)) { // YYYY
            return `${dateStr}-01-01`;
        }
        // Handle year and month
        else if (/^\d{4}-\d{2}$/.test(dateStr)) { // YYYY-MM
            return `${dateStr}-01`;
        }
        // Handle full date
        else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) { // YYYY-MM-DD
            return dateStr;
        }
        // Invalid format
        return null;
    }

    $('#apply-filters-sort').on('click', function(event) {
        fetchRecommendData();
    });

    // Function to fetch recommeded books from the server
    function fetchRecommendData() {

        var genre = $('#genre-select').val() == 'all' ? '' : $('#genre-select').val();
        var rating = $('#rating-select').val() == 'all' ? '' : $('#rating-select').val();
        var publicationDate = $('#publication_date-select').val() || '';
        var sortBy = $('#sort-select').val() == 'none' ? '' : $('#sort-select').val();

        $.ajax({
        url: '/api/recommend/retrive/',
        method: 'GET',
        data: { genre: genre, rating: rating, "publication-date": publicationDate, ordering: sortBy},
        success: function(data) {

            $('#recommendationResults').empty(); // Clear previous results

            var results = ''

            if (data.length == 0){
                results += `<h2>Sorry there is no result</h2>`
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
                            <p class="book-author">Author: <span>${book.author}</span></p>
                            <p class="book-genre">Genre: <span>${book.genre}</span></p>
                            <p class="book-publication-date">Published: <span>${book.publication_date}</span></p>
                            <p class="book-publisher">Publisher: <span>${book.publisher}</span></p>
                        </div>
                    </div>
                </div>
                `
            });

            $('#recommendationResults').append(results);

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

        },
        error: function() {
            $('#results').html('<p>An error occurred while fetching data.</p>');
        }
        });
    }









});
