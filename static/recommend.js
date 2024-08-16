$(document).ready(function() {
    $('#exploreResults').on('click', '.recommend-btn', function() {

        // Get the specific book
        var card = $(this).closest('.book-card');

        const id = card.data('id');
        const title = card.find('.book-title').text();
        const author = card.find('.author span').text();
        const description = card.find('.description').text();
        const genre = card.find('.category span').text();
        const rating = card.find('.rating span').text();
        const publisher = card.find('.publisher span').text();
        const publication_date = card.find('.published_date span').text() == 'null' ? null : formatDate(card.find('.published_date span').text());
        const cover_image = card.find('.book-image').attr('src');

        var data = {
            id: id,
            title: title,
            author: author,
            description: description,
            genre: genre,
            rating: rating,
            publication_date: publication_date,
            cover_image: cover_image,
            // recommended_by: 1  // Assuming the user ID is 1 for now, adjust as needed
        };

        // Send the data to the server using AJAX
        $.ajax({
            url: '/api/recommend/add-book/',
            method: 'POST',
            data: data,
            success: function(response) {
                card.find('.recommend-btn').css('background-color', '#F6E96B').attr('disabled', true);
                // Handle the server response here
                console.log('Server response:', response);
            },
            error: function(error) {
                // Handle errors here
                console.error('Error:', error);
            }
        });
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

    // Function to fetch recommed data from the server
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
                    <h2 class="book-title">${book.title}</h2>
                    <div class="card-content">
                        <div class="left-side">
                            <img src=${book.cover_image ? book.cover_image : "https://via.placeholder.com/160"} alt="Book Cover" class="book-image">
                            <p class="rating">Rating: <span>${book.rating}</span>$</p>
                        </div>

                        <div class="right-side">
                            <div>
                                <p class="description">${book.description}</p>
                                <p class="author">Author: <span>${book.author}</span></p>
                                <p class="category">Category: <span>${book.genre}</span></p>
                                <p class="publisher">Publisher: <span>${book.publisher}</span></p>
                                <p class="published_date">Published Date: <span>${book.publication_date}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
            $('#recommendationResults').append(results);
        },
        error: function() {
            $('#results').html('<p>An error occurred while fetching data.</p>');
        }
        });
    }









});
