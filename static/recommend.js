$(document).ready(function() {
    $('#exploreResults').on('click', '.recommend-btn', function() {

        console.log("hello");
        // Get the specific book
        var card = $(this).closest('.book-card');

        const title = card.find('.book-title').text();
        const author = card.find('.author span').text();
        const description = card.find('.description').text();
        const genre = card.find('.category span').text();
        const rating = card.find('.rating span').text();
        const publication_date = card.find('.published_date span').text() == 'null' ? null : card.find('.published_date span').text();
        const cover_image = card.find('.book-image').attr('src');

        var data = {
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
            url: '/api/recommend/recommendations/',
            method: 'POST',
            data: data,
            success: function(response) {
                // Handle the server response here
                console.log('Server response:', response);
            },
            error: function(error) {
                // Handle errors here
                console.error('Error:', error);
            }
        });
    });
});
