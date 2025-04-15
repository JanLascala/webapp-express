//require data from sequl

const connection = require('../data/db.js')


//index
function index(req, res) {
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'database failed' });
        res.json(results);
    })
}

//show
function show(req, res) {
    const { id } = req.params;

    const sql = 'SELECT * FROM movies WHERE id = ?';
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // Fetch the movie
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = results[0];

        // Fetch the reviews for the movie
        connection.query(reviewSql, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: 'Database error' });


            movie.reviews = reviews;

            // Send the response
            res.json(movie);
        });
    });
}

























module.exports = {
    index,
    show,
}