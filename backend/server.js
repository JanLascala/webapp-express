// basic exports
const express = require('express');
const app = express();
const notFound = require('./middleware/notFound.js');
const errorHandler = require('./middleware/errorHandler.js');
// routers export
const movieRouters = require('./routers/movie_routers.js');
// port set up
const port = 3000;
// cors setup
const cors = require("cors");
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON body
app.use(express.json());

// Static images
app.use(express.static('public'));

// Set path for routes
app.use('/api/v1/movies', movieRouters);

// Listening
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});

// Middlewares for errors, etc.
app.use(errorHandler);
app.use(notFound);
