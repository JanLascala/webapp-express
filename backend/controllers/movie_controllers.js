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

//post 

function storeReview(req, res) {
    const id = req.params.id;
    const { username, text, vote } = req.body

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = created_at

    const insertSQL = 'INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id, username, vote, text, created_at, updated_at];

    connection.query(insertSQL, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        console.log(results);
        res.status(201).json({ message: 'reviews added!', reviewId: results.insertId })
    })


}






















module.exports = {
    index,
    show,
    storeReview,
}